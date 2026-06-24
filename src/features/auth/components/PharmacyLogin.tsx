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
import type { LoginResponse } from "../types/LoginResponse";
import TokenService from "../../../shared/services/tokenService";
import { useNavigate } from "react-router-dom";

const PharmacyLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
 const navigate = useNavigate();

  const { mutate: loginPharmacy, isPending } =
    usePostDataNoToken<LoginResponse>("/authentication/pharmacies/sign-in");

  const [formData, setFormData] = useState({
    loginCode: "",
    password: "",
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

    loginPharmacy(formData, {
      onSuccess: (response) => {
        console.log("response", response);

        TokenService.setUserRole(response?.data?.accountType); 
        TokenService.setTokens(response?.data?.tokens);

        navigate(`/${TokenService.getUserRole()?.toLocaleLowerCase()}`); // change later
      },

      onError: (error) => {
        console.log("error:", error);
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
          تسجيل دخول الصيدلية
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="رمز تسجيل الصيدلية"
          name="loginCode"
          variant="standard"
          value={formData.loginCode}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          required
          label="كلمة المرور"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={formData.password}
          onChange={handleChange}
          sx={{ mb: 4 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
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
            <CircularProgress size={24} color="inherit" />
          ) : (
            "تسجيل الدخول"
          )}
        </Button>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 1,
          }}
        >
          لا تملك حساباً؟{" "}
          <a
            href="/pharmacy-register"
            style={{
              color: theme.palette.primary.main,
            }}
          >
            تفعيل الحساب
          </a>
        </Typography>
      </form>
    </Paper>
  );
};

export default PharmacyLogin;
