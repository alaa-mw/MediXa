export interface Pharmacy {
  pharmacyId: number;
  pharmacyName: string;
  pharmacyCode: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE";
  activatedAt: string;
}
    