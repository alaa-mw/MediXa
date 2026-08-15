export type AlertTone = "danger" | "warning";

export type RotationTitle = "sale" | "purchase" | "return" | "damage" | string;

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
  slowMedicines: {
    rows: Array<{
      id: string;
      name: string;
      notSaleFromDays: number;
    }>;
  };
  expiryMedicines: {
    rows: Array<{
      id: string;
      name: string;
      remainQty: number;
      status: string;
      expiryDate: string;
      lossValue: number;
      supplier: string;
    }>;
  };
  PeformanceMedicines: {
    bestSelling: PerformanceListItem[];
    lowSelling: PerformanceListItem[];
  };
  rotation: {
    bars: Array<{
      id: string;
      title: RotationTitle;
      invoicesNumber: number;
    }>;
    totalValue: {
      value: string;
      note: string;
    };
    remainMedAvg: {
      value: string;
      note: string;
    };
  };
}
