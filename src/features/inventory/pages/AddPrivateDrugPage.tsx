import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Fade } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import usePostData from "../../../shared/hooks/usePostData";
import {
  selectPrivateDrugState,
  selectPrivateDrugPayload,
  setActiveStep,
  resetPrivateForm,
} from "../store/privateDrugSlice";

// Stepper Component
import { AddPrivateDrugStepper } from "../components/AddMedicine/AddPrivateDrugStepper";

// Steps Components
import { StepPricingAndStorage } from "../components/AddMedicine/StepPricingAndStorage";
import { StepBatches } from "../components/AddMedicine/StepBatches";
import { StepBasicInfo } from "../components/AddMedicine/StepBasicInfo";

export default function AddPrivateDrugPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(resetPrivateForm());
    return () => {
      dispatch(resetPrivateForm());
    };
  }, [dispatch]);

  const { activeStep } = useAppSelector(selectPrivateDrugState);
  const payload = useAppSelector(selectPrivateDrugPayload);

  const { mutate: addPrivateDrug, isPending } = usePostData(
    "/pharmacy-drugs/add-private-drug"
  );

  const handleNext = () => dispatch(setActiveStep(activeStep + 1));
  const handleBack = () => dispatch(setActiveStep(activeStep - 1));

  const handleSubmit = () => {
    const rawPayload = { ...payload } as Record<string, any>;
    delete rawPayload.expiryDateAlarm;

    const cleanPayload = {
      ...rawPayload,
      netPrice: parseFloat(rawPayload.netPrice) || 0,
      consumerPrice: parseFloat(rawPayload.consumerPrice) || 0,
    };

    addPrivateDrug(cleanPayload, {
      onSuccess: () => {
        showSnackbar("تمت إضافة الدواء الخاص بنجاح في صيدليتك!", "success");
        dispatch(resetPrivateForm());
        navigate(-1);
      },
      onError: (err: any) => {
        const details = err?.response?.data?.details;
        const errorMessage = Array.isArray(details)
          ? details.join(" | ")
          : err?.response?.data?.message ||
            err?.message ||
            "حدث خطأ أثناء حفظ الدواء الخاص!";

        showSnackbar(errorMessage, "error");
      },
    });
  };

  return (
    <AddPrivateDrugStepper
      activeStep={activeStep}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    >
      {/* استخدام Fade مع key لإنشاء حركة تنقل ناعمة جداً */}
      <Fade key={activeStep} in={true} timeout={350}>
        <Box>
          {activeStep === 0 && <StepBasicInfo />}
          {activeStep === 1 && <StepPricingAndStorage isPrivate={true} />}
          {activeStep === 2 && <StepBatches isPrivate={true} />}
        </Box>
      </Fade>
    </AddPrivateDrugStepper>
  );
}