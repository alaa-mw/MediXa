import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CheckCircleOutlined,
  Inventory2Outlined,
  LocalOfferOutlined,
  RefreshRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  useApplyLatestPriceList,
  useGeneralDrugPriceListStatus,
  useLatestPriceListChanges,
} from "../hooks/useGeneralDrugPriceList";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

const PriceListPage = () => {
  const { showSnackbar } = useSnackbar();

  const {
    data: statusData,
    isLoading: isStatusLoading,
    isError: isStatusError,
    error: statusError,
    refetch: refetchStatus,
  } = useGeneralDrugPriceListStatus();

  const hasNewPriceList = Boolean(statusData?.data?.hasNewPriceList);

  const {
    data: changesData,
    isLoading: isChangesLoading,
    isError: isChangesError,
    refetch: refetchChanges,
  } = useLatestPriceListChanges(hasNewPriceList);

  const changeList = changesData?.data?.items?.length === 0 ? false : true;

  const { mutate: applyPriceList, isPending: isApplying } =
    useApplyLatestPriceList();

  const latestStatus = statusData?.data;
  const changes = changesData?.data?.items ?? [];

  const handleApply = () => {
    applyPriceList(undefined, {
      onSuccess: () => {
        showSnackbar("تم تطبيق نشرة الأسعار بنجاح", "success");
        refetchStatus();
        refetchChanges();
      },
      onError: (error) => {
        showSnackbar(error.message || "فشل تطبيق نشرة الأسعار", "error");
      },
    });
  };

  const formatDate = (value?: string | null) => {
    if (!value) return "-";

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;

    return format(parsed, "dd MMM yyyy - HH:mm", { locale: ar });
  };

  const summaryCards = [
    {
      title: "آخر قائمة منشورة",
      value: latestStatus?.latestPriceList
        ? `الإصدار ${latestStatus.latestPriceList.version}`
        : "-",
      subText: latestStatus?.latestPriceList?.publishedAt
        ? formatDate(latestStatus.latestPriceList.publishedAt)
        : "لا توجد بيانات",
      icon: <LocalOfferOutlined fontSize="small" />,
      accent: "#0EA5E9",
    },
    {
      title: "آخر تطبيق على الصيدلية",
      value: latestStatus?.lastAppliedPriceList
        ? `الإصدار ${latestStatus.lastAppliedPriceList.version}`
        : "-",
      subText: latestStatus?.lastAppliedPriceList?.publishedAt
        ? formatDate(latestStatus.lastAppliedPriceList.publishedAt)
        : "لم يتم التطبيق بعد",
      icon: <RefreshRounded fontSize="small" />,
      accent: "#8B5CF6",
    },
    {
      title: "الأدوية المتأثرة",
      value: `${latestStatus?.affectedDrugsCount ?? 0}`,
      subText: "دواء مستهدف للتحديث",
      icon: <Inventory2Outlined fontSize="small" />,
      accent: "#10B981",
    },
  ];

  if (isStatusLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isStatusError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {statusError?.message || "حدث خطأ أثناء تحميل حالة نشرة الأسعار"}
        </Alert>
      </Box>
    );
  }

  if (!latestStatus) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">لا توجد بيانات متاحة في الوقت الحالي.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ direction: "rtl", pb: 4 }}>
      <Stack spacing={3}>
        <Paper
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            background: "#3a6a6c",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 16px 32px rgba(15, 118, 110, 0.18)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top left, rgba(255,255,255,0.28), transparent 42%)",
            }}
          />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              position: "relative",
              zIndex: 1,
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
            }}
          >
            <Box>
              {/* <Chip
                label={hasNewPriceList ? "تحديث جديد" : "محدث"}
                size="small"
                sx={{
                  mb: 1.5,
                  backgroundColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              /> */}
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                نشرة الأسعار
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.9, maxWidth: 520 }}>
                متابعة آخر قائمة أسعار منشورة وتطبيق التحديثات على الصيدلية في
                لحظة واحدة.
              </Typography>
            </Box>

            {hasNewPriceList && changeList ? (
              <Button
                variant="contained"
                onClick={handleApply}
                disabled={isApplying}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#0f766e",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 800,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#ecfeff" },
                }}
              >
                {isApplying ? "جارٍ التطبيق..." : "تطبيق التحديث"}
              </Button>
            ) : (
              <Chip
                label="لا يوجد تحديث جديد"
                color="default"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              />
            )}
          </Stack>
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2, // استخدام gap يضمن مسافات متساوية في الـ RTL
          }}
        >
          {summaryCards.map((card) => (
            <Paper
              key={card.title}
              sx={{
                flex: 1,
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mb: 2, alignItems: "center" }}
              >
                {/* <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `${card.accent}20`,
                    color: card.accent,
                  }}
                >
                  {card.icon}
                </Box> */}
                <Typography variant="subtitle2" color="text.secondary">
                  {card.title} :
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0F172A", pr: 1 }}
                >
                  {card.value}
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ mt: 0.55, color: "grey" }}>
                {card.subText}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #E2E8F0",
            background: "#fff",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {hasNewPriceList
                  ? "حالة قائمة الأسعار الحالية"
                  : "لا توجد قائمة أسعار جديدة"}
              </Typography>
              {/* <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {hasNewPriceList
                  ? "تمتلك الصيدلية تحديثات جديدة تحتاج إلى التطبيق قبل ظهورها في البيع."
                  : "جميع التحديثات الحالية موجودة بالفعل على الصيدلية."}
              </Typography> */}
            </Box>

            {/* <Chip
              icon={
                hasNewPriceList ? (
                  <TrendingUpRounded />
                ) : (
                  <CheckCircleOutlined />
                )
              }
          //    label={hasNewPriceList ? "تحديث جديد" : "النسخة الحالية محدثة"}
              color={hasNewPriceList ? "warning" : "success"}
              sx={{ fontWeight: 700 }}
            /> */}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {hasNewPriceList && (
            <>
              {isChangesLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                  <CircularProgress size={28} />
                </Box>
              ) : isChangesError ? (
                <Alert severity="error">
                  فشل تحميل تفاصيل التعديلات الجديدة.
                </Alert>
              ) : changes.length === 0 ? (
                <Alert severity="info">
                  لا توجد تغييرات جديدة في هذه القائمة.
                </Alert>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          اسم الدواء
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          السعر الحالي
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          السعر الجديد
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          السعر الحالي للمستهلك
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700 }}>
                          السعر الجديد للمستهلك
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {changes.map((item) => (
                        <TableRow
                          key={`${item.generalDrugId}-${item.pharmacyDrugId}`}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#F8FAFC",
                            },
                          }}
                        >
                          <TableCell
                            align="right"
                            sx={{
                              fontWeight: 700,
                              color: "#0F172A",
                              justifyItems: "center",
                            }}
                          >
                            {item.tradeName}
                          </TableCell>
                          <TableCell align="center">
                            {item.netPriceChanged ? item.currentNetPrice : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {item.netPriceChanged ? item.newNetPrice : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {item.consumerPriceChanged
                              ? item.currentConsumerPrice
                              : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {item.consumerPriceChanged
                              ? item.newConsumerPrice
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}

          {!hasNewPriceList && (
            <Box
              sx={{
                borderRadius: 2,
                p: 3,
                background: "linear-gradient(180deg, #f8fafc 0%, #f0fdf4 100%)",
                border: "1px solid #dcfce7",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#166534" }}
              >
                لا توجد قائمة أسعار جديدة
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                آخر إصدار متاح هو{" "}
                {latestStatus.latestPriceList
                  ? `الإصدار ${latestStatus.latestPriceList.version}`
                  : "-"}
                ، وقد تم تطبيق جميع التحديثات الحالية على الصيدلية.
              </Typography>
            </Box>
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default PriceListPage;
