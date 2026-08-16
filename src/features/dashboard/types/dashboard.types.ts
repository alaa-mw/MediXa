export type StatTone = "danger" | "warning" | "info";
export type AlertStatusTone = "danger" | "warning" | "success";

export type StatCardData = {
  title: string;
  value: string;
  suffix?: string;
  note?: string;
  tone: StatTone;
};

// export type IncomingAlert = {
//   id: string;
//   medicineName: string;
//   details: string;
//   statusTone: AlertStatusTone;
//   hasAction?: boolean;
// };

export type OperationLog = {
  id: string;
  operation: string;
  category: string;
  time: string;
};

export type DailyWindowCardsData = {
  date: string;
  cards: {
    nearExpiry?: {
      count: number;
    };
    alerts?: {
      count: number;
    };
    invoices: {
      totalCount: number;
      breakdown: {
        saleCount: number;
        returnCount: number;
        damageCount: number;
        purchaseCount: number;
      };
    };
    grossSales: {
      amount: number;
      currency: string;
    };
    grossProfit: {
      salesRevenue: number;
      returnAmount: number;
      netSalesRevenue: number;
      salesCostOfGoods: number;
      restoredInventoryCost: number;
      netCostOfGoodsSold: number;
      grossProfitAmount: number;
      missingCostBaseQuantity: number;
      isComplete: boolean;
      currency: string;
    };
  };
};

export type DailyWindowAlertItem = {
  pharmacyDrugId: number;
  drugName: string;
  alertType: 'STOCK_ALERT' | 'EXPIRY_ALERT';
  quantity: {
    fullBoxes: number;
    remainingUnits: number;
  };
  expiryDate: string;
};

export type DailyWindowActivityItem = {
  invoiceActivityId: number;
  message: string;
  occurredAt: string;
};
