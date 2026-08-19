import { Box, Chip, Container, Paper, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { useNotifications } from "../hooks/useNotifications";
import NotificationList from "../components/NotificationList";

const NotificationsPage = () => {
  const { data, isLoading, isError, queryParams, setQueryParams } =
    useNotifications(1, 20);

  const notifications = data?.data ?? [];
  const meta = data?.meta ?? {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const page = Number(queryParams.page ?? 1);

  const handlePageChange = (nextPage: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: nextPage,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(25,118,210,0.08), rgba(255,255,255,1))",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                color: "white",
              }}
            >
              <NotificationsActiveOutlinedIcon />
            </Box> */}

            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
              >
                الإشعارات
              </Typography>
              <Typography variant="body2" color="text.secondary">
                آخر التحديثات والطلبات المهمة
              </Typography>
            </Box>
          </Box>

          <Chip
            label={`${meta.total} إشعار`}
            color="primary"
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              px: 1,
            }}
          />
        </Box>

        <NotificationList
          notifications={notifications}
          meta={meta}
          isLoading={isLoading}
          isError={isError}
          page={page}
          onPageChange={handlePageChange}
        />
      </Paper>
    </Container>
  );
};

export default NotificationsPage;
