import { ThemeProvider } from "@mui/material/styles";
import AddCustomerOrder from "./features/customer_order/components/AddCustomerOrder";
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
import DrugPricingPage from "./features/medteam_cdb/pages/DrugPricingPage";
import SaleInvoiceDetails from "./features/SUB_invoice/SalesInvoiceDetailsPage";
import PharmacyManagement from "./features/pharma_account/pages/PharamcyAccountManagement";
import PurchaseInvoiceDetails from "./features/purchase_invoices/components/PurchaseInvoiceDetails";
import { CreateSaleInvoicePage } from "./features/sales-and-return/pages/CreateSaleInvoicePage";
import CompleteBatches from "./features/purchase_invoices/components/complete_purchase_invoice/CompleteBatches";
import DamageInvoicesGrid from "./features/damage_invoices/components/DamageInvoicesGrid";
import AddDamageInvoiceDialog from "./features/damage_invoices/components/AddDamageInvoice";
import DamageInvoiceDetails from "./features/damage_invoices/components/DamageInvoiceDetails";
import CreateReturnInvoicePage from "./features/SUB_invoice/return-invoice/CreatReturnInvoicePage";
import PricingPage from "./features/subscription/pages/PricingPage";
import CreatePrivateOfferPage from "./features/finance/pages/CreatePharmaOffer";
import PharmacySubscriptionSchedule from "./features/finance/pages/PharmacySubscriptionSchedule";
import RenewSubscriptionPage from "./features/finance/pages/RenewSubscriptionPage";
import OrderLayout from "./features/orders/OrderLayout";
import CustomerOrderGrid from "./features/customer_order/components/CustomerOrderGrid";
import ReturnInvoiceDetailsPage from "./features/SUB_invoice/return-invoice/ReturnInvoiceDetailsPage";
import CustomerOrderDetails from "./features/customer_order/components/CustomerOrderDetails";
import { CssBaseline } from "@mui/material";
import PurchaseOrderGrid from "./features/purchase_order/components/PurchaseOrderGrid";
import AddPurchaseOrder from "./features/purchase_order/components/AddPurchaseOrder";
import PurchaseOrderDetailsPage from "./features/purchase_order/components/PurchaseOrderDetails";
import DashboardPage from "./features/dashboard/components/DashboardPage";
import AnalysisInventoryPage from "./features/analysis_inventory/components/AnalysisInventoryPage";
import AssistantPage from "./features/ai_assistant/AIAssistantPage";
import PredictiveOrdersPage from "./features/predictiveOrders/PredictiveOrdersPage";
import { OwnerSelectPharmacy } from "./features/auth/components/ownerSelectPharmacy";
import { PaymentSuccessPage } from "./features/online_renew_subsrciption/page/SuccessPaymentPage";
import { PaymentCancelPage } from "./features/online_renew_subsrciption/page/CanclePaymentPage";
import OwnerRenewSubscriptionPage from "./features/online_renew_subsrciption/page/OwnerPlaneCard";
import OwnerPharmacySubscriptionSchedule from "./features/online_renew_subsrciption/page/OwnerPharmaSubs";
import PriceListPage from "./features/pharmacy_price_list/pages/PriceListPage";
import FloatingAssistantLauncher from "./features/ai_assistant/components/FloatingAssistantLauncher";
import AddGeneralDrugPage from "./features/inventory/pages/AddGeneralDrugPage";
import AddPrivateDrugPage from "./features/inventory/pages/AddPrivateDrugPage";
import NotificationsPage from "./features/notifications/pages/NotificationsPage";
import { onMessage } from "firebase/messaging";
import { messaging, requestPermission } from "./firebase/firebaseConfig";
import { useEffect } from "react";
import TokenService from "./shared/services/tokenService";

function App() {
  const pharmacyPaths = ["/pharmacy"];
  useEffect(() => {
    // طلب الإذن عند تحميل التطبيق
    requestPermission();

    // الاستماع للإشعارات أثناء عمل التطبيق في الواجهة
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      if (payload.notification) {
        alert(`${payload.notification.title}: ${payload.notification.body}`);
      }
    });

    return () => unsubscribe();
  }, []);

  const role = TokenService.getUserRole();
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
          <Route path="/select-pharmacy" element={<OwnerSelectPharmacy />} />
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
              <Route path="notifications" element={<NotificationsPage />} />
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
              <Route path="CDB/allDrugs" element={<AllGeneralDrug />} />
              <Route path="CDB/pricing" element={<DrugPricingPage />} />
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
              <Route path="CDB/pricing" element={<DrugPricingPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
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
              <Route index element={<Navigate to="dashboard" replace />} />

              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="reports" element={<AnalysisInventoryPage />} />
              <Route path="notifications" element={<NotificationsPage />} />

              {/* <Route
                path="subscription"
                // element={<Test />}
                // element={<PharmacySubscriptionSchedule isItOwner={true} />}
              /> */}
              <Route
                path="subscription-schedule"
                element={<OwnerPharmacySubscriptionSchedule />}
              />
              <Route
                path="renew-subscription"
                element={<OwnerRenewSubscriptionPage />}
              />
              <Route
                path="subscription/success"
                element={<PaymentSuccessPage />}
              />

              <Route
                path="subscription/cancel"
                element={<PaymentCancelPage />}
              />
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
                <Route index element={<>hello</>} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="sales" element={<SalesLayout />}>
                  <Route index element={<Navigate to="sales" replace />} />
                  <Route path="sales" element={<SaleInvoicesPage />} />
                  <Route path="return" element={<ReturnInvoicesPage />} />
                </Route>
                <Route
                  path="sales/return-details/:invoiceId"
                  element={<ReturnInvoiceDetailsPage />}
                />
                <Route
                  path="sales/sales/create"
                  element={<CreateSaleInvoicePage />}
                />
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
                                <Route path="inventory/add/:generalDrugId" element={<AddGeneralDrugPage />} />
<Route path="inventory/add-private" element={<AddPrivateDrugPage />} />
                <Route
                  path="inventory/batches/:drugId"
                  element={<DrugBatchesPage />}
                />
                {/* orders */}
                <Route path="orders" element={<OrderLayout />}>
                  <Route index element={<Navigate to="purchase" replace />} />
                  <Route path="purchase" element={<PurchaseOrderGrid />} />
                  <Route path="customer" element={<CustomerOrderGrid />} />
                </Route>
                <Route
                  path="orders/purchase/details/:orderId"
                  element={<PurchaseOrderDetailsPage />}
                />
                <Route
                  path="orders/purchase/add"
                  element={<AddPurchaseOrder />}
                />
                <Route
                  path="orders/customer/details/:orderId"
                  element={<CustomerOrderDetails />}
                />
                <Route
                  path="orders/customer/add"
                  element={<AddCustomerOrder />}
                />
                <Route
                  path="predictive-orders"
                  element={<PredictiveOrdersPage />}
                />
                {/* suppliers */}
                <Route path="suppliers" element={<SuppliersList />} />
                <Route path="suppliers/add" element={<AddSupplier />} />
                <Route path="price-list" element={<PriceListPage />} />
                {/* <Route
                  path="medicine-search"
                  element={<Test />} // Replace <Test /> with the actual component for medicine search
                /> */}
                <Route path="support" element={<div>support</div>} />
                <Route path="ai-assistant" element={<AssistantPage />} />
                <Route
                  path="sales-details/:invoiceId"
                  element={<SaleInvoiceDetails />}
                />
                {/* return */}
                <Route
                  path="sales-details/:invoiceId/create-return"
                  element={<CreateReturnInvoicePage />}
                />
              </Route>
            ))}
          </Route>
        </Routes>
        {role === "PHARMACY" && <FloatingAssistantLauncher />}
      </ThemeProvider>
    </>
  );
}

export default App;
