import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import usePostData from "../../../../shared/hooks/usePostData";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../shared/store";
import {
  resetForm,
  selectRequestPayload,
  updateField,
} from "../../store/purchaseInvoiceSlice";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";
import { useNavigate } from "react-router-dom";
import { useIdempotency } from "../../../../shared/hooks/useIdempotency";

interface Props {
  activeStep: number;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
}

const PurchaseInvoiceStepper = ({
  activeStep = 1,
  children,
  onNext,
  onBack,
}: Props) => {
  const isFirst = activeStep === 0;
  const isLast = activeStep === 2;

  const steps = [
    {
      label: "معلومات الفاتورة",
      subtitle: "الخطوة 1",
      // caption: "يرجى إدخال بيانات المورد و تفاصيل الفاتورة الأساسية للمتابعة",
      icon: <PersonIcon />,
    },
    {
      label: "إضافة الأدوية والدفعات",
      caption: "قم بتحديد الكميات وتواريخ إنهاء الصلاحية لكل صنف مضاف",

      subtitle: "الخطوة 2",
      icon: <Inventory2OutlinedIcon fontSize="small" />,
    },
    {
      label: "التأكيد النهائي",
      subtitle: "الخطوة 3",
      // caption: "يرجى مراجعة جميع البيانات والتأكد من صحتها قبل التأكيد النهائي",
      icon: <AssignmentTurnedInIcon />,
    },
  ];

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const purchaseInvoice = useSelector(
    (state: RootState) => state.purchaseInvoice,
  );

  const payload = useSelector(selectRequestPayload);
  const dispatch = useDispatch();
  const { getKey, clearKey } = useIdempotency();

  const { mutate: createPurchaseInvoice } = usePostData(
    "/supplier-invoice/create",
  );

  useEffect(() => {
    // Initialize once per invoice flow so submit always has an idempotency key.
    if (!purchaseInvoice.idempotencyKey) {
      dispatch(
        updateField({
          field: "idempotencyKey",
          value: getKey(),
        }),
      );
    }
  }, [dispatch, getKey, purchaseInvoice.idempotencyKey]);

  const handleSubmit = () => {
    createPurchaseInvoice(payload, {
      onSuccess: (data) => {
        showSnackbar("تم إنشاء الفاتورة بنجاح", "success");
        clearKey();
        dispatch(resetForm());
        navigate("/pharmacy/invoices/purchase");
      },
       onError: (error) => {
        const errorDetails = (error as Error & { details?: string }).details;
        if (errorDetails)
          showSnackbar(error.message + ": " + errorDetails, "error");
        else showSnackbar(error.message, "error");
      },
    });
  };

  return (
    <Box
      sx={{
        height: "inherit",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F4F9FB",
      }}
    >
      <Box
        sx={{
          height: "14vh",
          minWidth: "65vw",
          mx: "auto",
          mb: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "10%",
            right: "10%",
            height: 2,
            bgcolor: "#E2E8F0",
            zIndex: 0,
            transform: "translateY(-50%)",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          {steps.map((step, idx) => {
            const isCompleted = activeStep > idx;
            const isActive = activeStep === idx;
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#64748B", mb: 0.5 }}>
                  {step.subtitle}
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: isCompleted
                      ? "secondary.light"
                      : isActive
                        ? idx === 2
                          ? "#5C4066"
                          : "#2D3A4D"
                        : "#FFF",
                    border:
                      !isCompleted && !isActive ? "2px solid #E2E8F0" : "none",
                    color: isCompleted || isActive ? "#FFF" : "#A0AEC0",
                    display: "flex",
                    alignItems: "center",
                    justifyValue: "center",
                    justifyContent: "center",
                  }}
                >
                  {isCompleted ? <CheckCircleIcon /> : step.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#2D3A4D" : "#64748B",
                    mt: 1,
                    fontSize: 14,
                  }}
                >
                  {step.label}
                </Typography>
                {step.caption && isActive && (
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#64748B",
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {step.caption}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 4,
          pb: 1,
        }}
      >
        {children}
      </Box>
      <Paper
        elevation={3}
        sx={{
          minWidth: "65vw",
          mx: "auto",
          position: "sticky",
          p: 1,
          borderTop: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#fff",
          borderRadius: 6,
        }}
      >
        <Button
          disabled={isFirst}
          onClick={onBack}
          sx={{ borderRadius: "inherit" }}
        >
          الرجوع للسابق
        </Button>

        <Button
          variant="contained"
          onClick={isLast ? () => handleSubmit() : onNext}
          sx={{ borderRadius: "inherit" }}
        >
          {isLast ? "تأكيد الفاتورة" : "الخطوة التالية"}
        </Button>
      </Paper>
    </Box>
  );
};

export default PurchaseInvoiceStepper;
