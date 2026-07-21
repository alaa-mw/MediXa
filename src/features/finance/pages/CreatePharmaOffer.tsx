import { useState } from "react";
import type { OfferFormModel } from "../types/offerTypes";
import { Grid } from "@mui/material";
import OfferForm from "../components/privateOffer/offerForm/OfferIndex";
import SubscriptionPlans from "../components/SubscriptionPlans";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import useMakeOffer from "../hooks/useMakeOffer";
import PharmacyAssignment from "../components/privateOffer/AssignOffer/PharmaAssigment";

const CreatePrivateOfferPage = () => {
  const [offer, setOffer] = useState<OfferFormModel>();
  const { showSnackbar } = useSnackbar();
  const [selectedPlanId, setSelectedPlanId] = useState<number>(1);
  const { mutate, isPending, isSuccess, error } = useMakeOffer(selectedPlanId);
  const handleCreateOffer = async (data: OfferFormModel) => {
    setOffer(data);
    const payload = {
      ...data,
    };
    mutate(
      {
        body: data,
      },
      {
        onSuccess: (response) => {
          console.log("payload:", payload);
          console.log("✅ تم إنشاء العرض بنجاح:", response);
          showSnackbar("تم إنشاء العرض بنجاح", "success");
        },
        onError: (err) => {
          console.error("❌ فشل إرسال العرض للباكيند:", err);
          showSnackbar(err.message, "error");
        },
      },
    );

    console.log("البيانات النهائية المرسلة للباكيند:", payload);
    // هنا يمكنك استدعاء دالة الإرسال: await createOffer(payload);
  };

  console.log(selectedPlanId);

  return (
    <Grid container spacing={3} sx={{ direction: "rtl", p: 2 }}>
      {/* باقات الاشتراك - تمرير الـ State والـ Setter كمستقبلات */}
      <Grid>
        <SubscriptionPlans
          selectedPlanId={selectedPlanId}
          onPlanChange={setSelectedPlanId}
        />
      </Grid>

      {/* فورم إنشاء العرض */}
      <Grid sx={{ xs: 12 }}>
        <OfferForm isPending={isPending} onSubmit={handleCreateOffer} />
      </Grid>

      {/* مكون إسناد الصيدليات */}
      <Grid sx={{ xs: 12, mt: 4 }}>
        <PharmacyAssignment />
      </Grid>
    </Grid>
  );
};

export default CreatePrivateOfferPage;
