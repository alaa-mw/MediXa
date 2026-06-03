export type PricingTier = {
  englishLabel: string;
  title: string;
  target: string;
  features: string[];
  cta: string;
  isPopular?: boolean;
};

export const pricingData: PricingTier[] = [
  {
    englishLabel: "Starter",
    title: "الأساسية",
    target: "للصيدليات الصغيرة",
    features: [
      "إدارة المخزون والدفعات",
      "فواتير المبيعات الأساسية",
      "تنبيهات المخزون المنخفض",
      "تنبيهات انتهاء الصلاحية",
      "دعم الباركود",
      "مستخدم واحد",
    ],
    cta: "ابدأ الآن",
  },
  {
    englishLabel: "Professional",
    title: "الاحترافية",
    target: "مناسبة للصيدليات النشطة",
    features: [
      "كل ميزات الخطة الأساسية",
      "تقارير وتحليلات متقدمة",
      "المساعد الدوائي MediXa AI",
      "إدارة الموردين والطلبيات",
      "بدائل دوائية ذكية",
      "حتى ٥ مستخدمين",
      "توقعات الطلب المستقبلي",
    ],
    cta: "ابدأ الآن",
    isPopular: true,
  },
  {
    englishLabel: "Enterprise",
    title: "المؤسسية",
    target: "للفروع والسلاسل الصيدلانية",
    features: [
      "كل ميزات الخطة الاحترافية",
      "إدارة متعددة الفروع",
      "صلاحيات متقدمة ودقيقة",
      "تقارير موسعة ومخصصة",
      "دعم تقني مخصص",
      "مستخدمون غير محدودين",
      "تكامل مع أنظمة خارجية",
    ],
    cta: "تواصل معنا",
  },
];
