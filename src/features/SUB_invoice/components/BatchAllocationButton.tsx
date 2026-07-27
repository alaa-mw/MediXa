import React, { useState } from "react";
import {
  Button,
  Popover,
  Typography,
  Box,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import useGetData from "../../../shared/hooks/useGetData";
import type { SaleInvoiceBatchesResponse } from "../Types/saleInvoiceItemBatches";

interface BatchAllocationButtonProps {
  invoiceId: number;
  saleInvoiceItemId: number;
}

const BatchAllocationButton: React.FC<BatchAllocationButtonProps> = ({
  invoiceId,
  saleInvoiceItemId,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    data: response,
    isLoading,
    error,
  } = useGetData<SaleInvoiceBatchesResponse>(
    `/sale-invoice/${invoiceId}/batches`,
  );

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "batch-popover" : undefined;

  // 2. تصفية العناصر واستخراج الدفعات الخاصة بـ item المحدد فقط
  const invoiceData = response?.data;
  const currentItem = invoiceData?.items?.find(
    (item) => item.saleInvoiceItemId === saleInvoiceItemId,
  );
  const batchAllocations = currentItem?.batches || [];

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
        تفاصيل الدفعة
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
        slotProps={{
          paper: {
            sx: {
              width: "280px",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid #E2E8F0",
              p: 2,
              direction: "rtl",
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

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center", py: 1 }}
          >
            حدث خطأ أثناء تحميل الدفعات.
          </Typography>
        ) : batchAllocations.length > 0 ? (
          <Stack spacing={2}>
            {batchAllocations.map((alloc, index) => (
              <Box
                key={alloc.saleInvoiceItemBatchId}
                sx={{
                  pb: index !== batchAllocations.length - 1 ? 1.5 : 0,
                  borderBottom:
                    index !== batchAllocations.length - 1
                      ? "1px dashed #E2E8F0"
                      : "none",
                }}
              >
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
                      {alloc.soldDisplayQuantity} ({alloc.soldBaseQuantity}{" "}
                      وحدة)
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      تاريخ الاستلام:
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
                      تاريخ الانتهاء:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "red", fontWeight: 600 }}
                    >
                      {formatDate(alloc.batch.expiryDate)}
                    </Typography>
                  </Box>

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
            لا توجد معلومات تشغيلة لهذا العنصر.
          </Typography>
        )}
      </Popover>
    </Box>
  );
};

export default BatchAllocationButton;
