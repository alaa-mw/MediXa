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
import InvoiceLayout from "./features/invoices/InvoiceLayout";
// import PharmacyManagement from "./features/pharma_account/pages/pharamcy-account-management";
import { CreatePharmacyAccount } from "./features/pharma_account/pages/CreatePharmacyAccount";
import InventoryPage from "./features/inventory/pages/InventoryPage";
import AddMedicinePage from "./features/inventory/pages/AddMedicinePage";
import PurchaseInvoiceWizard from "./features/purchase_invoices/components/add_purchase_invoice/PurchaseInvoiceWizard";
import PurchaseInvoiceGrid from "./features/purchase_invoices/components/PurchaseInvoiceGrid";
import SalesLayout from "./features/sales-and-return/pages/SalesReturnLayout";
import { SaleInvoicesPage } from "./features/sales-and-return/pages/SaleInvoicesPage";
import { ReturnInvoicesPage } from "./features/sales-and-return/pages/ReturnInvoicePage";
import { DrugBatchesPage } from "./features/inventory/pages/DrugBatchesPage";
import AddGeneralDrug from "./features/medteam_cdb/pages/AddGeneralDrug";
import AllGeneralDrug from "./features/medteam_cdb/pages/AllGeneralDrug";
import SaleInvoiceDetails from "./features/SUB_invoice/SalesInvoiceDetailsPage";
import PharmacyManagement from "./features/pharma_account/pages/PharamcyAccountManagement";
import PurchaseInvoiceDetails from "./features/purchase_invoices/components/PurchaseInvoiceDetails";
import CompleteBatches from "./features/purchase_invoices/components/complete_purchase_invoice/CompleteBatches";
import DamageInvoicesGrid from "./features/damage_invoices/components/DamageInvoicesGrid";
import AddDamageInvoiceDialog from "./features/damage_invoices/components/AddDamageInvoice";
import DamageInvoiceDetails from "./features/damage_invoices/components/DamageInvoiceDetails";
import CreateReturnInvoicePage from "./features/SUB_invoice/return-invoice/CreatReturnInvoicePage";
import PricingPage from "./features/subscription/pages/PricingPage";
import CreatePrivateOfferPage from "./features/finance/pages/CreatePharmaOffer";
import PharmacySubscriptionSchedule from "./features/finance/pages/PharmacySubscriptionSchedule";
import RenewSubscriptionPage from "./features/finance/pages/RenewSubscriptionPage";


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
                element={<CreatePharmacyAccount />}
              />
              <Route path="subscription-plans" element={<PricingPage />} />
              <Route path="pharmacies" element={<PharmacyManagement />} />
              <Route
                path="pharmacies/subscription-schedule/:id"
                element={<PharmacySubscriptionSchedule />}
              />
              <Route
                path="pharmacies/renew-subscription/:pharmacyId"
                element={<RenewSubscriptionPage />}
              />
              <Route path="support" element={<div>support</div>} />
              <Route path="create_offer" element={<CreatePrivateOfferPage />} />
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
              <Route path="CDB/addDrug" element={<AddGeneralDrug />} />
              <Route path="CDB/allDrugs" element={<AllGeneralDrug />} />
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
                <Route index element={<div>hello</div>} />

                <Route path="sales" element={<SalesLayout />}>
                  <Route index element={<Navigate to="sales" replace />} />
                  <Route path="sales" element={<SaleInvoicesPage />} />
                  <Route path="return" element={<ReturnInvoicesPage />} />
                </Route>

                <Route path="invoices" element={<InvoiceLayout />}>
                  {/* Redirect from /invoices to /invoices/purchase */}
                  <Route index element={<Navigate to="purchase" replace />} />
                  {/* purchase */}
                  <Route path="purchase" element={<PurchaseInvoiceGrid />} />
                  {/* damage */}
                  <Route path="damage" element={<DamageInvoicesGrid />} />
                 
                </Route>

                <Route
                  path="invoices/purchase/details/:invoiceId"
                  element={<PurchaseInvoiceDetails />}
                />
                <Route
                  path="invoices/purchase/add"
                  element={<PurchaseInvoiceWizard />}
                />
                <Route
                  path="invoices/purchase/complete/:invoiceId"
                  element={<CompleteBatches />}
                />

                <Route
                  path="invoices/damage/add"
                  element={<AddDamageInvoiceDialog />}
                />
                 <Route
                    path="invoices/damage/details/:invoiceId"
                    element={<DamageInvoiceDetails />}
                  />

                {/* inventory */}
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="inventory/add" element={<AddMedicinePage />} />
                <Route
                  path="inventory/batches/:drugId"
                  element={<DrugBatchesPage />}
                />

                <Route path="orders" element={<div>orders</div>} />

                <Route path="suppliers" element={<SuppliersList />} />
                <Route path="suppliers/add" element={<AddSupplier />} />
                <Route
                  path="medicine-search"
                  element={<div>medicine-search</div>}
                />

                <Route path="support" element={<div>support</div>} />
                <Route path="sales-details" element={<SaleInvoiceDetails />} />
                {/* return */}
                <Route
                  path="sales-details/create-return"
                  element={<CreateReturnInvoicePage />}
                />
              </Route>
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
