// import React from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";

// interface RenewHeaderProps {
//   selectedPlanName?: string;
//   isSubmitting: boolean;
//   onConfirm: () => void;
// }

// export const RenewHeader: React.FC<RenewHeaderProps> = ({
//   selectedPlanName,
//   isSubmitting,
//   onConfirm,
// }) => {
//   if (!selectedPlanName) return null;

//   return (
//     <Box
//       sx={{
//         position: "sticky",
//         top: 0,
//         zIndex: 1100,
//         bgcolor: "background.paper",
//         boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
//         py: 2,
//         mb: 3,
//         borderBottom: "1px solid",
//         borderColor: "divider",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justify: "space-between",
//             direction: "rtl",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: 700, color: "text.primary" }}
//           >
//             الخطة المختارة:{" "}
//             <Typography
//               component="span"
//               variant="h6"
//               sx={{ fontWeight: 800, color: "primary.main" }}
//             >
//               {selectedPlanName}
//             </Typography>
//           </Typography>

//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             onClick={onConfirm}
//             disabled={isSubmitting}
//             startIcon={
//               isSubmitting ? (
//                 <CircularProgress size={20} color="inherit" />
//               ) : (
//                 <CheckIcon />
//               )
//             }
//             sx={{
//               borderRadius: "10px",
//               px: 4,
//               py: 1,
//               fontWeight: 700,
//               fontSize: "16px",
//             }}
//           >
//             {isSubmitting ? "جاري التجديد..." : "تأكيد تجديد الاشتراك"}
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };
