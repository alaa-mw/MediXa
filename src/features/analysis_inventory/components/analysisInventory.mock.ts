import type { AnalysisInventoryViewModel } from "../types/analysisInventory.types";

export const analysisInventoryMock: AnalysisInventoryViewModel = {
  topAlerts: [
    {
      id: "high-demand",
      title: "الأدوية الرائجة",
      subtitle: "عناصر تم بيع 90 عبوة",
      value: 24,
      label: "صنف يتطلب مراجعة",
      rows: [
        { id: "1", name: "Paracetamol 500mg", note: "بيع 120" },
        { id: "2", name: "Amoxicillin Syrup", note: "بيع 95" },
      ],
      ctaLabel: "عرض الكل",
      tone: "danger",
    },
    {
      id: "expiring-soon",
      title: "الأدوية منتهية الصلاحية",
      subtitle: "عناصر يجب إتلافها",
      value: 24,
      label: "صنف يتطلب مراجعة",
      rows: [
        { id: "1", name: "Paracetamol 500mg", note: "منذ 120 يوم" },
        { id: "2", name: "Amoxicillin Syrup", note: "منذ 9 أيام" },
      ],
      ctaLabel: "عرض الكل",
      tone: "danger",
    },
  ],
  rotation: {
    title: "تحليل دوران المخزون",
    subtitle: "سريع بيع الأدوية وتجديدها خلال 30 يوم",
    bars: [
      { id: "1", height: 74, color: "#2F7C78" },
      { id: "2", height: 80, color: "#37456D" },
      { id: "3", height: 62, color: "#5B3E68" },
      { id: "4", height: 37, color: "#5D8CD6" },
      { id: "5", height: 49, color: "#4B8AA6" },
      { id: "6", height: 27, color: "#87AEC6" },
      { id: "7", height: 28, color: "#B2CAE4" },
      { id: "8", height: 28, color: "#B2CAE4" },
      { id: "9", height: 28, color: "#B2CAE4" },
      { id: "10", height: 28, color: "#B2CAE4" },
      { id: "11", height: 62, color: "#2C8A62" },
      { id: "12", height: 74, color: "#239160" },
    ],
    metrics: [
      {
        id: "turnover",
        label: "معدل الدوران العام",
        value: "4.2x",
        note: "%12.4 أسرع الشهر الماضي",
      },
      {
        id: "average-days",
        label: "متوسط بقاء الدواء في المخزن",
        value: "14 يوم",
        note: "",
      },
    ],
  },
  criticalStock: {
    title: "حالة المخزون الحرجة",
    rows: [
      {
        id: "1",
        medicineName: "Aspirin 81mg",
        currentQuantity: 0,
        minimumThreshold: 50,
        status: "نفذ المخزون",
        statusTone: "danger",
      },
      {
        id: "2",
        medicineName: "Cough Syrup X",
        currentQuantity: 12,
        minimumThreshold: 20,
        status: "مخزون منخفض",
        statusTone: "warning",
      },
      {
        id: "3",
        medicineName: "Insulin Glargine",
        currentQuantity: 5,
        minimumThreshold: 15,
        status: "مخزون منخفض",
        statusTone: "warning",
      },
    ],
  },
  performance: {
    title: "أداء الأصناف (الأكثر/الأقل مبيعاً)",
    bestSelling: [
      { id: "1", medicineName: "أموكسيسيلين كولد اند فلو", count: 342 },
      { id: "2", medicineName: "كاتافلام فوار", count: 285 },
      { id: "3", medicineName: "كريم بيتادين سيبروسيل", count: 190 },
    ],
    lowSelling: [
      { id: "1", medicineName: "كولفينات (30 مل)", count: 0 },
      { id: "2", medicineName: "مكمل غذائي Z-Plus", count: 1 },
    ],
  },
  demandAnalysis: {
    title: "تحليل المخزون",
    subtitle: "نظرة عامة على أداء الأدوية وتوقعات الطلب المستقبلية",
    columns: [
      {
        id: "forecast",
        title: "الطلب المتوقع",
        subtitle: "بناء على حجم المبيعات اليومية والحالة الصحية السائدة",
        highlight: "أدوية الحساسية (موسميًا)",
        confidenceRate: "دقة التوقع 94%",
        suggestions: ["مسكنات الألم العامة", "مسكنات الألم العامة"],
      },
      {
        id: "at-risk",
        title: "الأدوية العرضة للنفاذ",
        subtitle: "توقعات النقص المحتملة للأسبوع القادم",
        highlight: "أدوية الحساسية (موسميًا)",
        confidenceRate: "دقة التوقع 94%",
        suggestions: ["مسكنات الألم العامة", "Atorvastatin"],
      },
      {
        id: "slow-moving",
        title: "الأدوية بطيئة الحركة",
        subtitle: "توقعات الطلب المنخفض في الأسبوع القادم",
        highlight: "أموكسيسيلين 500mg",
        confidenceRate: "فرص تراجع الطلب 45%",
        suggestions: ["مسكنات الألم العامة", "مسكنات الألم العامة"],
      },
    ],
  },
};
