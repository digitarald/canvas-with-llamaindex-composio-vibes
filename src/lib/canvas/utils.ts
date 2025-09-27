import type { HealthStatus } from "./types";

export function getHealthStatusColor(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "text-green-600 bg-green-50 border-green-200";
    case "warning":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "critical":
      return "text-red-600 bg-red-50 border-red-200";
    case "unknown":
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function getHealthStatusDot(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "critical":
      return "bg-red-500";
    case "unknown":
    default:
      return "bg-gray-400";
  }
}

export function formatHealthStatus(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "Healthy";
    case "warning":
      return "Warning";
    case "critical":
      return "Critical";
    case "unknown":
    default:
      return "Unknown";
  }
}