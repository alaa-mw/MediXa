import React from "react";
import { Paper, Box, Typography, Stack } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { CustomTextField } from "../../../../shared/layout/CustomTextField";

interface Patient {
  fullName?: string;
  phone?: string;
  nationalId?: string;
}

interface PatientInfoCardProps {
  patient: Patient;
  requiresPrescriptionAny: boolean;
  nameError?: string;
  onUpdate: (data: Partial<Patient>) => void;
  onClearError?: () => void;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patient,
  requiresPrescriptionAny,
  nameError,
  onUpdate,
  onClearError,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #EAF2F6",
        bgcolor: "#FAFCFD",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <PersonOutlinedIcon sx={{ color: "#316A75", fontSize: 20 }} />
        <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: "#0F172A" }}>
          بيانات المريض {requiresPrescriptionAny ? "(مطلوبة - دواء بوصفة)" : "(مطلوبة لحالة الدفع)"}
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <CustomTextField
          label="الاسم الكامل *"
          placeholder="أدخل اسم المريض"
          value={patient?.fullName || ""}
          onChange={(val) => {
            if (onClearError) onClearError();
            onUpdate({ fullName: val });
          }}
          error={!!nameError}
          helperText={nameError}
        />
        <CustomTextField
          label="رقم الهاتف"
          placeholder="أدخل رقم الهاتف"
          value={patient?.phone || ""}
          onChange={(val) => onUpdate({ phone: val })}
        />
        <CustomTextField
          label="الرقم الوطني"
          placeholder="أدخل الرقم الوطني"
          value={patient?.nationalId || ""}
          onChange={(val) => onUpdate({ nationalId: val })}
        />
      </Stack>
    </Paper>
  );
};

export default PatientInfoCard;