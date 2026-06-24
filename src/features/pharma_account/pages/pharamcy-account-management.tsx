import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
} from "@mui/material";
import PharmaciesTable from "../components/pharmacies_table";
import PharmaInfoCard from "../components/pharma_info_card";
import { useState } from "react";
import PharmaStatsCards from "../components/pharma_stats";
import { SearchOutlined } from "@mui/icons-material";

const allPharmacies = [
  {
    id: 1,
    name: "صيدلية النور",
    email: "alnoor@pharmacy.com",
    owner: "محمد أحمد",
    status: "نشط",
    subscription: "جاري",
    date: "2026-04-01",
  },
  {
    id: 2,
    name: "صيدلية الشفاء",
    email: "alshifa@pharmacy.com",
    owner: "أحمد محمود",
    status: "معطل",
    subscription: "جاري",
    date: "2026-04-01",
  },
  {
    id: 3,
    name: "صيدلية الحياة",
    email: "life@pharmacy.com",
    owner: "سارة النجار",
    status: "نشط",
    subscription: "منتهي",
    date: "2026-04-01",
  },
  {
    id: 4,
    name: "صيدلية الأمل",
    email: "amal@pharmacy.com",
    owner: "خالد سعيد",
    status: "معطل",
    subscription: "جاري",
    date: "2026-04-01",
  },
];
export const PharmacyManagement = () => {
  const [isOpenDetails, setIsOpenDetails] = useState(true);

  // 💡 States للفلترة والبحث
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subFilter, setSubFilter] = useState("");

  // 💡 منطق الفلترة الديناميكي
  const filteredPharmacies = allPharmacies.filter((pharma) => {
    const matchesSearch =
      pharma.name.includes(searchQuery) || pharma.owner.includes(searchQuery);
    const matchesStatus = statusFilter === "" || pharma.status === statusFilter;
    const matchesSub = subFilter === "" || pharma.subscription === subFilter;

    return matchesSearch && matchesStatus && matchesSub;
  });

  const textFieldStyles = {
    bgcolor: "#ffffff",
    borderRadius: 1,
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
      right: 50,
    },
  };
  return (
    <Box>
      <Box>
        {/* Header */}
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Box sx={{ mb: 4, textAlign: "right" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#0F172A" }}
            >
              إدارة الصيدليات
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              إدارة الصيدليات في النظام وتتبع حالتها وحالة الاشتراك
            </Typography>
          </Box>
          <Box>
            <PharmaStatsCards />
          </Box>
        </Stack>

        {/* أدوات البحث والفلترة فوق الجدول */}
        <Box
          sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "flex-start" }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="ابحث عن صيدلية أو مالك ... "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300, ...textFieldStyles }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            size="small"
            label="الحالات"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 150, ...textFieldStyles }}
          >
            {/* المطلب 4: وضعنا value حقيقية لكي تعمل الفلترة */}
            <MenuItem value="">الكل</MenuItem>
            <MenuItem value="نشط">نشط</MenuItem>
            <MenuItem value="معطل">معطل</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="الاشتراك"
            value={subFilter}
            onChange={(e) => setSubFilter(e.target.value)}
            sx={{
              width: 150,
              ...textFieldStyles,
            }}
          >
            <MenuItem value="">الكل</MenuItem>
            <MenuItem value="جاري">جاري</MenuItem>
            <MenuItem value="منتهي">منتهي</MenuItem>
          </TextField>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", gap: 3, alignItems: "stretch" }}
        >
          <Grid sx={{ flex: 3 }}>
            <Paper
              elevation={0}
              sx={{ border: "1px solid #E2E8F0", borderRadius: "8px" }}
            >
              <PharmaciesTable data={filteredPharmacies} />
            </Paper>
          </Grid>
          {isOpenDetails && (
            <Grid sx={{ flex: 1 }}>
              <PharmaInfoCard />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default PharmacyManagement;
