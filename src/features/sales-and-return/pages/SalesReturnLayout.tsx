import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import theme from "../../../shared/styles/mainTheme";

const SalesLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  {/* إذا كان الرابط يحتوي على /return فالتبويب النشط هو return، وإلا فهو sales */}
  const currentTab = location.pathname.includes("/return")
    ? "return"
    : "sales";

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    value: string | null,
  ) => {
    if (!value) return;

    navigate(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <ToggleButtonGroup
        value={currentTab}
        exclusive
        onChange={handleChange}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          width: "fit-content",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          "& .MuiToggleButton-root": {
            border: "none",
            borderRadius: "12px !important", 
            px: { xs: 3, sm: 5 },
            fontWeight: "bold",
            color: "text.primary",
            transition: "all 0.3s ease",
            "&.Mui-selected": {
              backgroundColor: theme.palette?.primary?.main,
              color: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              "&:hover": {
                backgroundColor: theme.palette?.primary?.dark,
              },
            },
          },
        }}
      >
        <ToggleButton value="sales">
          فواتير المبيع
        </ToggleButton>

        <ToggleButton value="return">
          فواتير المرتجع
        </ToggleButton>
      </ToggleButtonGroup>

      <Outlet />
    </Box>
  );
};

export default SalesLayout;