import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { inventoryHighlights, inventoryRows } from "../constants/inventory";
import { sectionTitleSx } from "../constants/sectionStyles";

const InventoryPosSection = () => {
  return (
    <Box sx={{ bgcolor: "#FFFFFF", py: 10 }}>
      <Container>
        <Stack spacing={1} sx={{ alignItems: "center", mb: 5 }}>
          <Chip label="المخزون ونقطة البيع" />
          <Typography
            variant="h2"
            sx={{
              ...sectionTitleSx,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
            }}
          >
            تحكم كامل في المخزون والمبيعات
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", maxWidth: 760 }}
          >
            أدوات POS ذكية تربط المخزون بالمبيعات تلقائياً لضمان الدقة في كل
            عملية.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 1fr" },
            gap: 3,
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                {inventoryHighlights.map((line) => (
                  <Stack
                    key={line}
                    direction="row"
                    spacing={1.2}
                    sx={{ alignItems: "center" }}
                  >
                    <CheckCircleIcon color="primary" fontSize="small" />
                    <Typography variant="body2">{line}</Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
                سجل المخزون
              </Typography>
              <Box
                sx={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1.3fr 1.1fr",
                    p: 1.2,
                    bgcolor: "#F8FAFC",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  <Box>الدواء</Box>
                  <Box>الكمية</Box>
                  <Box>تاريخ الانتهاء</Box>
                  <Box>الحالة</Box>
                </Box>
                {inventoryRows.map((row) => (
                  <Box
                    key={row[0]}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1.3fr 1.1fr",
                      p: 1.2,
                      borderTop: "1px solid #E2E8F0",
                      fontSize: 13,
                    }}
                  >
                    <Box>{row[0]}</Box>
                    <Box>{row[1]}</Box>
                    <Box>{row[2]}</Box>
                    <Box>{row[3]}</Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default InventoryPosSection;
