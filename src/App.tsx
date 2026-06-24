import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import arabicTheme from "./shared/styles/arabicTheme";
import { LandingPage } from "./dashboards/LandingPage";
import UserRegister from "./features/auth/components/UserRegister";
import UserLogin from "./features/auth/components/UserLogin";
import PharmacyRegister from "./features/auth/components/PharmacyRegister";
import PharmacyLogin from "./features/auth/components/PharmacyLogin";
import ProtectedRoute from "./app/routes/ProtectedRoute";
import { roleLabels } from "./app/routes/roles";
import DashboardTemplate from "./dashboards/DashboardTemplate";
import AuthGateway from "./features/auth/components/AuthGateway";
import SuppliersList from "./features/suppliers/components/SuppliersList";
import AddSupplier from "./features/suppliers/components/AddSupplier";
import PurchaseInvoiceDetails from "./features/invoices/purchase/components/PurchaseInvoiceDetails";
import PurchaseInvoiceList from "./features/invoices/purchase/components/PurchaseInvoiceList";
import InvoiceLayout from "./features/invoices/InvoiceLayout";
import PurchaseInvoiceStepper from "./features/invoices/purchase/components/PurchaseInvoiceStepper";
import NewPurchaseInvoice from "./features/invoices/purchase/components/NewPurchaseInvoice";
import InvoiceWizard from "./features/invoices/purchase/components/InvoiceWizard";

function App() {
  const pharmacyPaths = ["/pharmacy", "/pharmacy_owner"];
  return (
    <>
      <ThemeProvider theme={arabicTheme}>
        <CssBaseline />

        <Routes>

          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/private-register" element={<UserRegister />} />
          <Route path="/private-login" element={<UserLogin />} />
          <Route path="/auth" element={<AuthGateway />} />
          <Route path="/owner-register" element={<UserRegister ownerMode />} />
          <Route path="/owner-login" element={<UserLogin />} />
          <Route path="/pharmacy-register" element={<PharmacyRegister />} />
          <Route path="/pharmacy-login" element={<PharmacyLogin />} />

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={[roleLabels.ADMIN]} />}>
            <Route path="/admin" element={<DashboardTemplate />}>
              <Route path="*" element={<div>later</div>} />
              <Route index element={<div>hello</div>} />

              <Route
                path="create-account"
                element={<div>create-account</div>}
              />
              <Route path="pharmacies" element={<div>pharmacies</div>} />
              <Route path="support" element={<div>support</div>} />
            </Route>
          </Route>

          {/* Medical Team routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={[roleLabels.MEDICAL_TEAM]} />
            }
          >
            <Route path="/medical_team" element={<DashboardTemplate />}>
              <Route path="*" element={<div>later</div>} />
              <Route index element={<div>hello</div>} />
            </Route>
          </Route>

          {/* Pharmacy Owner routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={[roleLabels.PHARMACY_OWNER]} />
            }
          >
            <Route path={"/pharmacy_owner"} element={<DashboardTemplate />}>
              <Route path="*" element={<div>later</div>} />
              <Route index element={<div>hello</div>} />

              <Route path="dashboard" element={<div>dashboard</div>} />

              <Route path="reports" element={<div>reports</div>} />

              <Route path="suppliers" element={<SuppliersList />} />
              <Route path="suppliers/add" element={<AddSupplier />} />

              <Route path="subscription" element={<div>subscription</div>} />
            </Route>
          </Route>

          {/* Pharmacy routes */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={[roleLabels.PHARMACY, roleLabels.PHARMACY_OWNER]}
              />
            }
          >
            {pharmacyPaths.map((path) => (
              <Route path={path} key={path} element={<DashboardTemplate />}>
                <Route path="*" element={<div>later</div>} />
                <Route index element={<div>hello</div>} />

                <Route path="sales" element={<div>sales</div>} />

                <Route path="invoices" element={<InvoiceLayout />}>
                  {/* Redirect from /invoices to /invoices/purchase */}
                  <Route index element={<Navigate to="purchase" replace />} />
                  {/* purchase */}
                  <Route path="purchase" element={<PurchaseInvoiceList />} />
                  {/* remove */}
                  <Route path="remove" element={<div>remove invoices</div>} />
                  <Route
                    path="remove/details"
                    element={<div>remove invoice details</div>}
                  />
                </Route>

                <Route
                  path="invoices/purchase/details"
                  element={<PurchaseInvoiceDetails />}
                />
                <Route
                  path="invoices/purchase/add"
                  element={<InvoiceWizard />}
                />

                {/* inventory */}
                <Route path="inventory" element={<div>inventory</div>} />

                <Route path="orders" element={<div>orders</div>} />
                <Route
                  path="medicine-search"
                  element={<div>medicine-search</div>}
                />

                <Route path="support" element={<div>support</div>} />
              </Route>
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
