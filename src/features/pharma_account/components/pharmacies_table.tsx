import {
  AutorenewOutlined,
  DeleteOutlineOutlined,
  EditNoteRounded,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

// 💡 تعريف نوع البيانات (Interface)
interface PharmaType {
  id: number;
  name: string;
  email: string;
  owner: string;
  status: string;
  subscription: string;
  date: string;
}

interface Props {
  data: PharmaType[]; // 💡 الجدول الآن يستقبل الداتا من الخارج
}

const PharmaciesTable = ({ data }: Props) => {
  const getStatusStyles = (status: string) => {
    if (status === "نشط") {
      return { bgcolor: "#E6F4EA", color: "#137333" };
    }
    return { bgcolor: "#FCE8E6", color: "#C5221F" };
  };

  const getSubscriptionStyles = (sub: string) => {
    if (sub === "جاري") {
      return { bgcolor: "#E6F4EA", color: "#137333" };
    }
    return { bgcolor: "#FCE8E6", color: "#C5221F" };
  };

  return (
    <Box
      sx={{ border: "1px solid #E2E8F0", borderRadius: 2, overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr 2fr",
          p: 1.2,
          bgcolor: "#F8FAFC",
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        <Box>اسم الصيدلية</Box>
        <Box>المالك</Box>
        <Box>الحالة</Box>
        <Box>تاريخ الاشتراك</Box>
        <Box>الاشتراك</Box>
        <Box>الإجراءات</Box>
      </Box>

      {/* 💡 استخدام data الممررة كـ Props بدلاً من المصفوفة القديمة */}
      {data.length > 0 ? (
        data.map((row) => (
          <Box
            key={row.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr 2fr",
              p: 1.2,
              borderTop: "1px solid #E2E8F0",
              fontSize: 15,
            }}
          >
            <Box>
              <Box>{row.name}</Box>
              <Box sx={{ fontSize: 12 }}>{row.email}</Box>
            </Box>
            <Box sx={{ alignContent: "center" }}>{row.owner}</Box>
            <Box sx={{ alignContent: "center" }}>
              <Chip
                label={row.status}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: "12px",
                  width: "80px",
                  alignContent: "center",
                  ...getStatusStyles(row.status),
                }}
              />
              <IconButton
                size="small"
                sx={{ color: row.status === "نشط" ? "#34A853" : "#EA4335" }}
              >
                <AutorenewOutlined fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ alignContent: "center" }}>{row.date}</Box>
            <Box sx={{ alignContent: "center" }}>
              <Chip
                label={row.subscription}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: "12px",
                  width: "80px",
                  alignContent: "center",
                  ...getSubscriptionStyles(row.subscription),
                }}
              />
            </Box>
            <Box sx={{ alignContent: "center" }}>
              <IconButton size="small" sx={{ color: "#27292b" }}>
                <EditNoteRounded fontSize="medium" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#EF4444" }}>
                <DeleteOutlineOutlined fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))
      ) : (
        // 💡 رسالة تظهر في حال كان الفلتر لا يطابق أي نتيجة
        <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
          لا توجد صيدليات تطابق بحثك...
        </Box>
      )}
    </Box>
  );
};

export default PharmaciesTable;
