"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, TrendingDown, Users, Calendar, Activity } from "lucide-react";
import type { AgentState, ProjectData, SprintData } from "@/lib/canvas/types";
import { calculateProjectHealthScore, calculateSprintHealthScore, generatePortfolioInsights } from "@/lib/ai-insights";

interface ProjectInsightsDashboardProps {
  state: AgentState;
  className?: string;
}

export function ProjectInsightsDashboard({ state, className }: ProjectInsightsDashboardProps) {
  const insights = generatePortfolioInsights(state);
  const projects = state.items.filter(item => item.type === "project");
  const sprints = state.items.filter(item => item.type === "sprint");
  
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    if (score >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };
  
  const getHealthIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="size-4" />;
    return <TrendingDown className="size-4" />;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Overall Health Score */}
      <div className="p-4 border rounded-lg bg-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Portfolio Health</h3>
          <div className={cn("px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1", getHealthColor(insights.overallHealth))}>
            {getHealthIcon(insights.overallHealth)}
            {insights.overallHealth}%
          </div>
        </div>
        <Progress value={insights.overallHealth} className="mb-2" />
        <p className="text-xs text-gray-600">
          Analyzing {projects.length} projects and {sprints.length} sprints
        </p>
      </div>

      {/* Risk Summary */}
      {(insights.riskyProjects.length > 0 || insights.riskySprints.length > 0) && (
        <div className="p-4 border rounded-lg bg-red-50/50">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="size-4 text-red-600" />
            <h3 className="text-sm font-semibold text-red-800">Attention Required</h3>
          </div>
          <div className="space-y-2 text-xs">
            {insights.riskyProjects.length > 0 && (
              <div>
                <span className="font-medium">High-risk projects:</span> {insights.riskyProjects.join(", ")}
              </div>
            )}
            {insights.riskySprints.length > 0 && (
              <div>
                <span className="font-medium">Struggling sprints:</span> {insights.riskySprints.join(", ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {insights.recommendations.length > 0 && (
        <div className="p-4 border rounded-lg bg-blue-50/50">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">AI Recommendations</h3>
          <ul className="space-y-1 text-xs text-blue-700">
            {insights.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono text-blue-500 mt-0.5">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timeline View */}
      <div className="p-4 border rounded-lg bg-card">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="size-4" />
          <h3 className="text-sm font-semibold">Timeline Overview</h3>
        </div>
        <TimelineView projects={projects} sprints={sprints} />
      </div>

      {/* Team Capacity Heat Map */}
      <div className="p-4 border rounded-lg bg-card">
        <div className="flex items-center gap-2 mb-3">
          <Users className="size-4" />
          <h3 className="text-sm font-semibold">Team Capacity</h3>
        </div>
        <TeamCapacityHeatMap sprints={sprints} />
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => {
          const healthScore = calculateProjectHealthScore(project.data as ProjectData);
          return (
            <div key={project.id} className="p-3 border rounded-md bg-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium truncate">{project.name}</h4>
                <div className={cn("px-1.5 py-0.5 rounded text-xs flex items-center gap-1", getHealthColor(healthScore))}>
                  {getHealthIcon(healthScore)}
                  {healthScore}%
                </div>
              </div>
              <Progress value={healthScore} className="h-1.5" />
              <div className="mt-1 text-xs text-gray-500">
                Project • {(project.data as ProjectData).field4?.length || 0} tasks
              </div>
            </div>
          );
        })}
        
        {sprints.map(sprint => {
          const healthScore = calculateSprintHealthScore(sprint.data as SprintData);
          const sprintData = sprint.data as SprintData;
          return (
            <div key={sprint.id} className="p-3 border rounded-md bg-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium truncate">{sprint.name}</h4>
                <div className={cn("px-1.5 py-0.5 rounded text-xs flex items-center gap-1", getHealthColor(healthScore))}>
                  {getHealthIcon(healthScore)}
                  {healthScore}%
                </div>
              </div>
              <Progress value={healthScore} className="h-1.5" />
              <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                <span>Sprint • {sprintData.field2}</span>
                <span>•</span>
                <span>{sprintData.field4?.length || 0} members</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineView({ projects, sprints }: { projects: any[]; sprints: any[] }) {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  const getItemsWithDates = () => {
    const items: Array<{
      name: string;
      date: Date;
      type: 'project' | 'sprint';
      health: number;
    }> = [];
    
    projects.forEach(project => {
      const data = project.data as ProjectData;
      if (data.field3) {
        items.push({
          name: project.name,
          date: new Date(data.field3),
          type: 'project',
          health: calculateProjectHealthScore(data)
        });
      }
    });
    
    sprints.forEach(sprint => {
      const data = sprint.data as SprintData;
      if (data.field3) {
        items.push({
          name: sprint.name,
          date: new Date(data.field3),
          type: 'sprint',
          health: calculateSprintHealthScore(data)
        });
      }
    });
    
    return items.sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  const itemsWithDates = getItemsWithDates();
  
  if (itemsWithDates.length === 0) {
    return (
      <div className="text-center py-4 text-xs text-gray-500">
        No items with target dates found
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {itemsWithDates.map((item, i) => {
        const isOverdue = item.date < now;
        const isUpcoming = item.date < nextMonth && item.date >= now;
        
        return (
          <div key={i} className={cn(
            "flex items-center gap-3 p-2 rounded-md text-xs",
            isOverdue && "bg-red-50 border-l-2 border-red-300",
            isUpcoming && "bg-yellow-50 border-l-2 border-yellow-300",
            !isOverdue && !isUpcoming && "bg-gray-50"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              item.type === "project" ? "bg-blue-500" : "bg-green-500"
            )} />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item.name}</div>
              <div className="text-gray-500">
                {item.date.toLocaleDateString()} • {item.type}
              </div>
            </div>
            <div className={cn(
              "px-2 py-1 rounded text-xs",
              item.health >= 70 ? "bg-green-100 text-green-700" : 
              item.health >= 50 ? "bg-yellow-100 text-yellow-700" : 
              "bg-red-100 text-red-700"
            )}>
              {item.health}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TeamCapacityHeatMap({ sprints }: { sprints: any[] }) {
  const allMembers = new Map<string, { capacity: number; sprints: number }>();
  
  sprints.forEach(sprint => {
    const data = sprint.data as SprintData;
    data.field4?.forEach(member => {
      const existing = allMembers.get(member.name) || { capacity: 0, sprints: 0 };
      allMembers.set(member.name, {
        capacity: existing.capacity + member.capacity,
        sprints: existing.sprints + 1
      });
    });
  });
  
  const members = Array.from(allMembers.entries()).map(([name, data]) => ({
    name,
    avgCapacity: data.sprints > 0 ? Math.round(data.capacity / data.sprints) : 0,
    sprints: data.sprints
  }));
  
  if (members.length === 0) {
    return (
      <div className="text-center py-4 text-xs text-gray-500">
        No team members assigned to sprints
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {members.map(member => (
        <div key={member.name} className="p-2 border rounded-md bg-card">
          <div className="text-xs font-medium truncate mb-1">{member.name}</div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              member.avgCapacity >= 80 ? "bg-red-500" :
              member.avgCapacity >= 60 ? "bg-yellow-500" :
              "bg-green-500"
            )} />
            <span className="text-xs">{member.avgCapacity}% avg</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {member.sprints} sprint{member.sprints !== 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}