import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Select,
  MenuItem,
  Pagination,
  Divider,
} from "@mui/material";
import {
  PhoneOutlined,
  MailOutlined,
  LocationOnOutlined,
  EditOutlined,
  Add,
  FilterList,
  DeleteOutlined,
} from "@mui/icons-material";
import theme from "../../../shared/styles/mainTheme";

// --- Mock Data ---
interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  location: string;
  ordersCount: number;
  ordersLabel: string;
}

const suppliers: Supplier[] = [
  {
    id: 1,
    companyName: "شركة الأدوية المتحدة",
    contactName: "أحمد المنصور",
    phone: "+966 55 987 6543",
    email: "s.alharbi@alshifa.sa",
    location: "جدة، حي الرويس",
    ordersCount: 12,
    ordersLabel: "12 طلب",
  },
  {
    id: 2,
    companyName: "مؤسسة الشفاء الطبية",
    contactName: "سارة الحلبي",
    phone: "+966 55 987 6543",
    email: "s.alharbi@alshifa.sa",
    location: "جدة، حي الرويس",
    ordersCount: 50,
    ordersLabel: "50 طلب",
  },
  {
    id: 3,
    companyName: "معامل الصحة العالمية",
    contactName: "خالد الراجحي",
    phone: "+966 55 987 6543",
    email: "s.alharbi@alshifa.sa",
    location: "جدة، حي الرويس",
    ordersCount: 6,
    ordersLabel: "6 طلبات",
  },
  {
    id: 4,
    companyName: "معامل الصحة العالمية",
    contactName: "خالد الراجحي",
    phone: "+966 55 987 6543",
    email: "s.alharbi@alshifa.sa",
    location: "جدة، حي الرويس",
    ordersCount: 6,
    ordersLabel: "6 طلبات",
  },
  {
    id: 5,
    companyName: "سلاسل الأدوية الطبية",
    contactName: "فهد التميمي",
    phone: "+966 55 987 6543",
    email: "s.alharbi@alshifa.sa",
    location: "جدة، حي الرويس",
    ordersCount: 25,
    ordersLabel: "25 طلب",
  },
];

// --- Main Component ---
const SuppliersList: React.FC = () => {
  return (
    <Box
      dir="rtl"
      sx={{
        backgroundColor: "#f2f9f9",
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        fontFamily: "'Tajawal', 'Cairo', sans-serif",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1e103c", mb: 1 }}
          >
            قائمة الموردين
          </Typography>
          <Typography variant="body1" sx={{ color: "#6b7280" }}>
            إدارة وتتبع علاقات الموردين وسجلات التواصل
          </Typography>
        </Box>

        {/* Total Suppliers Card */}
        <Box
          sx={{
            background: `${theme.palette.gradient.secondary}`,
            //"linear-gradient(to bottom, #392b4e, #2d5872)",
            borderRadius: 2,
            px: 4,
            py: 2,
            color: "white",
            textAlign: "center",
            minWidth: 200,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            إجمالي عدد الموردين
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            56
          </Typography>
        </Box>
      </Box>

      {/* Controls & Filters Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Select
            size="small"
            defaultValue="city"
            sx={{ backgroundColor: "white", minWidth: 140, borderRadius: 1 }}
          >
            <MenuItem value="city">حسب المدينة</MenuItem>
            <MenuItem value="riyadh">الرياض</MenuItem>
            <MenuItem value="jeddah">جدة</MenuItem>
          </Select>

          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterList sx={{ ml: 1 }} />}
            sx={{
              backgroundColor: "white",
              borderColor: "#ccc",
              color: "#333",
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f5f5f5", borderColor: "#bbb" },
            }}
          >
            المورد الأكثر طلباً
          </Button>
        </Box>

        <Pagination
          count={3}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
            },
            "& .Mui-selected": {
              backgroundColor: "#1e103c !important",
              color: "white",
            },
          }}
        />
      </Box>

      {/* Grid Section */}
      <Grid container spacing={3}>
        {suppliers.map((supplier) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={supplier.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                border: "1px solid #eef2f6",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "#111" }}
                >
                  {supplier.companyName}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "#888", mb: 2, mt: 0.5 }}
                >
                  {supplier.contactName}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PhoneOutlined sx={{ fontSize: 18, color: "#666" }} />
                    <Typography variant="body2" sx={{ color: "#444" }}>
                      {supplier.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <MailOutlined sx={{ fontSize: 18, color: "#666" }} />
                    <Typography variant="body2" sx={{ color: "#444" }}>
                      {supplier.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <LocationOnOutlined sx={{ fontSize: 18, color: "#666" }} />
                    <Typography variant="body2" sx={{ color: "#444" }}>
                      {supplier.location}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 3,
                  pb: 3,
                }}
              >
                <Box>
                  <IconButton size="small" sx={{ color: "#d32f2f" }}>
                    <DeleteOutlined fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#2e7d32" }}>
                    <EditOutlined fontSize="small" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#f4eaff",
                    color: "#5e35b1",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1.5,
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}
                >
                  {supplier.ordersLabel}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}

        {/* Add New Supplier Card */}
        <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card
            component="button"
            onClick={() => window.location.href = "suppliers/add"}
            sx={{
              borderRadius: 3,
              border: "2px dashed #b0bec5",
              backgroundColor: "transparent",
              height: "100%",
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.02)",
                borderColor: "#78909c",
              },
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#cfd8dc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Add sx={{ color: "#546e7a" }} />
            </Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#546e7a" }}
            >
              إضافة مورد جديد للقائمة
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuppliersList;
