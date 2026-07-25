// import { Box, Chip, Typography } from "@mui/material";
// import React from "react";
// import type { PharmacySubscription } from "../../types/subscriptionDetailes";
// import { AccessTime } from "@mui/icons-material";

// interface Props {
//   subscriptions: PharmacySubscription;
//   itemIndex: number;
// }

// const PharamSubsTableRow = ({ subscriptions, itemIndex }: Props) => {
//   const renderStatusChip = (status: PharmacySubscription["status"]) => {
//     switch (status) {
//       case "ACTIVE":
//         return (
//           <Chip
//             label="نشط"
//             size="small"
//             sx={{
//               bgcolor: "#E6F4EA",
//               color: "#137333",
//               fontWeight: 600,
//               fontSize: "12px",
//               px: 1,
//               height: "28px",
//               "& .MuiChip-label": {
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 "&::before": {
//                   content: '""',
//                   width: "7px",
//                   height: "7px",
//                   borderRadius: "50%",
//                   backgroundColor: "#137333",
//                 },
//               },
//             }}
//           />
//         );
//       case "SCHEDULED":
//         return (
//           <Chip
//             icon={
//               <AccessTime
//                 sx={{ fontSize: "15px !important", color: "#B06000" }}
//               />
//             }
//             label="مجدول"
//             size="small"
//             sx={{
//               bgcolor: "#FEF7E0",
//               color: "#B06000",
//               fontWeight: 600,
//               fontSize: "12px",
//               px: 0.5,
//               height: "28px",
//             }}
//           />
//         );
//       default:
//         return (
//           <Chip
//             label="منتهي"
//             size="small"
//             sx={{
//               bgcolor: "#FCE8E6",
//               color: "#C5221F",
//               fontWeight: 600,
//               fontSize: "12px",
//               px: 1,
//               height: "28px",
//             }}
//           />
//         );
//     }
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "-";
//     return dateString.split("T")[0].replace(/-/g, "/");
//   };

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "3fr 2.5fr 3fr 2fr 2.5fr 1.5fr 1.5fr 1fr",
//         p: 1.2,
//         borderBottom: "1px solid #F1F5F9",
//         alignItems: "center",
//         direction: "rtl",
//       }}
//     >
//       {/* اسم الدواء */}
//       <Box
//         sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
//       >
//         {itemIndex + 1}
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-start",
//           fontWeight: 400,
//           fontSize: 14,
//           pl: 5,
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 600,
//             fontSize: "14px",
//             color: "#1E293B",
//           }}
//         >
//           {subscriptions.plan.name}
//         </Typography>
//         <Chip
//           label={subscriptions.plan.code}
//           size="small"
//           sx={{
//             bgcolor: "#E6F4EA",
//             color: "#137333",
//             fontSize: "11px",
//             fontWeight: 600,
//             height: "20px",
//           }}
//         />
//       </Box>
//       <Box
//         sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
//       >
//         {subscriptions.plan.durationMonths} شهر
//       </Box>

//       {/* حالة الاشتراك  */}
//       <Box sx={{ textAlign: "center", color: "#64748B", fontSize: 13 }}>
//         {/* <Box
//           sx={{
//             display: "inline-block",
//             px: 1.5,
//             py: 0.5,
//             borderRadius: "4px",
//             backgroundColor: "#ebebeb",
//             color: "primary.main",
//           }}
//         >
//           {item.unitType}
//         </Box> */}
//         {renderStatusChip(subscriptions.status)}
//       </Box>

//       {/* المدة */}
//       <Box sx={{ textAlign: "center", fontWeight: 600 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             gap: 0.3,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: "13px",
//               fontWeight: 600,
//               color: "#334155",
//             }}
//           >
//             {formatDate(subscriptions.startsAt)}
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: "13px",
//               fontWeight: 600,
//               color: "#334155",
//             }}
//           >
//             {formatDate(subscriptions.endsAt)}
//           </Typography>
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.8,
//           fontWeight: 700,
//           color: "#0F172A",
//         }}
//       >
//         {subscriptions.basePrice} ل.س
//       </Box>

//       {/* العرض المطبق  */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.8,
//           fontWeight: 700,
//           color: "#0F172A",
//         }}
//       >
//         {subscriptions.appliedOffer ? (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 0.5,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 color: "#1E293B",
//               }}
//             >
//               {subscriptions.appliedOffer.title}
//             </Typography>
//             <Chip
//               label={subscriptions.appliedOffer.code}
//               size="small"
//               sx={{
//                 bgcolor: "#E6F4EA",
//                 color: "#137333",
//                 fontSize: "11px",
//                 fontWeight: 600,
//                 height: "20px",
//               }}
//             />
//             <Typography
//               sx={{
//                 fontSize: "12px",
//                 color: "#137333",
//                 fontWeight: 600,
//               }}
//             >
//               خصم {subscriptions.appliedOffer.discountValue}%
//             </Typography>
//           </Box>
//         ) : (
//           <Typography sx={{ fontSize: "14px", color: "#64748B" }}>-</Typography>
//         )}
//       </Box>

//       <Box sx={{ textAlign: "center", color: "#334155" }}>
//         {subscriptions.appliedOffer?.discountValue}%
//       </Box>

//       {/* السعر الإجمالي للمادة */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.5,
//           fontWeight: 700,
//           color: "#0F172A",
//         }}
//       >
//         <Typography
//           variant="body2"
//           sx={{ fontSize: 15, fontWeight: "500", color: "text.primary" }}
//         >
//           item.totalPrice
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
//         >
//           ل.س
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.8,
//           fontWeight: 700,
//           color: "#0F172A",
//         }}
//       >
//         {subscriptions.finalPrice} ل.س
//       </Box>
//     </Box>
//   );
// };

// export default PharamSubsTableRow;
import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import type { PharmacySubscription } from "../../types/subscriptionDetailes";
import { AccessTime } from "@mui/icons-material";
import { GRID_COLUMNS } from "./PharamSubsTableHeader";

interface Props {
  subscriptions: PharmacySubscription;
  itemIndex: number;
}

const PharamSubsTableRow = ({ subscriptions, itemIndex }: Props) => {
  const renderStatusChip = (status: PharmacySubscription["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Chip
            label="نشط"
            size="small"
            sx={{
              bgcolor: "#E6F4EA",
              color: "#137333",
              fontWeight: 600,
              fontSize: "12px",
              px: 1,
              height: "28px",
              "& .MuiChip-label": {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                "&::before": {
                  content: '""',
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#137333",
                },
              },
            }}
          />
        );
      case "SCHEDULED":
        return (
          <Chip
            icon={
              <AccessTime
                sx={{ fontSize: "15px !important", color: "#B06000" }}
              />
            }
            label="مجدول"
            size="small"
            sx={{
              bgcolor: "#FEF7E0",
              color: "#B06000",
              fontWeight: 600,
              fontSize: "12px",
              px: 0.5,
              height: "28px",
            }}
          />
        );
      default:
        return (
          <Chip
            label="منتهي"
            size="small"
            sx={{
              bgcolor: "#FCE8E6",
              color: "#C5221F",
              fontWeight: 600,
              fontSize: "12px",
              px: 1,
              height: "28px",
            }}
          />
        );
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return dateString.split("T")[0].replace(/-/g, "/");
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: GRID_COLUMNS,
        p: 1.5,
        borderBottom: "1px solid #F1F5F9",
        alignItems: "center",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      {/* 2. الرقم التسلسلي # */}
      <Box sx={{ fontWeight: 600, color: "#334155" }}>{itemIndex + 1}</Box>

      {/* 3. خطة الاشتراك */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{ fontWeight: 700, fontSize: "15px", color: "#1E293B" }}
        >
          {subscriptions.plan.name}
        </Typography>
        {/* <Chip
          label={subscriptions.plan.code}
          size="small"
          sx={{
            bgcolor: "#E6F4EA",
            color: "#137333",
            fontSize: "11px",
            fontWeight: 600,
            height: "20px",
          }}
        /> */}
      </Box>

      {/* 4. المدة */}
      <Box sx={{ fontWeight: 500, fontSize: "15px", color: "#334155" }}>
        {subscriptions.plan.durationMonths} شهر
      </Box>

      {/* 5. حالة الاشتراك */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {renderStatusChip(subscriptions.status)}
      </Box>

      {/* 6. فترة الاشتراك (البداية والنهاية) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {/* صف البداية والتاريخ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: 600, color: "#64748B" }}
          >
            البداية :
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: 600, color: "#334155" }}
          >
            {formatDate(subscriptions.startsAt)}
          </Typography>
        </Box>

        {/* صف النهاية والتاريخ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: 600, color: "#64748B" }}
          >
            النهاية :
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: 600, color: "#334155" }}
          >
            {formatDate(subscriptions.endsAt)}
          </Typography>
        </Box>
      </Box>

      {/* 7. التكلفة الأساسية */}
      <Box sx={{ fontWeight: 700, color: "#0F172A", fontSize: "14px" }}>
        {subscriptions.basePrice}{" "}
        <Typography
          component="span"
          sx={{ fontSize: "11px", color: "#64748B" }}
        >
          ل.س
        </Typography>
      </Box>

      {/* 8. العرض المطبق */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {subscriptions.appliedOffer ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.3,
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: 600, color: "#1E293B" }}
            >
              {subscriptions.appliedOffer.title}
            </Typography>
            <Chip
              label={subscriptions.appliedOffer.code}
              size="small"
              sx={{
                bgcolor: "#E6F4EA",
                color: "#137333",
                fontSize: "10px",
                fontWeight: 600,
                height: "18px",
              }}
            />
          </Box>
        ) : (
          <Typography sx={{ fontSize: "14px", color: "#64748B" }}>-</Typography>
        )}
      </Box>

      {/* 9. التكلفة النهائية */}
      <Box sx={{ fontWeight: 700, color: "#0F172A", fontSize: "15px" }}>
        {subscriptions.finalPrice}{" "}
        <Typography
          component="span"
          sx={{ fontSize: "11px", color: "#64748B" }}
        >
          ل.س
        </Typography>
        {subscriptions.appliedOffer && (
          <Typography
            sx={{ fontSize: "11px", color: "#137333", fontWeight: 600 }}
          >
            خصم {subscriptions.appliedOffer.discountValue}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PharamSubsTableRow;
