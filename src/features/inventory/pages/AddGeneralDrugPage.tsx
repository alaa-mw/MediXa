
import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";


import {
  selectGeneralDrugState,
  selectGeneralDrugPayload,
  setActiveStep,
  setGeneralDrugInfo,
  resetForm,
} from "../store/generalDrugSlice";
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import usePostData from "../../../shared/hooks/usePostData";
import { AddGeneralDrugStepper } from "../components/AddMedicine/AddGeneralDrugStepper";
import { StepBatches } from "../components/AddMedicine/StepBatches";
import { StepPricingAndStorage } from "../components/AddMedicine/StepPricingAndStorage";

export default function AddGeneralDrugPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ generalDrugId: string }>();
  const { showSnackbar } = useSnackbar();

  const { activeStep } = useAppSelector(selectGeneralDrugState);
  const payload = useAppSelector(selectGeneralDrugPayload);

  const { mutate: addPharmacyDrug, isPending } = usePostData("/pharmacy-drugs/from-general");

useEffect(() => {
  const drugId = Number(params.generalDrugId) || 1;

  const drugName =
    location.state?.drugName || `دواء عام #${drugId}`;

  const netPrice = Number(location.state?.netPrice ?? 0);
  const consumerPrice = Number(location.state?.consumerPrice ?? 0);

  dispatch(
    setGeneralDrugInfo({
      id: drugId,
      name: drugName,
      netPrice,
      consumerPrice,
    })
  );

  return () => {
    dispatch(resetForm());
  };
}, [dispatch, params.generalDrugId, location.state]);

  const handleNext = () => dispatch(setActiveStep(activeStep + 1));
  const handleBack = () => dispatch(setActiveStep(activeStep - 1));

  const handleSubmit = () => {
    addPharmacyDrug(payload, {
      onSuccess: () => {
        showSnackbar("تمت إضافة الدواء بنجاح للمخزن الخاص بصيدليتك", "success");
        dispatch(resetForm());
        navigate(-1);
      },
      onError: (err: any) => {
        showSnackbar(err?.message || "حدث خطأ أثناء حفظ البيانات!", "error");
      },
    });
  };

  return (
    <AddGeneralDrugStepper
      activeStep={activeStep}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    >
      {activeStep === 0 && <StepPricingAndStorage />}
      {activeStep === 1 && <StepBatches />}
    </AddGeneralDrugStepper>
  );
}