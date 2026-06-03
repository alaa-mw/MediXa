import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import arabicTheme from "./shared/styles/arabicTheme";
import { LandingPage } from "./dashboards/LandingPage";

function App() {
  return (
    <>
      <ThemeProvider theme={arabicTheme}>
        <CssBaseline />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />

          هاد الباث مؤقت، ممكن نستخدمه لصفحة تجريبية أو صفحة تحت الإنشاء
          <Route path="/test" element={<>put here what design</>} />
          
          {/* <Route path="/register" element={<RegisterStepper />} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="*" element={<div>later</div>} />
              <Route index element={<HomePage />} />
            </Route>
          </Route> */}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
