import { Button, Card, CardContent, Skeleton, Stack } from "@mui/material";

export default function PlanCardSkeleton() {
  return (
    <Card
      sx={{
        borderRadius: 5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {/* Icon + Title */}
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Skeleton variant="circular" width={80} height={80} />

            <Skeleton variant="text" width="60%" height={40} />

            {/* Features */}
            <Stack spacing={1.5} sx={{ width: "100%" }}>
              {[1, 2, 3, 4].map((item) => (
                <Stack
                  key={item}
                  sx={{ direction: "row", alignItems: "center" }}
                  spacing={1.5}
                >
                  <Skeleton variant="circular" width={20} height={20} />

                  <Skeleton variant="text" width="85%" height={25} />
                </Stack>
              ))}
            </Stack>
          </Stack>

          {/* Price Section */}
          <Stack sx={{ alignItems: "center" }} spacing={1}>
            <Skeleton width={120} height={30} />
            <Skeleton width={180} height={50} />
          </Stack>

          {/* Offers */}
          <Stack spacing={1.5}>
            {[1, 2].map((item) => (
              <Skeleton
                key={item}
                variant="rounded"
                width="100%"
                height={80}
                sx={{ borderRadius: 3 }}
              />
            ))}
          </Stack>

          {/* Button */}
          <Skeleton
            variant="rounded"
            width="100%"
            height={48}
            sx={{ borderRadius: 2 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
