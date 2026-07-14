import React, { useState } from "react";
import {
  Button,
  Popover,
  Typography,
  Box,
  Divider,
  Stack,
  Grow,
} from "@mui/material";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";

interface InvoiceRowProps {
  item: SaleInvoiceItem;
}

const BatchAllocationButton: React.FC<InvoiceRowProps> = ({ item }) => {
  // استخدام anchorEl للتحكم بمكان ظهور الـ Popover بجانب الزر تماماً
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "batch-popover" : undefined;

  // تنسيق التاريخ
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
      {/* زر "تفاصيل" */}
      <Button
        aria-describedby={id}
        variant="text"
        size="small"
        color="secondary"
        startIcon={<InfoIcon />}
        onClick={handleOpen}
        sx={{
          flexDirection: "row-reverse",
          gap: 1,
          fontWeight: 600,
          fontFamily: "inherit",
          "& .MuiButton-startIcon": { mx: 0, ml: 1 },
        }}
      >
        تفاصيل
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // 💡 قمنا بحذف الـ TransitionProps من هنا نهائياً لتجنب خطأ التايب سكريبت
        slotProps={{
          paper: {
            sx: {
              width: "280px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid #E2E8F0",
              p: 2,
              direction: "rtl",
              // إذا كنت ترغب بالتحكم في سرعة تأثير الظهور (الأنيميشن) بدون مشاكل types:
              transition: "all 0.3s ease-in-out",
            },
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
        >
          تفاصيل الدفعة
        </Typography>
        <Divider sx={{ mb: 1.5 }} />

        {item.batchAllocations && item.batchAllocations.length > 0 ? (
          <Stack spacing={2}>
            {item.batchAllocations.map((alloc, index) => (
              <Box
                key={alloc.saleInvoiceItemBatchId}
                sx={{
                  pb: index !== item.batchAllocations!.length - 1 ? 1.5 : 0,
                  borderBottom:
                    index !== item.batchAllocations!.length - 1
                      ? "1px dashed #E2E8F0"
                      : "none",
                }}
              >
                {/* عرض البيانات بشكل طولي تتابعي */}
                <Stack spacing={0.8}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      رقم الدفعة:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      #{alloc.batch.batchId}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      الكميات المباعة:
                    </Typography>
                    <Typography variant="body2">
                      {alloc.batch.soldQuantity}/
                      {alloc.batch.initialQuantity}{" "}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      تاريخ ادخال الدفعة:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "black", fontWeight: 600 }}
                    >
                      {formatDate(alloc.batch.receivedDate)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      تاريخ انتهاء الصلاحية:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "red", fontWeight: 600 }}
                    >
                      {formatDate(alloc.batch.expiryDate)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  ></Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pt: 0.5,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      الحالة:
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        px: 1,
                        py: 0.2,
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                        backgroundColor:
                          alloc.batch.status === "ACTIVE"
                            ? "#E6F4EA"
                            : "#FCE8E6",
                        color:
                          alloc.batch.status === "ACTIVE"
                            ? "#137333"
                            : "#C5221F",
                      }}
                    >
                      {alloc.batch.status === "ACTIVE"
                        ? "نشط"
                        : alloc.batch.status}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 1 }}
          >
            لا توجد معلومات تشغيلة.
          </Typography>
        )}
      </Popover>
    </Box>
  );
};

export default BatchAllocationButton;
