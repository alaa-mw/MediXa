import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";

interface Props {
  pharmacy: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const PharmaEditForm = ({ pharmacy, onSubmit, isLoading }: Props) => {
  const [form, setForm] = useState(pharmacy);

  useEffect(() => {
    setForm(pharmacy);
  }, [pharmacy]);

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [key]: e.target.value,
      });
    };
  const rtlTextFieldStyle = {
    "& label": {
      left: "auto",
      right: 27,
      transformOrigin: "top right",
    },
    "& legend": {
      textAlign: "right",
    },
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", borderRadius: 1, pt: 4 }}>
      <Stack spacing={4} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            width: "100%",
          }}
        >
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="اسم الصيدلية"
              value={form.pharmacyName || ""}
              onChange={handleChange("pharmacyName")}
              sx={rtlTextFieldStyle}
            />

            <TextField
              fullWidth
              label="رقم التواصل"
              value={form.contactPhone || ""}
              onChange={handleChange("contactPhone")}
              sx={rtlTextFieldStyle}
            />

            <TextField
              fullWidth
              label="المحافظة"
              value={form.governorate || ""}
              onChange={handleChange("governorate")}
              sx={rtlTextFieldStyle}
            />
          </Stack>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="الجهة المسؤولة"
              value={form.healthDirectorate || ""}
              onChange={handleChange("healthDirectorate")}
              sx={rtlTextFieldStyle}
            />

            <TextField
              fullWidth
              label="اسم المنطقة"
              value={form.areaName || ""}
              onChange={handleChange("areaName")}
              sx={rtlTextFieldStyle}
            />

            <TextField
              fullWidth
              label="العنوان بالتفصيل"
              value={form.addressText || ""}
              onChange={handleChange("addressText")}
              sx={rtlTextFieldStyle}
            />
          </Stack>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => onSubmit(form)}
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              px: 4,
              py: 1.2,
              fontSize: "1rem",
              minWidth: "200px",
              backgroundColor: "#5a3769",
              "&:hover": {
                backgroundColor: "#482b54",
              },
            }}
          >
            {isLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default PharmaEditForm;
