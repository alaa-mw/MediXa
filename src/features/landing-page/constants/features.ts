import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InsightsIcon from "@mui/icons-material/Insights";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import GroupsIcon from "@mui/icons-material/Groups";

type FeatureItem = {
  title: string;
  description: string;
  icon: typeof InventoryIcon;
};

export const featuresData: FeatureItem[] = [
  {
    title: "إدارة المخزون والدفعات",
    description:
      "تتبع جميع الأصناف، الدفعات، الكميات، وتواريخ الانتهاء في لوحة تحكم واحدة منظمة.",
    icon: InventoryIcon,
  },
  {
    title: "فواتير ونقطة بيع POS",
    description: "إنشاء فواتير المبيعات وتحديث المخزون تلقائياً بعد كل عملية.",
    icon: PointOfSaleIcon,
  },
  {
    title: "قراءة الباركود",
    description: "إضافة وبحث سريع عن الأدوية باستخدام قارئ الباركود.",
    icon: QrCodeScannerIcon,
  },
  {
    title: "تنبيهات الصلاحية والمخزون",
    description: "تنبيهات فورية عند انخفاض المخزون أو قرب انتهاء الصلاحية.",
    icon: NotificationsActiveIcon,
  },
  {
    title: "الموردون والطلبيات",
    description: "إدارة الموردين وطلبات الشراء وسجل التوريد في مكان واحد.",
    icon: StorefrontIcon,
  },
  {
    title: "التقارير والتحليلات",
    description: "تقارير يومية وأسبوعية وشهرية تدعم قرارات أسرع.",
    icon: InsightsIcon,
  },
  {
    title: "البدائل الدوائية",
    description: "عرض البدائل المتاحة حسب المادة الفعالة مع الاستبدال الفوري.",
    icon: CompareArrowsIcon,
  },
  {
    title: "إدارة الموظفين والصلاحيات",
    description: "صلاحيات مرنة لفِرق العمل: مالك، صيدلاني، طبي، وإداري.",
    icon: GroupsIcon,
  },
];
