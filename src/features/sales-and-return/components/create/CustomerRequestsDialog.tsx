
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Paper,
  Tooltip,
  Backdrop,
  Chip,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import type { CustomerRequestItem } from "../../types/customerRequest";
import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import useGetData from "../../../../shared/hooks/useGetData";
import { mapCheckoutPreviewToSlice } from "../../utils/customerRequestMapper";
import { populateFromCheckoutPreview } from "../../store/createSaleInvoiceSlice";
import type { CustomerRequestStatus } from "../../types/enums";

interface CustomerRequestsDialogProps {
  open: boolean;
  onClose: () => void;
}

const VISIBLE_STATUSES: CustomerRequestStatus[] = ["PENDING", "PARTIALLY_FULFILLED"];

export const CustomerRequestsDialog: React.FC<CustomerRequestsDialogProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRequestId, setSelectedRequestId] = useState<number | string | null>(null);

  const {
    data: response,
    isLoading: isListLoading,
    isError,
  } = useGetWithParams<CustomerRequestItem[]>("/customer-request", {
    page: 1,
    limit: 20,
  });

  const requests = useMemo(() => {
    const data = response?.data ?? [];
    return data.filter((request) => VISIBLE_STATUSES.includes(request.status));
  }, [response]);

  const endpoint = selectedRequestId
    ? `/customer-request/${selectedRequestId}/checkout-preview`
    : "";

  const { data: previewResponse, isLoading: isPreviewLoading } =
    useGetData<any>(endpoint);

  useEffect(() => {
    const rawPreviewData = (previewResponse as any)?.data || previewResponse;

    if (rawPreviewData && selectedRequestId) {
      const mappedData = mapCheckoutPreviewToSlice(rawPreviewData);
      dispatch(populateFromCheckoutPreview(mappedData));

      setSelectedRequestId(null);
      onClose();

      navigate("/pharmacy/sales/sales/create", { replace: true });
    }
  }, [previewResponse, selectedRequestId, dispatch, navigate, onClose]);

  const handleCloseDialog = () => {
    setSelectedRequestId(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <Backdrop
        open={isPreviewLoading}
        sx={{
          position: "absolute",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#fff",
          bgcolor: "rgba(255, 255, 255, 0.7)",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body2" sx={{ color: "#334155", fontWeight: 600 }}>
          جاري تجهيز عناصر الطلب...
        </Typography>
      </Backdrop>

      {/* رأس النافذة */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: "#EEF2FF",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReceiptLongRoundedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}
            >
              طلبات الزبائن المعلقة والجاهزة جزئياً
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B" }}>
              اختر طلباً لمتابعة الفاتورة
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleCloseDialog}
          size="small"
          sx={{ color: "#94A3B8", "&:hover": { color: "#0F172A" } }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      {/* المحتوى */}
      <DialogContent sx={{ p: 2.5, bgcolor: "#FAFAFA", minHeight: 280 ,overflowY: "auto",}}>
        {isListLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 6,
              gap: 1,
            }}
          >
            <CircularProgress size={32} thickness={4} />
            <Typography variant="caption" color="text.secondary">
              جاري تحميل الطلبات...
            </Typography>
          </Box>
        ) : isError ? (
          <Typography
            sx={{
              textAlign: "center",
              py: 5,
              color: "error.main",
              fontSize: 14,
            }}
          >
            حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.
          </Typography>
        ) : requests.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontWeight: 500 }}
            >
              لا توجد طلبات معلقة أو مجهزة جزئياً حالياً
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1.5}}>
            {requests.map((req) => (
              <Paper
                key={req.customerRequestId}
                elevation={0}
                onClick={() => setSelectedRequestId(req.customerRequestId)}
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  border: "1px solid #E2E8F0",
                  bgcolor: "#FFFFFF",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.08)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonOutlineRoundedIcon
                      sx={{ fontSize: 18, color: "#64748B" }}
                    />
                    <Typography
                      sx={{ fontWeight: 700, fontSize: 15, color: "#1E293B" }}
                    >
                      {req.customerName || "زبون غير مسجل"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {req.status === "PARTIALLY_FULFILLED" && (
                      <Chip
                        label="جزئي الجاهزية"
                        size="small"
                        sx={{
                          bgcolor: "#FEF3C7",
                          color: "#D97706",
                          fontWeight: 700,
                          fontSize: 11,
                          height: 22,
                        }}
                      />
                    )}
                    {req.status === "PENDING" && (
                      <Chip
                        label="قيد الانتظار"
                        size="small"
                        sx={{
                          bgcolor: "#E0F2FE",
                          color: "#0369A1",
                          fontWeight: 700,
                          fontSize: 11,
                          height: 22,
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pt: 1,
                    borderTop: "1px solid #F1F5F9",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2.5,
                      color: "#64748B",
                      fontSize: 13,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.6 }}
                    >
                      <LocalPhoneOutlinedIcon sx={{ fontSize: 16 }} />
                      <span>{req.customerPhone || "بدون هاتف"}</span>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.6 }}
                    >
                      <ShoppingBagOutlinedIcon sx={{ fontSize: 16 }} />
                      <span style={{ fontWeight: 600, color: "#334155" }}>
                        {req.itemsCount} أصناف
                      </span>
                    </Box>
                  </Box>

                  {req.notes && (
                    <Tooltip title={req.notes} arrow placement="top">
                      <Box
                        sx={{
                          maxWidth: 160,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 12,
                          color: "#D97706",
                          bgcolor: "#FFFBEB",
                          px: 1,
                          py: 0.2,
                          borderRadius: 1,
                          border: "1px solid #FEF3C7",
                        }}
                      >
                        {req.notes}
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};