import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { navItems } from "../constants/navigation";

const NavBar = () => {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid #E2E8F0",
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={1.2}
          component="a"
          href="#hero"
          sx={{ textDecoration: "none", alignItems: "center" }}
        >
          <LocalPharmacyIcon sx={{ color: "primary.main" }} />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
            MediXa AI
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {navItems.map((item) => (
            <Typography
              key={item.label}
              component="a"
              href={item.href}
              sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: 600,
                "&:hover": { color: "primary.main" },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>

        <Button variant="contained" href="#pricing" sx={{ borderRadius: 2 }}>
          ابدأ الاشتراك الآن
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
