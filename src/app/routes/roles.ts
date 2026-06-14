export const ROLES = ["ADMIN", "PHARMACY_OWNER", "PHARMACY", "MEDICAL_TEAM"] as const;
export type Role = (typeof ROLES)[number];


export const roleLabels: Record<Role, string> = {
  ADMIN: "ADMIN",
  PHARMACY_OWNER: "PHARMACY_OWNER",
  PHARMACY: "PHARMACY",
  MEDICAL_TEAM: "MEDICAL_TEAM",
};


// compare
// function canViewReports(role: Role) {
//   return role === "admin" || role === "pharmacy_owner";
// }
