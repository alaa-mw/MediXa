// import { Box, Divider, Stack, Typography } from "@mui/material";
// import type { PerformanceListItem } from "../../types/analysisInventory.types";
// import AnalysisPanel from "./AnalysisPanel";

// type ProductPerformanceCardProps = {
//   title: string;
//   bestSelling: PerformanceListItem[];
//   lowSelling: PerformanceListItem[];
// };

// const ProductPerformanceCard = ({
//   title,
//   bestSelling,
//   lowSelling,
// }: ProductPerformanceCardProps) => {
//   return (
//     <AnalysisPanel title={title}>
//       <Stack spacing={1.25}>
//         <Box>
//           <Typography sx={{ fontWeight: 800, color: "#259468", fontSize: 13 }}>
//             الأكثر مبيعاً
//           </Typography>
//           <Stack spacing={0.85} sx={{ mt: 0.8 }}>
//             {bestSelling.map((item) => (
//               <Box
//                 key={item.id}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   gap: 1,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     px: 1,
//                     py: 0.4,
//                     borderRadius: 1,
//                     backgroundColor: "#EAF2FF",
//                     color: "#4B6FA3",
//                     fontSize: 12,
//                     fontWeight: 700,
//                   }}
//                 >
//                   {item.count} عبوة
//                 </Box>
//                 <Typography
//                   variant="body2"
//                   sx={{ fontWeight: 700, color: "#2D3A53" }}
//                 >
//                   {item.medicineName}
//                 </Typography>
//               </Box>
//             ))}
//           </Stack>
//         </Box>

//         <Divider />

//         <Box>
//           <Typography sx={{ fontWeight: 800, color: "#CC4A54", fontSize: 13 }}>
//             الأقل مبيعاً
//           </Typography>
//           <Stack spacing={0.85} sx={{ mt: 0.8 }}>
//             {lowSelling.map((item) => (
//               <Box
//                 key={item.id}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   gap: 1,
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   sx={{ color: "#CC4A54", fontWeight: 700 }}
//                 >
//                   {item.count} مبيعات خلال 30 يوم
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ fontWeight: 700, color: "#2D3A53" }}
//                 >
//                   {item.medicineName}
//                 </Typography>
//               </Box>
//             ))}
//           </Stack>
//         </Box>
//       </Stack>
//     </AnalysisPanel>
//   );
// };

// export default ProductPerformanceCard;
