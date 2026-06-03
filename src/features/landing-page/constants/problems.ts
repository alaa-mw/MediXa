import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InventoryIcon from "@mui/icons-material/Inventory";
import InsightsIcon from "@mui/icons-material/Insights";

export const problems = [
  {
    title: "فوضى في تتبع المخزون والدفعات",
    description:
      "إدارة مئات الأصناف يدوياً بين جداول متعددة تؤدي إلى أخطاء متكررة في الكميات وتواريخ الانتهاء.",
    icon: InventoryIcon,
  },
  {
    title: "أخطاء محتملة بسبب تشابه أسماء الأدوية",
    description:
      "التشابه في أسماء الأدوية التجارية أو المواد الفعالة يزيد من خطر صرف دواء غير مناسب.",
    icon: WarningAmberIcon,
  },
  {
    title: "صعوبة تحويل البيانات اليومية إلى قرارات",
    description:
      "غياب التحليلات الموحدة يجعل قرارات الشراء والتسعير أكثر صعوبة وأقل دقة.",
    icon: InsightsIcon,
  },
];
