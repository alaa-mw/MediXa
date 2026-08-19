import { Alert, Box, CircularProgress } from "@mui/material";
import { useGetPharmacySubscriptions } from "../../finance/hooks/useGetPharamacySubscription";
import PharmacySubscriptionHeader from "../../finance/components/subscriptionSchedule/PharmacySubscriptionHeader";
import CurrentSubscriptionCard from "../../finance/components/subscriptionSchedule/CurrentSubscriptionCard";
import SubscriptionHistoryTable from "../../finance/components/subscriptionSchedule/SubscriptionHistoryTable";
import OwnerPharmacySubscriptionHeader from "../components/OwnerRenewSubHeader";

const OwnerPharmacySubscriptionSchedule = ({}) => {
  console.log(
    "OwnerPharmacySubscriptionSchedule rendered",
    localStorage.getItem("pharmacyId"),
  );
  // const { storedId }  = localStorage.getItem("pharmacyId") ? { storedId: localStorage.getItem("pharmacyId") } : { storedId: null };
  const queryParams = {
    page: 1,
    limit: 20,
  };

  const { data, isLoading, isError } = useGetPharmacySubscriptions(
    localStorage.getItem("pharmacyId")
      ? parseInt(localStorage.getItem("pharmacyId")!)
      : 0,
    queryParams,
  );

  // 1. معالجة حالة التحميل
  //   if (isLoading) {
  //     return (
  //       <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
  //         <CircularProgress />
  //       </Box>
  //     );
  //   }

  //   // 2. معالجة حالة الخطأ
  //   if (isError || !data?.data) {
  //     return (
  //       <Box sx={{ p: 3 }}>
  //         <Alert severity="error">حدث خطأ أثناء جلب بيانات الاشتراكات.</Alert>
  //       </Box>
  //     );
  //   }

  // 3. استخراج البيانات بأمان باستخدام Optional Chaining (?.)
  //   const responseData = data.data;
  //   const pharmacy = responseData?.pharmacy;
  //   const currentSubscription = responseData?.currentSubscription;
  //   const subscriptions = responseData?.subscriptions ?? [];
  //   const pagination = responseData?.pagination;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3, // مسافة 24px بين الكروت
        direction: "rtl",
        p: 2,
        width: "100%",
      }}
    >
      <OwnerPharmacySubscriptionHeader />
      {/* {pharmacy && <PharmacySubscriptionHeader pharmacy={pharmacy} />}
      {currentSubscription && (
        <CurrentSubscriptionCard subscription={currentSubscription} />
      )} */}

      {/* <SubscriptionHistoryTable
        subscriptions={subscriptions}
        pagination={pagination}
        isLoading={isLoading}
      /> */}
      {/* !isItOwner && (
      <SubscriptionHistoryTable
        subscriptions={subscriptions}
        pagination={pagination}
        isLoading={isLoading}
      />
      )
      <PharmacySubscriptionHeader isItOwner={isItOwner} /> */}
    </Box>
  );
};

export default OwnerPharmacySubscriptionSchedule;
