// import { Box, Stack, Typography } from "@mui/material";
// import type { DemandColumn } from "../../types/analysisInventory.types";
// import AnalysisPanel from "../deleted/AnalysisPanel";

// type DemandAnalysisSectionProps = {
//   title: string;
//   subtitle: string;
//   columns: DemandColumn[];
// };

// const DemandAnalysisSection = ({
//   title,
//   subtitle,
//   columns,
// }: DemandAnalysisSectionProps) => {
//   return (
//     <AnalysisPanel title={title} subtitle={subtitle}>
//       <Box
//         sx={{
//           mt: 1,
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
//           gap: 2,
//         }}
//       >
//         {columns.map((column) => (
//           <Box
//             key={column.id}
//             sx={{
//               p: 1.5,
//               borderRadius: 2,
//               border: "1px solid #D7E6F4",
//               backgroundColor: "#FFFFFF",
//               boxShadow: "inset 0 0 0 1px #F3F8FC",
//             }}
//           >
//             <Stack spacing={1.2}>
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography
//                   sx={{ fontWeight: 800, color: "#1F2C43", fontSize: 18 }}
//                 >
//                   {column.title}
//                 </Typography>
//                 <Typography sx={{ color: "#7488A3", fontSize: 12, mt: 0.25 }}>
//                   {column.subtitle}
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   p: 1.25,
//                   borderRadius: 1.5,
//                   backgroundColor: "#EAF2FF",
//                   borderInlineStart: "4px solid #25A06B",
//                 }}
//               >
//                 <Typography
//                   sx={{ fontWeight: 800, color: "#2D405D", fontSize: 14 }}
//                 >
//                   {column.highlight}
//                 </Typography>
//                 <Typography sx={{ color: "#5F7AA2", fontSize: 12, mt: 0.35 }}>
//                   {column.confidenceRate}
//                 </Typography>
//               </Box>

//               {column.suggestions.map((suggestion, idx) => (
//                 <Box
//                   key={`${column.id}-${idx}`}
//                   sx={{
//                     px: 1.25,
//                     py: 1,
//                     borderRadius: 1.5,
//                     border: "1px solid #E4ECF5",
//                     backgroundColor: "#FFFFFF",
//                   }}
//                 >
//                   <Typography
//                     sx={{ fontWeight: 700, color: "#2D405D", fontSize: 14 }}
//                   >
//                     {suggestion}
//                   </Typography>
//                   <Typography sx={{ color: "#8798B0", fontSize: 12 }}>
//                     استمرار في الطلب المتوقع
//                   </Typography>
//                 </Box>
//               ))}
//             </Stack>
//           </Box>
//         ))}
//       </Box>
//     </AnalysisPanel>
//   );
// };

// export default DemandAnalysisSection;
