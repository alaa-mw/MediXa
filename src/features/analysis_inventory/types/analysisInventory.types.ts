export type AlertTone = "danger" | "warning";

export interface InventoryAlertItem {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  label: string;
  rows: Array<{
    id: string;
    name: string;
    note: string;
  }>;
  ctaLabel: string;
  tone: AlertTone;
}

export interface RotationMetric {
  id: string;
  label: string;
  value: string;
  note: string;
}

export interface RotationBar {
  id: string;
  height: number;
  color: string;
}

export interface CriticalStockItem {
  id: string;
  medicineName: string;
  currentQuantity: number;
  minimumThreshold: number;
  status: string;
  statusTone: "danger" | "warning";
}

export interface PerformanceListItem {
  id: string;
  medicineName: string;
  count: number;
}

export interface DemandColumn {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  confidenceRate: string;
  suggestions: string[];
}

export interface AnalysisInventoryViewModel {
  topAlerts: InventoryAlertItem[];
  rotation: {
    title: string;
    subtitle: string;
    bars: RotationBar[];
    metrics: RotationMetric[];
  };
  criticalStock: {
    title: string;
    rows: CriticalStockItem[];
  };
  performance: {
    title: string;
    bestSelling: PerformanceListItem[];
    lowSelling: PerformanceListItem[];
  };
  demandAnalysis: {
    title: string;
    subtitle: string;
    columns: DemandColumn[];
  };
}
