import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import usePostDataNoToken from "../../../shared/hooks/usePostDataNoToken";
import { type Role } from "../../../app/routes/roles";
import React, { useState } from "react";
import theme from "../../../shared/styles/mainTheme";
import type { User } from "../types/user";
import logonobg from "../../../assets/logonobg.png";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

interface UserRegisterProps {
  ownerMode?: boolean; 
}

const UserRegister = ({ ownerMode = false }: UserRegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const { mutate: registerUser, isPending } = usePostDataNoToken<User>(
    "/authentication/users/first-register",
  );

  const [formData, setFormData] = React.useState({
    email: "",
    loginCode: "",
    accountType: ownerMode ? "PHARMACY_OWNER" as Role :  "ADMIN" as Role ,
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: string | null,
  ) => {
    if (newRole !== null) {
      setFormData((prev) => ({
        ...prev,
        accountType: newRole as Role,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    registerUser(formData, {
      onSuccess: (response) => {
        console.log("response", response);
        showSnackbar(
          "تم تفعيل حساب المستخدم بنجاح, يمكنك الآن تسجيل الدخول",
          "success",
        );
        navigate(`/private-login`);
      },
      onError: (error) => {
        showSnackbar(
          "حدث خطأ أثناء تفعيل حساب المستخدم, يرجى المحاولة مرة أخرى",
          "error",
        );
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
        pb: 2,
        px: 4,
        m: 1,
        borderRadius: 2,
        border: `2px solid ${theme.palette.primary?.main}`,
        boxShadow: `0 4px 12px ${theme.palette.primary?.light}`,
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
        <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
          أهلاً بك في منظومتنا ..!
        </Typography>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
          التسجيل لأول مرة
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        {!ownerMode && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <ToggleButtonGroup
              value={formData.accountType}
              exclusive
              onChange={handleRoleChange}
              aria-label="User role"
              sx={{
                "& .MuiToggleButton-root": {
                  px: 1,
                  py: 1,
                  border: `1px solid ${theme.palette.primary.main}`,
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: "white",
                    "& + .MuiToggleButton-root": {
                      borderLeft: `1px solid ${theme.palette.primary.main}`,
                    },
                  },
                  "&:not(.Mui-selected)": {
                    color: theme.palette.primary.main,
                  },
                },
                // RTL group container
                "&.MuiToggleButtonGroup-root": {
                  flexDirection: "row-reverse", // Reverse button order for RTL
                },
              }}
            >
              <ToggleButton
                value="ADMIN"
                aria-label="ADMIN"
                sx={{ width: 150 }}
              >
                الفريق الإداري
              </ToggleButton>
              <ToggleButton
                value="MEDICAL_TEAM"
                aria-label="MEDICAL_TEAM"
                sx={{ width: 150 }}
              >
                الفريق الطبي
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
        <TextField
          fullWidth
          label="البريد الإلكتروني"
          name="email"
          type="email"
          variant="standard"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />

        <TextField
          fullWidth
          label="كود الدخول"
          name="loginCode"
          type="text"
          variant="standard"
          value={formData.loginCode}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />

        <TextField
          fullWidth
          label="كلمة المرور"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={formData.password}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          fullWidth
          label="تأكيد كلمة المرور"
          name="passwordConfirmation"
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          sx={{
            py: 1.5,
            mb: 2,
            background: theme.palette.primary.main,
          }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : "تسجيل"}
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
          لديك حساب بالفعل؟{" "}
          <a
            href={ownerMode ? "/owner-login" : "/private-login"}
            style={{ color: theme.palette.primary.main }}
          >
            سجل الدخول
          </a>
        </Typography>
      </form>
    </Paper>
  );
};

export default UserRegister;
