// // src/components/SmartAssistant/index.tsx
// import React, { useState } from "react";
// import { Box, Grid, Paper } from "@mui/material";
// import type { ChatSession, KnowledgeStats, Message } from "./types/chat.types";
// import { KnowledgePanel } from "./components/Aiassistant/KnowledgePanel";
// import { ChatArea } from "./components/Aiassistant/ChatArea";

import AssistantLayout from "./PharmacyAssistantLayout";

// export const AIAssistantPage: React.FC = () => {
//   const [stats] = useState<KnowledgeStats>({
//     indexedDocuments: 12458,
//     lastUpdated: "27 Jul 2026 - 03:45 AM",
//   });

//   const [sessions] = useState<ChatSession[]>([
//     { id: "1", title: "ما هي جرعة دواء Cetamol؟", date: "10:15 AM" },
//     { id: "2", title: "تداخل دوائي بين أدوية الضغط", date: "Yesterday" },
//     { id: "3", title: "آلية عمل دواء Azithromycin", date: "25 Jul 2026" },
//   ]);

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "m1",
//       sender: "user",
//       text: "ما هي جرعة دواء Azithromycin 500mg للبالغين؟",
//       timestamp: "04:16 AM",
//     },
//     {
//       id: "m2",
//       sender: "bot",
//       text: `جرعة Azithromycin 500mg للبالغين تكون:
//       • اليوم الأول: 500mg مرة واحدة يومياً.
//       • من اليوم الثاني إلى الخامس: 250mg مرة واحدة يومياً.

//       تؤخذ قبل الأكل بساعة أو بعده بساعتين.`,
//       timestamp: "04:16 AM",
//       sources: [
//         { id: 1, title: "BNF 83 - Antibiotics: Macrolides", page: 452 },
//         { id: 2, title: "Drug Interactions - Macrolides", page: 1198 },
//       ],
//     },
//   ]);

//   const handleSendMessage = (text: string) => {
//     const newUserMessage: Message = {
//       id: Date.now().toString(),
//       sender: "user",
//       text,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setMessages((prev) => [...prev, newUserMessage]);

//     setTimeout(() => {
//       const newBotMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         sender: "bot",
//         text: "تم استلام طلبك وسيقوم النظام بتحليل قاعدة البيانات للإجابة بدقة...",
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setMessages((prev) => [...prev, newBotMessage]);
//     }, 1000);
//   };

//   const handleNewSession = () => {
//     setMessages([]);
//   };

//   const handleSelectSession = (sessionId: string) => {
//     console.log("Selected Session ID:", sessionId);
//   };

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         p: 2,
//         height: "100%",
//         boxSizing: "border-box",
//         direction: "rtl",
//       }}
//     >
//       <Grid container spacing={3} sx={{ height: "100%" }}>
//         {/* لوحة المعرفة اليسرى - بدون كلمة item */}
//         <Grid xs={12} md={3} sx={{ height: "100%" }}>
//           <Paper
//             elevation={1}
//             sx={{
//               p: 2,
//               height: "100%",
//               borderRadius: 3,
//               bgcolor: "#fff",
//               overflowY: "auto",
//             }}
//           >
//             <KnowledgePanel
//               stats={stats}
//               sessions={sessions}
//               onNewSession={handleNewSession}
//               onSelectSession={handleSelectSession}
//             />
//           </Paper>
//         </Grid>

//         {/* منطقة المحادثة اليمنى - بدون كلمة item */}
//         <Grid xs={12} md={9} sx={{ height: "100%" }}>
//           <Paper
//             elevation={1}
//             sx={{
//               p: 3,
//               height: "100%",
//               borderRadius: 3,
//               bgcolor: "#fff",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden",
//             }}
//           >
//             <ChatArea messages={messages} onSendMessage={handleSendMessage} />
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

const AssistantPage = () => {
  return <AssistantLayout />;
};

export default AssistantPage;
