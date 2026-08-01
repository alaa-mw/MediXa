export type StatTone = "danger" | "warning" | "info";
export type AlertStatusTone = "danger" | "warning" | "success";

export type StatCardData = {
  id: string;
  title: string;
  value: string;
  suffix?: string;
  note: string;
  tone: StatTone;
};

export type IncomingAlert = {
  id: string;
  medicineName: string;
  details: string;
  statusTone: AlertStatusTone;
  hasAction?: boolean;
};

export type OperationLog = {
  id: string;
  operation: string;
  category: string;
  time: string;
};
