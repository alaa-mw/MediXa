export const pharmacyStatuses = [
  {
    label: "نشط",
    value: "ACTIVE",
  },
  {
    label: "قيد الانتظار",
    value: "PENDING",
  },
  {
    label: "معلق",
    value: "SUSPENDED",
  },
  {
    label: "مرفوض",
    value: "REJECTED",
  },
] as const;

/*
  باستخدام as const يصبح TypeScript يعرف أن القيم ثابتة.

  بدونها سيكون النوع:

      string

  بينما معها يصبح:

      "ACTIVE"
      "PENDING"
      "SUSPENDED"
      "REJECTED"

  وهذا يعطينا Type Safety ممتازة.
*/

export type PharmacyStatusValue =
  (typeof pharmacyStatuses)[number]["value"];