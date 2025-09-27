import type { ProjectData, SprintData, AgentState, RiskFactor, SuggestedAction } from "@/lib/canvas/types";

/**
 * AI-powered project health score calculation
 */
export function calculateProjectHealthScore(project: ProjectData): number {
  let score = 100;
  
  // Deduct points for missing critical information
  if (!project.field1.trim()) score -= 10; // No description
  if (!project.field3) score -= 15; // No due date
  
  // Deduct points based on checklist completion rate
  const totalTasks = project.field4?.length || 0;
  const completedTasks = project.field4?.filter(task => task.done).length || 0;
  
  if (totalTasks > 0) {
    const completionRate = completedTasks / totalTasks;
    if (completionRate < 0.3) score -= 20;
    else if (completionRate < 0.6) score -= 10;
  } else if (totalTasks === 0) {
    score -= 15; // No tasks planned
  }
  
  // Deduct points for high-severity risk factors
  const criticalRisks = project.field6?.filter(risk => risk.severity === "critical").length || 0;
  const highRisks = project.field6?.filter(risk => risk.severity === "high").length || 0;
  const mediumRisks = project.field6?.filter(risk => risk.severity === "medium").length || 0;
  
  score -= criticalRisks * 15;
  score -= highRisks * 10;
  score -= mediumRisks * 5;
  
  // Check if due date is approaching
  if (project.field3) {
    const dueDate = new Date(project.field3);
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) score -= 25; // Overdue
    else if (daysUntilDue < 3) score -= 15; // Due very soon
    else if (daysUntilDue < 7) score -= 10; // Due soon
  }
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Analyze project and suggest actions
 */
export function generateSuggestedActions(project: ProjectData): SuggestedAction[] {
  const actions: SuggestedAction[] = [];
  let actionId = (project.field7_id || 0) + 1;
  
  // Check for overdue or approaching deadlines
  if (project.field3) {
    const dueDate = new Date(project.field3);
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) {
      actions.push({
        id: String(actionId++).padStart(3, "0"),
        title: "Address Overdue Project",
        description: "This project is overdue. Review scope and timeline immediately.",
        priority: "high"
      });
    } else if (daysUntilDue < 7) {
      actions.push({
        id: String(actionId++).padStart(3, "0"),
        title: "Focus on Upcoming Deadline",
        description: `Project due in ${daysUntilDue} days. Prioritize remaining tasks.`,
        priority: "high"
      });
    }
  }
  
  // Check task completion rate
  const totalTasks = project.field4?.length || 0;
  const completedTasks = project.field4?.filter(task => task.done).length || 0;
  
  if (totalTasks > 0) {
    const completionRate = completedTasks / totalTasks;
    if (completionRate < 0.3) {
      actions.push({
        id: String(actionId++).padStart(3, "0"),
        title: "Accelerate Task Completion",
        description: "Low task completion rate detected. Consider resource reallocation.",
        priority: "medium"
      });
    }
  } else {
    actions.push({
      id: String(actionId++).padStart(3, "0"),
      title: "Define Project Tasks",
      description: "Break down project into actionable tasks for better tracking.",
      priority: "medium"
    });
  }
  
  // Check for critical risks
  const criticalRisks = project.field6?.filter(risk => risk.severity === "critical").length || 0;
  if (criticalRisks > 0) {
    actions.push({
      id: String(actionId++).padStart(3, "0"),
      title: "Mitigate Critical Risks",
      description: `${criticalRisks} critical risk(s) identified. Develop mitigation plans immediately.`,
      priority: "high"
    });
  }
  
  return actions;
}

/**
 * Auto-detect common project risks
 */
export function detectProjectRisks(project: ProjectData, allProjects?: ProjectData[]): RiskFactor[] {
  const risks: RiskFactor[] = [];
  let riskId = (project.field6_id || 0) + 1;
  
  // Timeline risk
  if (project.field3) {
    const dueDate = new Date(project.field3);
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) {
      risks.push({
        id: String(riskId++).padStart(3, "0"),
        type: "Timeline",
        description: "Project is overdue and may impact dependent activities",
        severity: "critical"
      });
    } else if (daysUntilDue < 7) {
      risks.push({
        id: String(riskId++).padStart(3, "0"),
        type: "Timeline",
        description: "Tight deadline approaching with potential quality impact",
        severity: "high"
      });
    }
  }
  
  // Resource risk based on task load
  const totalTasks = project.field4?.length || 0;
  const incompleteTasks = project.field4?.filter(task => !task.done).length || 0;
  
  if (totalTasks > 10 && incompleteTasks > 7) {
    risks.push({
      id: String(riskId++).padStart(3, "0"),
      type: "Resource",
      description: "High task volume may indicate resource constraints",
      severity: "medium"
    });
  }
  
  // Scope risk
  const MIN_DESCRIPTION_LENGTH = 20;
  if (!project.field1.trim() || project.field1.length < MIN_DESCRIPTION_LENGTH) {
    risks.push({
      id: String(riskId++).padStart(3, "0"),
      type: "Scope",
      description: "Insufficient project description may lead to scope creep",
      severity: "medium"
    });
  }
  
  return risks;
}

/**
 * Calculate sprint health based on team capacity and timeline
 */
export function calculateSprintHealthScore(sprint: SprintData): number {
  let score = 100;
  
  // Deduct for missing information
  if (!sprint.field1.trim()) score -= 15; // No name
  if (!sprint.field3) score -= 10; // No target date
  
  // Check team capacity
  const teamMembers = sprint.field4?.length || 0;
  if (teamMembers === 0) {
    score -= 30; // No team assigned
  } else {
    const avgCapacity = sprint.field4?.reduce((sum, member) => sum + member.capacity, 0) / teamMembers;
    if (avgCapacity < 50) score -= 20; // Low average capacity
    else if (avgCapacity < 75) score -= 10;
  }
  
  // Check timeline if target date exists
  if (sprint.field3) {
    const targetDate = new Date(sprint.field3);
    const now = new Date();
    const daysUntilTarget = Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (sprint.field2 === "Active" && daysUntilTarget < 0) {
      score -= 25; // Active sprint is overdue
    } else if (sprint.field2 === "Planning" && daysUntilTarget < 7) {
      score -= 15; // Planning phase too close to target
    }
  }
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Generate insights across all projects and sprints
 */
export function generatePortfolioInsights(state: AgentState): {
  overallHealth: number;
  riskySprints: string[];
  riskyProjects: string[];
  recommendations: string[];
} {
  const projects = state.items.filter(item => item.type === "project");
  const sprints = state.items.filter(item => item.type === "sprint");
  
  // Calculate overall health
  const projectHealthScores = projects.map(p => calculateProjectHealthScore(p.data as ProjectData));
  const sprintHealthScores = sprints.map(s => calculateSprintHealthScore(s.data as SprintData));
  
  const allHealthScores = [...projectHealthScores, ...sprintHealthScores];
  const overallHealth = allHealthScores.length > 0 
    ? Math.round(allHealthScores.reduce((sum, score) => sum + score, 0) / allHealthScores.length)
    : 100;
  
  // Identify risky items
  const riskySprints = sprints
    .filter(s => calculateSprintHealthScore(s.data as SprintData) < 70)
    .map(s => s.name);
    
  const riskyProjects = projects
    .filter(p => calculateProjectHealthScore(p.data as ProjectData) < 70)
    .map(p => p.name);
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (riskyProjects.length > 0) {
    recommendations.push(`Focus on ${riskyProjects.length} underperforming project(s): ${riskyProjects.slice(0, 3).join(", ")}`);
  }
  
  if (riskySprints.length > 0) {
    recommendations.push(`Review capacity allocation for ${riskySprints.length} sprint(s): ${riskySprints.slice(0, 3).join(", ")}`);
  }
  
  const overdueProjects = projects.filter(p => {
    const project = p.data as ProjectData;
    return project.field3 && new Date(project.field3) < new Date();
  });
  
  if (overdueProjects.length > 0) {
    recommendations.push(`Address ${overdueProjects.length} overdue project(s) immediately`);
  }
  
  return {
    overallHealth,
    riskySprints,
    riskyProjects,
    recommendations
  };
}