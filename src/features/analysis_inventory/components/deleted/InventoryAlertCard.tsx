// import { ErrorOutlineRounded } from "@mui/icons-material";
// import { Box, Button, Stack, Typography } from "@mui/material";
// import type { InventoryAlertItem } from "../../types/analysisInventory.types";
// import AnalysisPanel from "../deleted/AnalysisPanel";

// type InventoryAlertCardProps = {
//   item: InventoryAlertItem;
// };

// const InventoryAlertCard = ({ item }: InventoryAlertCardProps) => {
//   const toneColor = item.tone === "danger" ? "#D6414E" : "#C08B29";

//   return (
//     <AnalysisPanel minHeight={250}>
//       <Stack spacing={1.1}>
//         <Stack
//           direction="row"
//           sx={{ alignItems: "center", justifyContent: "space-between" }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 800, color: "#1C2940" }}>
//             {item.title}
//           </Typography>
//           <ErrorOutlineRounded sx={{ color: toneColor, fontSize: 20 }} />
//         </Stack>

//         <Typography
//           variant="caption"
//           sx={{ color: "#7A8EA6", fontWeight: 600 }}
//         >
//           {item.subtitle}
//         </Typography>

//         <Box sx={{ textAlign: "center", py: 1 }}>
//           <Typography
//             variant="h4"
//             sx={{ color: toneColor, fontWeight: 800, lineHeight: 1.2 }}
//           >
//             {item.value}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#697A93" }}>
//             {item.label}
//           </Typography>
//         </Box>

//         <Stack spacing={0.75}>
//           {item.rows.map((row) => (
//             <Box
//               key={row.id}
//               sx={{
//                 p: 1,
//                 borderRadius: 1.5,
//                 border: "1px solid #E5EFF7",
//                 backgroundColor: "#F8FCFF",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: 1,
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 sx={{ color: toneColor, fontWeight: 700 }}
//               >
//                 {row.note}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ color: "#2E3D56", fontWeight: 700 }}
//               >
//                 {row.name}
//               </Typography>
//             </Box>
//           ))}
//         </Stack>

//         <Button
//           fullWidth
//           variant="outlined"
//           color="error"
//           size="small"
//           sx={{ borderRadius: 1.75, fontWeight: 700 }}
//         >
//           {item.ctaLabel}
//         </Button>
//       </Stack>
//     </AnalysisPanel>
//   );
// };

// export default InventoryAlertCard;
