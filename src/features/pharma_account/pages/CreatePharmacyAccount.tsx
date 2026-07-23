import { ThemeProvider } from "@emotion/react";
import theme from "../../../shared/styles/arabicTheme";
import { Box, CssBaseline, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import usePostData from "../../../shared/hooks/usePostData";
import type { AllOwnersResponse } from "../types/allOwnersResponse";
import InfoStatus from "../components/InfoSection";
import OwnerAccountCard from "../components/OwnerCard";
import PharmacyAccountCard from "../components/PharamcyCard";
import { useQueryClient } from "@tanstack/react-query";
import {
  INITIAL_FORM,
  type PharmacyRegistrationForm,
} from "../types/createPharamacyFormTypes";
import { useLocation, useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/SubscriptionCrard";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import CreateAccountButton from "../components/createAccountButton";

export const CreatePharmacyAccount = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<PharmacyRegistrationForm>(() => {
    const saved = sessionStorage.getItem("pharmacy_reg_form");
    return saved ? JSON.parse(saved) : INITIAL_FORM;
  });

  useEffect(() => {
    sessionStorage.setItem("pharmacy_reg_form", JSON.stringify(formData));
  }, [formData]);

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

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const { mutate: createPharmacy, isPending } =
    usePostData<AllOwnersResponse>("/pharmacy/create");

  const handleSubmit = () => {
    // 1. أخذ التاريخ المختار من حقل الإدخال (مثلاً "2026-07-23")
    const selectedDate = new Date(formData.subscription.startsAt);

    // 2. جلب الوقت الحالي وإضافة دقيقتين لفرق السيرفر
    const now = new Date();
    selectedDate.setHours(
      now.getHours(),
      now.getMinutes() + 2,
      now.getSeconds(),
      now.getMilliseconds(),
    );

    // 3. توليد صيغة ISO 8601 صحيحة 100%
    const formattedStartDate = selectedDate.toISOString();

    const subscriptionPayload: any = {
      ...formData.subscription,
      startsAt: formattedStartDate, // الاحتفاظ بالحقل وإرساله بالصيغة الصحيحة
    };

    // (تم حذف سطر delete subscriptionPayload.startsAt هنا لكي لا يتم حذفه!)

    if (formData.subscription.offerId && formData.subscription.offerId !== "") {
      subscriptionPayload.offerId = Number(formData.subscription.offerId);
    } else {
      delete subscriptionPayload.offerId;
    }

    if (subscriptionPayload.planId) {
      subscriptionPayload.planId = Number(subscriptionPayload.planId);
    }

    let finalPayload: any = {
      ownerMode: formData.ownerMode,
      pharmacy: { ...formData.pharmacy, openingDate: formattedStartDate },
      subscription: subscriptionPayload,
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

    createPharmacy(finalPayload, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["/pharmacy-owners"] });
        sessionStorage.removeItem("pharmacy_reg_form");
        setFormData(INITIAL_FORM);
        showSnackbar("تم إنشاء الحساب بنجاح", "success");
      },
      onError: (error) => {
        console.log("error: Create Pharmacy", error);
        showSnackbar("حدث خطأ أثناء إنشاء الحساب", "error");
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
            <SubscriptionCard
              planName={formData.subscription.planId}
              startsAt={formData.subscription.startsAt || ""}
              onStartDateChange={(newDate) =>
                setFormData((prev) => ({
                  ...prev,
                  subscription: {
                    ...prev.subscription,
                    startsAt: newDate,
                  },
                }))
              }
            />
          )}

          <CreateAccountButton
            isPending={isPending}
            onSubmit={handleSubmit}
            formData={formData}
            hasdate={!!formData.subscription.startsAt}
            // الزر سيكون مفَعّلاً فقط إذا تم اختيار الخطة وتم تحديد تاريخ البدء
            hasPlan={!!formData.subscription.planId}
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
