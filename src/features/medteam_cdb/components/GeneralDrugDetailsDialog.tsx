import CloseIcon from "@mui/icons-material/Close";
import MedicationIcon from "@mui/icons-material/MedicationOutlined";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ScienceIcon from "@mui/icons-material/ScienceOutlined";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import useGetData from "../../../shared/hooks/useGetData";
import type { GeneralDrugDetails } from "../types/allGeneralDrugType";

interface Props {
  generalDrugId: number | null;
  onClose: () => void;
}

const GeneralDrugDetailsDialog = ({ generalDrugId, onClose }: Props) => {
  const { data, isLoading, isError } = useGetData<GeneralDrugDetails>(
    generalDrugId ? `/general-drugs/${generalDrugId}` : "",
  );
  const drug = data?.data;

  return (
    <Dialog
      open={generalDrugId !== null}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      dir="rtl"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            overflow: "hidden",
          },
        },
      }}
    >
      {/* الهيدر العلوي الملون */}
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <MedicationIcon sx={{ fontSize: 28 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "1.15rem" }}
          >
            تفاصيل الدواء
          </Typography>
        </Stack>
        <IconButton
          aria-label="إغلاق"
          onClick={onClose}
          sx={{
            color: "#fff",
            bgcolor: "rgba(255, 255, 255, 0.15)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: "24px !important" }}>
        {/* حالة التحميل */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#3d9197" }} size={42} />
          </Box>
        )}

        {/* حالة الخطأ */}
        {isError && (
          <Box sx={{ py: 3 }}>
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              حدث خطأ أثناء جلب تفاصيل الدواء. يرجى المحاولة لاحقاً.
            </Alert>
          </Box>
        )}

        {/* عرض تفاصيل الدواء */}
        {drug && (
          <Stack spacing={2.5}>
            {/* كارت الاسم التجاري والشكل الدوائي */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: "rgba(61, 145, 151, 0.05)",
                borderColor: "rgba(61, 145, 151, 0.25)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1.5,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  الاسم التجاري
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: "secondary.main" }}
                >
                  {drug.tradeName}
                </Typography>
              </Box>

              <Chip
                label={drug.dosageForm.dosageFormName}
                size="small"
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 1.5,
                  px: 0.5,
                }}
              />
            </Paper>

            {/* شبكة الباركود والوحدات */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 2,
              }}
            >
              <Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <QrCode2Icon sx={{ color: "#64748b" }} />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      الباركود
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#1e293b" }}
                    >
                      {drug.barcode || "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Inventory2OutlinedIcon sx={{ color: "#64748b" }} />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      الوحدات في العلبة
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#1e293b" }}
                    >
                      {drug.unitsPerBox}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* صندوق الأسعار */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: "#f1f5f9",
                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    سعر النت
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#334155" }}
                  >
                    {drug.netPrice.toLocaleString()}{" "}
                    <Typography component="span" variant="caption">
                      ل.س
                    </Typography>
                  </Typography>
                </Box>

                <Box sx={{ borderRight: "1px solid #cbd5e1", pr: 2 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    السعر للمستهلك
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, color: "#3d9197" }}
                  >
                    {drug.consumerPrice.toLocaleString()}{" "}
                    <Typography component="span" variant="caption">
                      ل.س
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* قسم المواد الفعالة */}
            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 1 }}
              >
                <ScienceIcon sx={{ fontSize: 20, color: "#3d9197" }} />
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "#334155" }}
                >
                  المواد الفعالة
                </Typography>
              </Stack>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {drug.ingredients.length > 0 ? (
                  drug.ingredients.map(
                    ({ ingredient, strengthValue, unit }, idx) => (
                      <Chip
                        key={idx}
                        label={`${ingredient.ingredientName} ${strengthValue} ${unit}`}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "#cbd5e1",
                          color: "#334155",
                          fontWeight: 500,
                          bgcolor: "#fff",
                        }}
                      />
                    ),
                  )
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    لا يوجد مواد فعالة مضافة
                  </Typography>
                )}
              </Box>
            </Box>

            <Divider />

            {/* قسم التصنيفات */}
            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 1 }}
              >
                <CategoryIcon sx={{ fontSize: 20, color: "#3d9197" }} />
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "#334155" }}
                >
                  التصنيفات
                </Typography>
              </Stack>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {drug.categories.length > 0 ? (
                  drug.categories.map(({ category }, idx) => (
                    <Chip
                      key={idx}
                      label={category.categoryName}
                      size="small"
                      sx={{
                        bgcolor: "rgba(61, 145, 151, 0.12)",
                        color: "#2c6b70",
                        fontWeight: 600,
                        border: "none",
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    لا يوجد تصنيفات
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GeneralDrugDetailsDialog;
