import type { AgentState, ProjectData, SprintData } from "@/lib/canvas/types";

/**
 * Integration framework for external development tools
 */

export interface SlackMessage {
  channel: string;
  user: string;
  text: string;
  timestamp: string;
  thread_ts?: string;
}

export interface GitHubPullRequest {
  id: number;
  title: string;
  state: "open" | "closed" | "merged";
  created_at: string;
  updated_at: string;
  review_comments: number;
  commits: number;
  author: string;
}

export interface JiraIssue {
  key: string;
  summary: string;
  status: string;
  assignee?: string;
  story_points?: number;
  priority: string;
  updated: string;
}

export interface TeamCapacityData {
  memberId: string;
  name: string;
  role: string;
  currentCapacity: number;
  weeklyCommits?: number;
  activeReviews?: number;
  jiraTickets?: number;
}

/**
 * Slack integration for team communication analysis
 */
export class SlackIntegration {
  private apiKey?: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }
  
  async analyzeChannelActivity(channelId: string, days = 7): Promise<{
    messageCount: number;
    activeUsers: string[];
    sentimentScore: number;
    blockers: string[];
  }> {
    // Placeholder implementation - would use Composio Slack tools
    console.log(`Analyzing Slack channel ${channelId} for ${days} days`);
    
    return {
      messageCount: Math.floor(Math.random() * 100) + 50,
      activeUsers: ["john.doe", "jane.smith", "alex.dev"],
      sentimentScore: Math.random() * 0.4 + 0.6, // 0.6-1.0 range
      blockers: ["waiting for approval", "dependencies not ready"]
    };
  }
  
  async getProjectMentions(projectName: string): Promise<SlackMessage[]> {
    // Placeholder - would search for project mentions across channels
    return [
      {
        channel: "#development",
        user: "john.doe",
        text: `Update on ${projectName}: we're making good progress but need more testing time`,
        timestamp: new Date().toISOString()
      }
    ];
  }
}

/**
 * GitHub integration for commit velocity and PR metrics
 */
export class GitHubIntegration {
  private apiKey?: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }
  
  async getCommitVelocity(repo: string, days = 7): Promise<{
    totalCommits: number;
    averagePerDay: number;
    contributors: string[];
    linesChanged: number;
  }> {
    // Placeholder implementation - would use Composio GitHub tools
    console.log(`Analyzing GitHub repo ${repo} for ${days} days`);
    
    return {
      totalCommits: Math.floor(Math.random() * 50) + 10,
      averagePerDay: Math.random() * 8 + 2,
      contributors: ["developer1", "developer2", "developer3"],
      linesChanged: Math.floor(Math.random() * 5000) + 1000
    };
  }
  
  async getPullRequestMetrics(repo: string): Promise<{
    openPRs: number;
    averageReviewTime: number; // hours
    mergeRate: number; // percentage
    stalePRs: GitHubPullRequest[];
  }> {
    return {
      openPRs: Math.floor(Math.random() * 15) + 5,
      averageReviewTime: Math.random() * 48 + 12,
      mergeRate: Math.random() * 0.3 + 0.7,
      stalePRs: []
    };
  }
}

/**
 * Jira integration for story point velocity
 */
export class JiraIntegration {
  private apiKey?: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }
  
  async getSprintVelocity(boardId: string): Promise<{
    completedStoryPoints: number;
    plannedStoryPoints: number;
    velocityTrend: number[]; // last 5 sprints
    burndownData: { date: string; remaining: number }[];
  }> {
    // Placeholder implementation - would use Composio Jira tools
    console.log(`Analyzing Jira board ${boardId}`);
    
    return {
      completedStoryPoints: Math.floor(Math.random() * 30) + 20,
      plannedStoryPoints: Math.floor(Math.random() * 40) + 25,
      velocityTrend: Array.from({ length: 5 }, () => Math.floor(Math.random() * 40) + 15),
      burndownData: Array.from({ length: 10 }, (_, i) => ({
        date: new Date(Date.now() - (9 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        remaining: Math.max(0, 50 - i * 5 + Math.random() * 10 - 5)
      }))
    };
  }
  
  async getTeamWorkload(): Promise<JiraIssue[]> {
    return [
      {
        key: "PROJ-123",
        summary: "Implement user authentication",
        status: "In Progress",
        assignee: "john.doe",
        story_points: 8,
        priority: "High",
        updated: new Date().toISOString()
      }
    ];
  }
}

/**
 * Time tracking integration for capacity analysis
 */
export class TimeTrackingIntegration {
  async getTeamCapacity(teamMembers: string[]): Promise<TeamCapacityData[]> {
    // Placeholder - would integrate with time tracking tools
    return teamMembers.map(member => ({
      memberId: member,
      name: member.replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      role: ["Developer", "Designer", "QA", "DevOps"][Math.floor(Math.random() * 4)],
      currentCapacity: Math.floor(Math.random() * 40) + 60,
      weeklyCommits: Math.floor(Math.random() * 20) + 5,
      activeReviews: Math.floor(Math.random() * 5) + 1,
      jiraTickets: Math.floor(Math.random() * 8) + 2
    }));
  }
}

/**
 * Main orchestrator for cross-platform data analysis
 */
export class ProjectOrchestrator {
  private slack: SlackIntegration;
  private github: GitHubIntegration;
  private jira: JiraIntegration;
  private timeTracking: TimeTrackingIntegration;
  
  constructor(integrationKeys: {
    slack?: string;
    github?: string;
    jira?: string;
  } = {}) {
    this.slack = new SlackIntegration(integrationKeys.slack);
    this.github = new GitHubIntegration(integrationKeys.github);
    this.jira = new JiraIntegration(integrationKeys.jira);
    this.timeTracking = new TimeTrackingIntegration();
  }
  
  /**
   * Analyze project health across all platforms
   */
  async analyzeProjectHealth(projectName: string, projectData: ProjectData): Promise<{
    healthScore: number;
    insights: string[];
    recommendations: string[];
    riskFactors: Array<{
      source: string;
      risk: string;
      severity: "low" | "medium" | "high" | "critical";
    }>;
  }> {
    const insights: string[] = [];
    const recommendations: string[] = [];
    const riskFactors: Array<{
      source: string;
      risk: string;
      severity: "low" | "medium" | "high" | "critical";
    }> = [];
    
    try {
      // Slack analysis
      const slackData = await this.slack.analyzeChannelActivity(`project-${projectName.toLowerCase()}`);
      if (slackData.sentimentScore < 0.7) {
        riskFactors.push({
          source: "Slack",
          risk: "Low team sentiment detected in communications",
          severity: "medium"
        });
        recommendations.push("Schedule team check-in to address concerns");
      }
      insights.push(`${slackData.messageCount} messages in project channel (${slackData.activeUsers.length} active users)`);
      
      // GitHub analysis
      const githubData = await this.github.getCommitVelocity(`repo/${projectName}`);
      if (githubData.averagePerDay < 2) {
        riskFactors.push({
          source: "GitHub",
          risk: "Low commit velocity may indicate development bottlenecks",
          severity: "medium"
        });
        recommendations.push("Review development blockers and resource allocation");
      }
      insights.push(`${githubData.totalCommits} commits with ${githubData.contributors.length} contributors`);
      
      // Jira analysis
      const jiraData = await this.jira.getSprintVelocity("board-123");
      const velocityRatio = jiraData.completedStoryPoints / jiraData.plannedStoryPoints;
      if (velocityRatio < 0.8) {
        riskFactors.push({
          source: "Jira",
          risk: "Sprint velocity below target, potential scope or estimation issues",
          severity: velocityRatio < 0.6 ? "high" : "medium"
        });
        recommendations.push("Review sprint planning and estimation accuracy");
      }
      insights.push(`Sprint velocity: ${jiraData.completedStoryPoints}/${jiraData.plannedStoryPoints} story points`);
      
    } catch (error) {
      console.error("Error analyzing project health:", error);
      insights.push("Limited external data available");
    }
    
    // Calculate composite health score
    const baseHealth = projectData.field5 || 75;
    const externalRiskPenalty = riskFactors.length * 10;
    const healthScore = Math.max(0, Math.min(100, baseHealth - externalRiskPenalty));
    
    return {
      healthScore,
      insights,
      recommendations,
      riskFactors
    };
  }
  
  /**
   * Suggest resource reallocations based on capacity and priorities
   */
  async suggestResourceReallocations(state: AgentState): Promise<{
    suggestions: Array<{
      type: "reassign" | "reprioritize" | "add_resources";
      description: string;
      impact: "low" | "medium" | "high";
      items: string[];
    }>;
  }> {
    const projects = state.items.filter(item => item.type === "project");
    const sprints = state.items.filter(item => item.type === "sprint");
    
    const suggestions: Array<{
      type: "reassign" | "reprioritize" | "add_resources";
      description: string;
      impact: "low" | "medium" | "high";
      items: string[];
    }> = [];
    
    // Identify overloaded sprints
    const overloadedSprints = sprints.filter(sprint => {
      const sprintData = sprint.data as SprintData;
      const teamSize = sprintData.field4?.length || 0;
      const avgCapacity = teamSize > 0 
        ? sprintData.field4.reduce((sum, member) => sum + member.capacity, 0) / teamSize
        : 0;
      return avgCapacity < 60; // Less than 60% average capacity
    });
    
    if (overloadedSprints.length > 0) {
      suggestions.push({
        type: "add_resources",
        description: "Several sprints show low team capacity. Consider adding resources or extending timelines.",
        impact: "high",
        items: overloadedSprints.map(s => s.name)
      });
    }
    
    // Identify high-risk projects that might need priority adjustment
    const highRiskProjects = projects.filter(project => {
      const projectData = project.data as ProjectData;
      return (projectData.field5 || 75) < 60;
    });
    
    if (highRiskProjects.length > 0) {
      suggestions.push({
        type: "reprioritize",
        description: "High-risk projects detected. Consider increasing priority or allocating additional resources.",
        impact: "high",
        items: highRiskProjects.map(p => p.name)
      });
    }
    
    return { suggestions };
  }
}

// Export singleton instance for use across the application
export const projectOrchestrator = new ProjectOrchestrator();