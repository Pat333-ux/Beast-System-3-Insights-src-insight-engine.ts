// Beast-System-3-Insights/src/insight-engine.ts

import { AnalyticsSummary, ForecastReport } from "../Analytics/analytics-engine";
import { TelemetryEvent } from "../Telemetry/telemetry-engine";

export interface Insight {
  category: string;
  message: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  timestamp: string;
}

export interface InsightBundle {
  insights: Insight[];
  generatedAt: string;
}

export class InsightEngine {
  constructor(
    private analytics: { generateSummary(): AnalyticsSummary; generateForecast(): ForecastReport },
    private telemetry: { getEvents(): TelemetryEvent[] }
  ) {}

  // Generate insights from analytics summary
  private generateSummaryInsights(summary: AnalyticsSummary): Insight[] {
    const insights: Insight[] = [];

    if (summary.constitutionalViolations > 0) {
      insights.push({
        category: "Constitutional Stability",
        message: `Detected ${summary.constitutionalViolations} constitutional violations. Recommend reviewing authority and compliance pathways.`,
        priority: "HIGH",
        timestamp: new Date().toISOString(),
      });
    }

    if (summary.resolutionEscalations > 5) {
      insights.push({
        category: "Resolution Efficiency",
        message: "High resolution escalation volume suggests governance friction. Recommend optimizing lineage and authority chains.",
        priority: "MEDIUM",
        timestamp: new Date().toISOString(),
      });
    }

    if (summary.lucrActions > 10) {
      insights.push({
        category: "LUCR Economic Activity",
        message: "Strong LUCR activity detected. Recommend evaluating economic influence distribution.",
        priority: "LOW",
        timestamp: new Date().toISOString(),
      });
    }

    return insights;
  }

  // Generate insights from forecast report
  private generateForecastInsights(forecast: ForecastReport): Insight[] {
    const insights: Insight[] = [];

    if (forecast.resolutionRisk > 20) {
      insights.push({
        category: "Governance Risk",
        message: "Resolution risk trending upward. Recommend pre‑emptive constitutional review.",
        priority: "CRITICAL",
        timestamp: new Date().toISOString(),
      });
    }

    if (forecast.lucrForecast > 30) {
      insights.push({
        category: "Economic Forecast",
        message: "LUCR forecast indicates upcoming economic influence surge. Recommend adjusting value‑flow routing.",
        priority: "MEDIUM",
        timestamp: new Date().toISOString(),
      });
    }

    if (forecast.municipalLoad > 15) {
      insights.push({
        category: "Municipal Load",
        message: "Municipal load increasing. Recommend ministry redistribution.",
        priority: "HIGH",
        timestamp: new Date().toISOString(),
      });
    }

    return insights;
  }

  // Generate insights from telemetry patterns
  private generateTelemetryInsights(events: TelemetryEvent[]): Insight[] {
    const insights: Insight[] = [];

    const authorityUpdates = events.filter(e => e.type === "AUTHORITY_UPDATE").length;
    const complianceReports = events.filter(e => e.type === "COMPLIANCE_REPORT").length;

    if (authorityUpdates > 50) {
      insights.push({
        category: "Authority Dynamics",
        message: "Frequent authority updates detected. Recommend stabilizing delegation chains.",
        priority: "MEDIUM",
        timestamp: new Date().toISOString(),
      });
    }

    if (complianceReports > 100) {
      insights.push({
        category: "Compliance Activity",
        message: "High compliance activity suggests governance stress. Recommend reviewing constitutional constraints.",
        priority: "HIGH",
        timestamp: new Date().toISOString(),
      });
    }

    return insights;
  }

  // Main insight generation function
  public generateInsights(): InsightBundle {
    const summary = this.analytics.generateSummary();
    const forecast = this.analytics.generateForecast();
    const events = this.telemetry.getEvents();

    const insights = [
      ...this.generateSummaryInsights(summary),
      ...this.generateForecastInsights(forecast),
      ...this.generateTelemetryInsights(events),
    ];

    return {
      insights,
      generatedAt: new Date().toISOString(),
    };
  }
}

// Wiring function
export function createInsightEngine(
  analytics: { generateSummary(): AnalyticsSummary; generateForecast(): ForecastReport },
  telemetry: { getEvents(): TelemetryEvent[] }
): InsightEngine {
  return new InsightEngine(analytics, telemetry);
}
