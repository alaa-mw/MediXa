import { useState } from "react";
import PurchaseInvoiceStepper from "./PurchaseInvoiceStepper";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import BatchManagementForm from "./BatchManagementForm";
import InvoiceConfirmation from "./InvoiceConfirmation";

const PurchaseInvoiceWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <PurchaseInvoiceStepper
        activeStep={currentStep}
        onNext={() => setCurrentStep((s) => Math.min(s + 1, 2))}
        onBack={() => setCurrentStep((s) => Math.max(s - 1, 0))}
      >
        {currentStep === 0 && <InvoiceDetailsForm />}
        {currentStep === 1 && <BatchManagementForm />}
        {currentStep === 2 && <InvoiceConfirmation />}
      </PurchaseInvoiceStepper>
    </>
  );
};

export default PurchaseInvoiceWizard;
