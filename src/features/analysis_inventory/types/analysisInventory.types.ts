export interface ExpiredMedResponse {
  days: number;
  period: {
    fromDate: string;
    toDate: string;
  };
  totalExpiredBatches: number;
  totalUniqueDrugs: number;
  items: Array<{
    batchId: number;
    pharmacyDrugId: string;
    drugName: string;
    expiryDate: string;
    remainingBaseQuantity: number;
    remainingUnits: number;
  }>;
}

export interface SlowMedResponse {
  days: number;
  period: {
    fromDate: string;
    toDate: string;
  };
  total: number;
  items: Array<{
    pharmacyDrugId: string;
    drugName: string;
    timeSinceLastSale: number;
  }>;
}

export interface PerformanceMedResponse {
  days: number;
  period: {
    fromDate: string;
    toDate: string;
  };
  topSelling: Array<{
    pharmacyDrugId: number;
    drugName: string;
    soldFullBoxes: number;
    soldRemainingUnits: number;
  }>;
  leastSelling: Array<{
    pharmacyDrugId: number;
    drugName: string;
    soldFullBoxes: number;
    soldRemainingUnits: number;
  }>;
}

export interface RotationResponse {
  days: number;
  period: {
    fromDate: string;
    toDate: string;
  };
  totalValue: {
    value: string;
    note: string;
  };
  items: Array<{
    type: "SALE" | "RETURN" | "DAMAGE" | "SUPPLIER";
    count: number;
  }>;
}

export interface SalesTrendResponse {
  level: "DAY" | "WEEK" | "MONTH" | "YEAR";
  bucketLevel: "DAY";
  period: {
    fromDate: string;
    toDate: string;
    fromDateKey: number;
    toDateKey: number;
  };
  items: Array<{
    key: string;
    label: string;
    referenceDate: string;
    fromDate: string;
    toDate: string;
    grossSalesAmount: number;
  }>;
}

export interface SalesSummaryResponse {
  period: {
    fromDate: string;
    toDate: string;
  };
  grossSalesAmount: number;
  netSalesAmount: number;
  saleInvoiceCount: number;
}
