import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import usePostDataNoToken from "../../../shared/hooks/usePostDataNoToken";
import theme from "../../../shared/styles/mainTheme";
import logonobg from "../../../assets/logonobg.png";
import type { Pharmacy } from "../types/Pharmacy";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

const PharmacyRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  
  const { mutate: registerPharmacy, isPending  } = usePostDataNoToken<Pharmacy>(
    "/authentication/pharmacies/first-register",
  );

  const [formData, setFormData] = useState({
    pharmacyLoginCode: "",
    pharmacyPassword: "",
    pharmacyPasswordConfirmation: "",
    OwnerEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerPharmacy(formData, {
      onSuccess: (response) => {
        console.log("response", response);
        showSnackbar("تم تفعيل حساب الصيدلية بنجاح, يمكنك الآن تسجيل الدخول", "success");
        navigate(`/pharmacy-login`);
      },

      onError: (error) => {
        showSnackbar("حدث خطأ أثناء تفعيل حساب الصيدلية, يرجى المحاولة مرة أخرى", "error");
        console.log("error", error);
      },
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        alignSelf: "center",
        maxWidth: 400,
        width: "100%",
        pb: 2,
        px: 4,
        m: 1,
        borderRadius: 2,
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: `0 4px 12px ${theme.palette.primary.light}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={logonobg}
          alt="Logo"
          width={120}
          sx={{
            transform: "scale(2)",
          }}
        />

        <Typography
          variant="subtitle2"
          sx={{
            color: "gray",
            mb: 1,
          }}
        >
          أهلاً بك في منظومتنا ..!
        </Typography>

        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "bold",
          }}
        >
          تفعيل حساب الصيدلية
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="البريد الإلكتروني للمالك"
          name="OwnerEmail"
          type="email"
          variant="standard"
          value={formData.OwnerEmail}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          required
          label="رمز تسجيل الصيدلية"
          name="pharmacyLoginCode"
          variant="standard"
          value={formData.pharmacyLoginCode}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          required
          label="كلمة المرور"
          name="pharmacyPassword"
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={formData.pharmacyPassword}
          onChange={handleChange}
          sx={{ mb: 3 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          required
          label="تأكيد كلمة المرور"
          name="pharmacyPasswordConfirmation"
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={formData.pharmacyPasswordConfirmation}
          onChange={handleChange}
          sx={{ mb: 4 }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          disabled={isPending}
          sx={{
            py: 1.5,
            mb: 2,
            background: theme.palette.primary.main,
          }}
        >
          {isPending ? (
            <CircularProgress
              size={24}
              color="inherit"
            />
          ) : (
            "تفعيل الحساب"
          )}
        </Button>
      </form>
    </Paper>
  );
};

export default PharmacyRegister;