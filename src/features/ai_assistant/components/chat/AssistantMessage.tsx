import { Card, Skeleton, Stack, Typography } from "@mui/material";
import SourcesAccordion from "./SourcesAccordion";

interface Props {
  message: React.ReactNode;
  time: string;
  sources?: {
    title: string;
    page: number;
  }[];
  isLoading?: boolean;
}

const AssistantMessage = ({ message, sources, isLoading }: Props) => {
  return (
    <Stack
      direction="row"
      sx={{
        direction: "rtl",
        spacing: 2,
        alignItems: "flex-start",
        mb: 4,
        width: "100%",
      }}
    >
      <Card
        elevation={0}
        sx={{
          flex: 1,
          p: 3,
          bgcolor: "transparent",
        }}
      >
        {isLoading ? (
          // شكل الـ Shimmer أثناء التفكير
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="90%" />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="60%" />
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ borderRadius: 2, mt: 1 }}
            />
          </Stack>
        ) : (
          // الشكل الطبيعي للرسالة عند جهوزيتها
          <>
            <Typography component="div" sx={{ lineHeight: 2 }}>
              {message}
            </Typography>
            {sources && <SourcesAccordion sources={sources} />}
          </>
        )}
      </Card>
    </Stack>
  );
};

export default AssistantMessage;
