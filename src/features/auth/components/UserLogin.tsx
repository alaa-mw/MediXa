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

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate: loginUser, isPending } = usePostDataNoToken<LoginResponse>(
    "/authentication/sign-in-user",
  );

  const [formData, setFormData] = useState({
    email: "",
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

    loginUser(formData, {
      onSuccess: (response) => {
        console.log("response", response);

        TokenService.setUserRole(response?.data?.accountType); // change later
        TokenService.setTokens(response?.data?.tokens);
        const pharmacies = response?.data?.pharmacies;

        if (
          TokenService.getUserRole() === "PHARMACY_OWNER" &&
          pharmacies &&
          pharmacies.length !== 1
        ) {
          navigate(`/select-pharmacy`, {
            state: { pharmacies: pharmacies },
          });
        } else {
          if (response?.data?.pharmacies?.[0]?.pharmacyId) {
            TokenService.setPharmacyId(
              response?.data?.pharmacies?.[0]?.pharmacyId,
            );
            // localStorage.setItem(
            //   "pharmacyId",
            //   response?.data?.pharmacies?.[0]?.pharmacyId,
            // );
          }
          if (response?.data?.pharmacies?.[0]?.pharmacyName) {
            localStorage.setItem(
              "pharmacyName",
              response?.data?.pharmacies?.[0]?.pharmacyName,
            );
          }
          navigate(`/${TokenService.getUserRole()?.toLocaleLowerCase()}`);
        }
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
          تسجيل الدخول
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="البريد الإلكتروني"
          name="email"
          type="email"
          variant="standard"
          value={formData.email}
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
          ليس لديك حساب؟{" "}
          <a
            href="/private-register"
            style={{
              color: theme.palette.primary.main,
            }}
          >
            إنشاء حساب
          </a>
        </Typography>
      </form>
    </Paper>
  );
};

export default UserLogin;
