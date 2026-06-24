import { useState } from "react";
import { CssBaseline, Box, } from "@mui/material";

// import CustomWizardStepper from "./CustomWizardStepper";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import BatchManagementForm from "./BatchManagementForm";
import InvoiceFinalConfirmation from "./InvoiceFinalConfirmation";
import PurchaseInvoiceStepper from "./PurchaseInvoiceStepper";

const InvoiceWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <CssBaseline />
      <Box dir="rtl" sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F4F9FB" }}>
       
        {/* Content Viewport */}
        <Box sx={{ flexGrow: 1,  overflowY: "auto" }}>
             <PurchaseInvoiceStepper activeStep={currentStep} />
          {/* <CustomWizardStepper activeStep={currentStep} /> */}
          {currentStep === 0 && <InvoiceDetailsForm onNext={handleNext} />}
          {currentStep === 1 && <BatchManagementForm onNext={handleNext} onBack={handleBack} />}
          {currentStep === 2 && <InvoiceFinalConfirmation onBack={handleBack} />}
        </Box>
      </Box>
    </>
  );
}

export default InvoiceWizard;