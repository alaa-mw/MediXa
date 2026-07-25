import { Card, CardContent, Stack, Skeleton, Box } from "@mui/material";

export default function RenewPlanCardSkeleton() {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 5,
        height: "100%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "divider",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {/* قسم الأيقونة والعنوان والمميزات */}
          <Stack spacing={2} sx={{ alignItems: "center", width: "100%" }}>
            {/* أيقونة الخطة */}
            <Skeleton variant="circular" width={56} height={56} />

            {/* عنوان الخطة */}
            <Skeleton variant="text" width="60%" height={32} />

            {/* مميزات الخطة (عدة أسطر وهمية) */}
            <Stack spacing={1.5} sx={{ width: "100%", px: 1, mt: 1 }}>
              {[1, 2, 3].map((_, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center" }}
                >
                  <Skeleton variant="circular" width={16} height={16} />
                  <Skeleton variant="text" width="85%" height={20} />
                </Stack>
              ))}
            </Stack>
          </Stack>

          {/* قسم السعر */}
          <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
            <Skeleton variant="text" width="40%" height={36} />
          </Box>

          {/* مربع العرض المطبق حالياً (اختياري حسب الحاجة) */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={50}
            sx={{ borderRadius: 2 }}
          />

          {/* زر استعراض العروض */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{ borderRadius: 2 }}
          />

          {/* زر تحديد الخطة */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={48}
            sx={{ borderRadius: "10px" }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
