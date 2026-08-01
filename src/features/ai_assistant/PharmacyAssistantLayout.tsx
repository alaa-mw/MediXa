import { Box, Stack } from "@mui/material";
import SessionsCard from "./components/sidebar/SessionsCard";
import KnowledgeCard from "./components/sidebar/KnowledgeCard";
import ChatContainer from "./components/chat/ChatContainer";
import AssistantHeader from "./components/header/AssistantHeader";
import ChatInput from "./components/input/ChatInput";
import { useState } from "react";

export interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  message: React.ReactNode;
  time: string;
  sources?: { title: string; page: number }[];
  isLoading?: boolean;
}

const AssistantLayout = () => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "1",
      sender: "user",
      message: "ما هي جرعة Azithromycin 500mg للبالغين؟",
      time: "04:16 AM",
    },
    {
      id: "2",
      sender: "assistant",
      message: (
        <>
          <p>
            جرعة <b>Azithromycin 500mg</b> للبالغين تكون:
          </p>
          <ul>
            <li>
              اليوم الأول: <b>500mg</b> مرة واحدة.
            </li>
            <li>
              من اليوم الثاني إلى الخامس: <b>250mg</b> مرة واحدة يومياً.
            </li>
          </ul>
          <p>تؤخذ قبل الطعام بساعة أو بعده بساعتين.</p>
        </>
      ),
      time: "04:16 AM",
      sources: [
        { title: "BNF 83 - Antibiotics: Macrolides", page: 452 },
        { title: "Drug Interactions - Macrolides", page: 1198 },
      ],
    },
  ]);

  // لوجيك إرسال الرسالة والمحاكاة
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 1. إضافة رسالة المستخدم فوراً
    const newUserMsg: MessageItem = {
      id: Date.now().toString(),
      sender: "user",
      message: text,
      time: currentTime,
    };

    // 2. إضافة رسالة مؤقتة تحمل حالة الـ Shimmer (تحميل) للبوت
    const loadingMsgId = (Date.now() + 1).toString();
    const loadingMsg: MessageItem = {
      id: loadingMsgId,
      sender: "assistant",
      message: "",
      time: currentTime,
      isLoading: true, // 👈 التفعيل هنا
    };

    setMessages((prev) => [...prev, newUserMsg, loadingMsg]);

    // 3. محاكاة الانتظار (Simulation) لمدة ثانيتين ثم جلب الجواب الحقيقي
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMsgId
            ? {
                ...msg,
                isLoading: false, // إيقاف التحميل
                message: (
                  <p>
                    هذا رد تجريبي محاكى لسؤالك حول: <b>{text}</b>. يرجى مراجعة
                    المصادر الطبية المرفقة دائماً.
                  </p>
                ),
                sources: [{ title: "BNF 83 - General Guidelines", page: 12 }],
              }
            : msg,
        ),
      );
    }, 2000);
  };

  const handleNewSession = () => {
    setMessages([]);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Stack
        direction="row"
        sx={{ height: "100%", width: "100%", direction: "ltr" }}
      >
        {/* 1. السايدبار في أقصى اليسار */}
        <Box
          sx={{
            width: 300,
            height: "100%",
            bgcolor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
            direction: "rtl",
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* هذا الجزء سيظل ثابتاً ولا يتحرك أبداً */}
          <Box sx={{ flexShrink: 0 }}>
            <KnowledgeCard />
          </Box>

          <Box
            sx={{
              mt: 3,
              flexGrow: 1,
              overflowY: "auto",
              pr: 1,
            }}
          >
            <SessionsCard onNewSession={handleNewSession} />
          </Box>
        </Box>
        <Stack direction="column">
          <AssistantHeader />
          <Box
            sx={{
              m: 1,
              height: "100%",
              width: 960,
              overflowY: "auto",
            }}
          >
            <ChatContainer messages={messages} />
          </Box>
          <ChatInput onSend={handleSendMessage} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AssistantLayout;
