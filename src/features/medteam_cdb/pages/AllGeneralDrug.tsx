import {
  Box,
  Card,
  InputAdornment,
  Grid,
  Pagination,
  Paper,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GeneralDrugTable from "../components/GeneralDrugTable";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type { GeneralDrug, PaginatedData } from "../types/allGeneralDrugType";
import { useEffect, useState } from "react";
import type { DosageForm } from "../types/dosageFormType";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const AllGeneralDrug = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalGeneralDrugsCount, setTotalGeneralDrugsCount] = useState<
    number | null
  >(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const {
    data: response,
    isLoading,
    isError,
    setQueryParams,
  } = useGetWithParams<PaginatedData<GeneralDrug>>("/general-drugs", {
    page: 1,
    limit: 20,
    searchTerm: "",
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      searchTerm: debouncedSearchTerm.trim(),
    }));
  }, [debouncedSearchTerm, setQueryParams]);

  const paginatedResult = response?.data;
  const drugsList = paginatedResult?.data || [];
  const totalPages = paginatedResult?.pages || 1;
  const totalItems = paginatedResult?.total || 0;

  useEffect(() => {
    if (paginatedResult?.total !== undefined && !searchTerm) {
      setTotalGeneralDrugsCount(paginatedResult.total);
    }
  }, [paginatedResult?.total, searchTerm]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <Box>
      <Box>
        {/* Header */}
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box
            sx={{
              mb: 4,
              textAlign: "right",
              // display: "flex",
              // justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#0F172A" }}
            >
              مراجعة الأدوية
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              ابحث عن معلومات شاملة عن الأدوية والبدائل والرؤى السريرية
            </Typography>
          </Box>
          <Card
            sx={{
              p: "8px 16px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
              border: "1px solid #3d9197",
              backgroundColor: "transparent",
              direction: "rtl",
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              height: "80px",
              minHeight: "unset",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center", // التوسط العمودي للنصوص والرقم
                justifyContent: "center",
                gap: 1.5,
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#475569",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                }}
              >
                إجمالي الأدوية
              </Typography>

              <Typography
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#3d9197", // استخدام نفس لون البوردر المتناسق
                  fontFamily: "sans-serif",
                  fontSize: "1.6rem", // حجم ممتاز وسلس
                  lineHeight: 1, // يمنع حجز مساحة خفيفة أسفل الرقم
                  display: "inline-block",
                }}
              >
                {totalGeneralDrugsCount}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
              >
                دواء في القاعدة المركزية
              </Typography>
            </Box>
          </Card>
        </Stack>

        <Box sx={{ mb: 3, maxWidth: "35%" }}>
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث باسم الدواء أو الباركود"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              backgroundColor: "#fff",
              border: "0.5px solid #eaebec",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
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
              <GeneralDrugTable
                drugs={drugsList}
                isLoading={isLoading}
                isError={isError}
              />
            </Paper>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 2,
              }}
            >
              {totalPages > 1 && (
                <Pagination
                  page={paginatedResult?.page || 1}
                  count={totalPages}
                  color="primary"
                  onChange={handlePageChange}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AllGeneralDrug;
