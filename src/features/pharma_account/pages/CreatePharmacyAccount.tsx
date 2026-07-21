// CreatePharmacyAccount.tsx

import { ThemeProvider } from "@emotion/react";
import theme from "../../../shared/styles/arabicTheme";
import { Box, CssBaseline, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import usePostData from "../../../shared/hooks/usePostData";
import type { AllOwnersResponse } from "../types/allOwnersResponse";
import InfoStatus from "../components/InfoSection";
import OwnerAccountCard from "../components/OwnerCard";
import PharmacyAccountCard from "../components/PharamcyCard";
import CreateAccountButton from "../components/CreateAccountButton";
import { useQueryClient } from "@tanstack/react-query";
import {
  INITIAL_FORM,
  type PharmacyRegistrationForm,
} from "../types/createPharamacyFormTypes";
import { useLocation, useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/SubscriptionCrard";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

export const CreatePharmacyAccount = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  // 1. قراءة البيانات المبدئية من الـ sessionStorage إن وجدت، وإلا استخدام المبدئي
  const [formData, setFormData] = useState<PharmacyRegistrationForm>(() => {
    const saved = sessionStorage.getItem("pharmacy_reg_form");
    return saved ? JSON.parse(saved) : INITIAL_FORM;
  });

  // 2. تحديث الـ sessionStorage كلما تغيرت بيانات الفورم
  useEffect(() => {
    sessionStorage.setItem("pharmacy_reg_form", JSON.stringify(formData));
  }, [formData]);

  // 3. مراقبة الـ state القادم من صفحة الباقات فقط لتحديث جزئية الاشتراك
  useEffect(() => {
    if (location.state?.fromPricing) {
      const { selectedPlanId, selectedOfferId } = location.state;

      setFormData((prev) => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          planId: selectedPlanId,
          offerId: selectedOfferId || "",
        },
      }));

      // تنظيف الستيت الخاص بالـ router فوراً
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const { mutate: createPharmacy, isPending } =
    usePostData<AllOwnersResponse>("/pharmacy/create");

  const handleSubmit = () => {
    const minutesToAdd = 5;

    const now = new Date();
    now.setMinutes(now.getMinutes() + minutesToAdd);
    const startsAt = now.toISOString();

    console.log(startsAt);
    // النتيجة ستكون بالشكل: "2026-07-21T17:25:43.997Z"
    let finalPayload: any = {
      ownerMode: formData.ownerMode,
      pharmacy: { ...formData.pharmacy, openingDate: startsAt },
      subscription: {
        ...formData.subscription,
        startsAt: startsAt,
      },
    };

    if (formData.ownerMode === "EXISTING") {
      finalPayload.existingOwnerId = Number(formData.newOwner.id);
    } else {
      finalPayload.newOwner = {
        fullName: formData.newOwner.ownerName,
        email: formData.newOwner.email,
        phone: formData.newOwner.mobile,
        nationalId: formData.newOwner.nationalId,
      };
    }
    console.log("*********CreatePharamaInfo************", finalPayload);
    createPharmacy(finalPayload, {
      onSuccess: (response) => {
        console.log("Success : Create pharmacy response", response);
        queryClient.invalidateQueries({ queryKey: ["/pharmacy-owners"] });
        sessionStorage.removeItem("pharmacy_reg_form");
        setFormData(INITIAL_FORM);
        showSnackbar("تم إنشاء الحساب بنجاح", "success");
      },
      onError: (error) => {
        console.log("error: Create Pharmacy", error);
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Stack direction="column">
            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
              إنشاء حساب صيدلية
            </Typography>
            <Typography color="text.secondary">
              إضافة صيدلية جديدة إلى النظام بشكل متكامل
            </Typography>
          </Stack>
          <Box>
            <InfoStatus />
          </Box>
        </Stack>

        <Stack spacing={4} sx={{ mt: 4 }}>
          <OwnerAccountCard
            ownerData={formData.newOwner}
            ownerMode={formData.ownerMode}
            setFormData={setFormData}
          />
          <PharmacyAccountCard
            pharmacyData={formData.pharmacy}
            setPharmacyData={(updatedPharmacy) =>
              setFormData((prev) => ({
                ...prev,
                pharmacy:
                  typeof updatedPharmacy === "function"
                    ? updatedPharmacy(prev.pharmacy)
                    : updatedPharmacy,
              }))
            }
          />

          {!!formData.subscription.planId && (
            <SubscriptionCard planName={formData.subscription.planId} />
          )}

          <CreateAccountButton
            isPending={isPending}
            onSubmit={handleSubmit}
            formData={formData}
            hasPlan={!!formData.subscription.planId}
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
