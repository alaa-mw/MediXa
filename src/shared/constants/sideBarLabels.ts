import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchIcon from "@mui/icons-material/Search";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import type { Role } from "../../app/routes/roles";

export const sideBarLabels: Record<
  Role,
  { title: string; path: string; icon: React.ElementType }[]
> = {
  PHARMACY_OWNER: [
    {
      title: "لوحة التحكم",
      path: "/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "التقارير",
      path: "/reports",
      icon: BarChartIcon,
    },
    {
      title: "نشرة الأسعار",
      path: "/price-list",
      icon: PaymentsIcon,
    },
    {
      title: "اشتراكي",
      path: "/subscription-schedule",
      icon: PaymentsIcon,
    },
  ],
  PHARMACY: [
    // {
    //   title: "لوحة التحكم",
    //   path: "/dashboard",
    //   icon: DashboardIcon,
    // },
    {
      title: "المبيعات",
      path: "/sales",
      icon: PointOfSaleIcon,
    },
    {
      title: "الفواتير",
      path: "/invoices",
      icon: ReceiptLongIcon,
    },
    {
      title: "المخزون",
      path: "/inventory",
      icon: Inventory2Icon,
    },
    {
      title: "الطلبات",
      path: "/orders",
      icon: ShoppingBagIcon,
    },
    {
      title: "المشتريات الذكية",
      path: "/predictive-orders",
      icon: AutoGraphIcon,
    },
    // {
    //   title: "التقارير",
    //   path: "/reports",
    //   icon: BarChartIcon,
    // },
    {
      title: "الموردين",
      path: "/suppliers",
      icon: LocalShippingIcon,
    },
    {
      title: "استكشاف الأدوية",
      path: "/medicine-search",
      icon: SearchIcon,
    },
    {
      title: "نشرة الأسعار",
      path: "/price-list",
      icon: PaymentsIcon,
    },


    {
      title: "المساعد الذكي",
      path: "/ai-assistant",
      icon: SupportAgentIcon,
    },
  ],
  ADMIN: [
    {
      title: "إنشاء حساب",
      path: "/create-account",
      icon: DashboardIcon,
    },
    {
      title: "إدارة الصيدليات",
      path: "/pharmacies",
      icon: Inventory2Icon,
    },
    {
      title: "مراجعة الأدوية",
      path: "/CDB/allDrugs",
      icon: Inventory2Icon,
    },
    {
      title: "تسعير الأدوية",
      path: "/CDB/pricing",
      icon: Inventory2Icon,
    },
    {
      title: "إدارة العروض",
      path: "/Create_offer",
      icon: SupportAgentIcon,
    },
  ],
  MEDICAL_TEAM: [
    {
      title: "إضافة دواء",
      path: "/CDB/addDrug",
      icon: DashboardIcon,
    },
    {
      title: "إدارة الأدوية",
      path: "/CDB/allDrugs",
      icon: Inventory2Icon,
    },
    {
      title: "تسعير الأدوية",
      path: "/CDB/pricing",
      icon: Inventory2Icon,
    },
  ],
};
