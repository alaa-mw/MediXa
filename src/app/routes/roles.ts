export const ROLES = ["owner", "pharmacist", "admin", "medical_team"] as const;
export type Role = (typeof ROLES)[number];

/*
export const roleLabels: Record<Role, string> = {
  admin: "Admin",
  owner: "Owner",
  pharmacist: "Pharmacist",
  medical_team: "Medical Team",
};

// compare
function canViewReports(role: Role) {
  return role === "admin" || role === "owner";
}
*/