
// export default DrugBatchesPage;
import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Chip,
  LinearProgress,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

// استيراد المكونات المخصصة والآيقونات الفخمة
import { AddMedicineButton } from "../components/AddMedicineButton";
import { AddBatchDialog } from "../components/AddBatchDialog"; // 1. استيراد الـ Dialog الجديدة هنا
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

import { useGetData } from "../../../shared/hooks/useGetData"; 
import type { FilterStatus, RawBatchData } from "../types/batches";

// ==========================================
// 2. Custom Hook (الخطاف المخصص للمنطق)
// ==========================================
export const useMedicineBatches = (rawBatches: RawBatchData[]) => {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("ALL");

  const calculateBatchStatus = (batch: RawBatchData) => {
    const remaining = batch.initialQuantity - batch.soldQuantity;
    const isExpired = new Date(batch.expiryDate) < new Date();

    if (isExpired) {
      return { 
        type: "EXPIRED", 
        label: "منتهية الصلاحية", 
        color: "#e11d48", 
        bgColor: "#fff1f2", 
        borderColor: "#ffe4e6" 
      };
    }
    if (remaining <= 0) {
      return { 
        type: "OUT_OF_STOCK", 
        label: "كمية منتهية", 
        color: "#64748b", 
        bgColor: "#f1f5f9", 
        borderColor: "#e2e8f0" 
      };
    }
    return { 
      type: "VALID", 
      label: "صالح", 
      color: "#10b981", 
      bgColor: "#ecfdf5", 
      borderColor: "#d1fae5" 
    };
  };

  const counts = useMemo(() => {
    let total = rawBatches.length;
    let valid = 0;
    let outOfStock = 0;
    let expired = 0;

    rawBatches.forEach((batch) => {
      const status = calculateBatchStatus(batch);
      if (status.type === "VALID") valid++;
      if (status.type === "OUT_OF_STOCK") outOfStock++;
      if (status.type === "EXPIRED") expired++;
    });

    return { total, valid, outOfStock, expired };
  }, [rawBatches]);

  const filteredBatches = useMemo(() => {
    if (activeFilter === "ALL") return rawBatches;
    return rawBatches.filter((batch) => {
      const status = calculateBatchStatus(batch);
      return status.type === activeFilter;
    });
  }, [rawBatches, activeFilter]);

  return {
    activeFilter,
    setActiveFilter,
    counts,
    filteredBatches,
    calculateBatchStatus,
  };
};

// ==========================================
// 3. Main Component (مكون الواجهة الرئيسي المحدث)
// ==========================================
export const DrugBatchesPage: React.FC = () => {
  const { drugId } = useParams<{ drugId: string }>();
  const location = useLocation();

  // 2. حالة التحكم بفتح وإغلاق الـ Dialog
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);

  const { data: response, isLoading, isError } = useGetData<any>(
    `/batch/pharmacy-drug/${drugId}` 
  );

  const rawBatches = useMemo(() => {
    if (response && Array.isArray((response as any).data)) {
      return (response as any).data;
    }
    return [];
  }, [response]);

  const { activeFilter, setActiveFilter, counts, filteredBatches, calculateBatchStatus } = 
    useMedicineBatches(rawBatches);

  const stateData = location.state as { drugName: string; activeIngredient: string };
  const drugName = stateData?.drugName;
  const activeIngredient = stateData?.activeIngredient;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SY", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // معالجة حفظ الدفعة وإرسالها لاحقاً للسيرفر
  const handleSaveBatch = (newBatchData: any) => {
    console.log("البيانات القادمة من الفورم جاهزة للإرسال للأدو:", newBatchData);
    // هنا يتم ربط الـ Mutation الخاص بـ usePostData لاحقاً
    
    setIsAddBatchOpen(false); // إغلاق النافذة بعد الحفظ الافتراضي
  };

  // حالة التحميل (Loading State)
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80vh", gap: 2 }}>
        <CircularProgress sx={{ color: "#6b21a8" }} size={50} />
        <Typography variant="body1" sx={{ color: "#64748b", fontWeight: "600" }}>
          جاري تحميل سجل الدفعات وتحديث البيانات الماليّة...
        </Typography>
      </Box>
    );
  }

  // حالة الخطأ (Error State)
  if (isError) {
    return (
      <Box sx={{ p: 4 }} dir="rtl">
        <Alert severity="error" sx={{ borderRadius: "12px", fontWeight: "600" }}>
          فشل الاتصال بالخادم. يرجى التحقق من تشغيل السيرفر أو صحة المعرّف (ID) المدخل والمحاولة لاحقاً.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f8fafc", minHeight: "100vh", p: 4 }} dir="rtl">
      
      {/* هيدر الصفحة الرئيسي */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 3, borderBottom: "1px solid #e2e8f0", mb: 4 }}>
        <Box sx={{ textAlign: "right" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography variant="h4" sx={{ fontWeight: "900", color: "#1e293b" }}>
              {drugName}
            </Typography>
            <Chip 
              label={activeIngredient} 
              size="small" 
              sx={{ 
                backgroundColor: "#f3e8ff", 
                color: "#6b21a8", 
                border: "1px solid #e9d5ff",
                fontWeight: "700", 
                borderRadius: "8px" 
              }} 
            />
          </Box>
          <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
            إدارة دفعات هذا الدواء، ومتابعة تواريخ انتهاء الصلاحية والكميات المستهلكة.
          </Typography>
        </Box>

        {/* 3. تعديل الـ onClick هنا لفتح النافذة المنبثقة */}
        <AddMedicineButton onClick={() => setIsAddBatchOpen(true)} label="إضافة دفعة" />
      </Box>

      {/* التابات التفاعلية للفلترة */}
      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, 
          gap: 2.5, 
          mb: 5 
        }}
      >
        {[
          { id: "ALL", label: "إجمالي الدفعات", count: counts.total, icon: <LayersOutlinedIcon fontSize="small" />, activeColor: "#6b21a8" },
          { id: "VALID", label: "الصالحة", count: counts.valid, icon: <CheckCircleOutlinedIcon fontSize="small" />, activeColor: "#10b981" },
          { id: "OUT_OF_STOCK", label: "منهية الكمية", count: counts.outOfStock, icon: <RemoveCircleOutlinedIcon fontSize="small" />, activeColor: "#64748b" },
          { id: "EXPIRED", label: "منتهية الصلاحية", count: counts.expired, icon: <EventBusyOutlinedIcon fontSize="small" />, activeColor: "#e11d48" },
        ].map((tab) => {
          const isSelected = activeFilter === tab.id;
          return (
            <Card
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as FilterStatus)}
              sx={{
                p: 2.5,
                borderRadius: "14px",
                cursor: "pointer",
                borderTop: isSelected ? `4px solid ${tab.activeColor}` : "1px solid #e2e8f0",
                borderLeft: "1px solid #e2e8f0",
                borderRight: "1px solid #e2e8f0",
                borderBottom: "1px solid #e2e8f0",
                boxShadow: isSelected 
                  ? "0px 12px 28px rgba(0, 0, 0, 0.08)" 
                  : "0px 4px 12px rgba(0, 0, 0, 0.03)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.2s ease-in-out",
                backgroundColor: isSelected ? "#ffffff" : "#fdfefe",
                "&:hover": { 
                  transform: "translateY(-3px)",
                  boxShadow: "0px 10px 24px rgba(0, 0, 0, 0.06)"
                }
              }}
            >
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="caption" sx={{ color: isSelected ? "#475569" : "#94a3b8", fontWeight: "700" }}>
                  {tab.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "900", color: isSelected ? tab.activeColor : "#1e293b", mt: 0.5 }}>
                  {tab.count}
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  p: 1, 
                  backgroundColor: isSelected ? `${tab.activeColor}10` : "#f8fafc", 
                  color: isSelected ? tab.activeColor : "#94a3b8",
                  borderRadius: "10px", 
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {tab.icon}
              </Box>
            </Card>
          );
        })}
      </Box>

      <Typography variant="body1" sx={{ fontWeight: "800", color: "#334155", mb: 3, textAlign: "start" }}>
        سجل الدفعات الحالية المفلترة ({filteredBatches.length})
      </Typography>

      {/* شبكة كروت عرض الدفعات */}
      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, 
          gap: 3 
        }}
      >
        {filteredBatches.map((batch) => {
          const remaining = batch.initialQuantity - batch.soldQuantity;
          const progressPercent = (remaining / batch.initialQuantity) * 100;
          const status = calculateBatchStatus(batch);

          const hasInvoice = batch.supplierInvoiceItem !== null;
          const supplierName = hasInvoice ? "مستودع الأدوية المركزي" : "إدخال مباشر للمخزن";
          const invoiceNumber = hasInvoice ? batch.supplierInvoiceItem?.supplierInvoice?.invoiceNumber : "—";
          const purchasePrice = hasInvoice ? `${batch.supplierInvoiceItem?.netUnitPrice} ل.س` : "غير محدد";

          return (
            <Card
              key={batch.batchId}
              sx={{
                borderRadius: "16px",
                border: "1px solid #eef2f5",
                boxShadow: "0px 10px 30px rgba(148, 163, 184, 0.12)", 
                backgroundColor: "#ffffff",
                overflow: "hidden",
                transition: "all 0.25s ease-in-out",
                "&:hover": { 
                  transform: "translateY(-5px)", 
                  boxShadow: "0px 16px 40px rgba(148, 163, 184, 0.22)" 
                }
              }}
            >
              {/* 1. رأس الكرت */}
              <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", fontWeight: "600" }}>رقم الدفعة</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "700", color: "#1e293b" }}>BN-2026-00{batch.batchId}</Typography>
                </Box>
                <Chip
                  label={status.label}
                  size="small"
                  sx={{
                    backgroundColor: status.bgColor,
                    color: status.color,
                    borderColor: status.borderColor,
                    border: "1px solid",
                    fontWeight: "700",
                    borderRadius: "8px"
                  }}
                />
              </Box>

              {/* 2. محتوى الكرت الأساسي */}
              <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
                
                {/* قسم تاريخ الانتهاء المطور */}
                <Box 
                  sx={{ 
                    p: 1.5, 
                    backgroundColor: status.bgColor + "30", 
                    borderRadius: "12px", 
                    border: `1px solid ${status.borderColor}`, 
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: "600", display: "block", mb: 0.2 }}>
                      تاريخ الانتهاء
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "800", color: status.type === "EXPIRED" ? "#e11d48" : "#1e293b" }}>
                      {formatDate(batch.expiryDate)}
                    </Typography>
                  </Box>

                  {status.type === "EXPIRED" && remaining > 0 && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`جاري اتخاذ إجراء الإتلاف للدفعة رقم: ${batch.batchId}`);
                      }}
                      sx={{
                        color: "#e11d48",
                        borderColor: "#fecdd3",
                        borderRadius: "8px",
                        fontWeight: "700",
                        px: 1.5,
                        py: 0.4,
                        backgroundColor: "#ffffff",
                        boxShadow: "0px 2px 6px rgba(225, 29, 72, 0.04)",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#fff1f2",
                          borderColor: "#e11d48",
                        }
                      }}
                    >
                      إتلاف الدفعة
                    </Button>
                  )}
                </Box>

                {/* قسم الكمية المتوفرة */}
                <Box sx={{ textAlign: "right" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.2 }}>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: "400", fontSize: "0.88rem" }}>
                      الكمية المتوفرة:{" "}
                      <Box component="span" sx={{ color: "#1e293b", fontWeight: "900", fontSize: "1rem", ml: 0.5 }}>
                        {remaining}
                      </Box>
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: "400", fontSize: "0.85rem" }}>
                      من أصل:{" "}
                      <Box component="span" sx={{ color: "#475569", fontWeight: "700", ml: 0.5 }}>
                        {batch.initialQuantity}
                      </Box>
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#f1f5f9",
                      "& .MuiLinearProgress-bar": { backgroundColor: status.color, borderRadius: 3 },
                    }}
                  />
                  {batch.soldQuantity > 0 && (
                    <Typography variant="caption" sx={{ color: "#d97706", mt: 0.5, display: "block", fontSize: "0.7rem", fontWeight: "600" }}>
                       سُحب من الدفعة {batch.soldQuantity} وحدة .
                    </Typography>
                  )}
                </Box>

                {/* 3. شبكة البيانات الثانوية الداخلية */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, pt: 2, borderTop: "1px solid #f1f5f9" }}>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>المورد</Typography>
                    <Typography variant="caption" sx={{ fontWeight: "700", color: hasInvoice ? "#475569" : "#94a3b8", display: "block" }}>
                      {supplierName}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>سعر الشراء</Typography>
                    <Typography variant="caption" sx={{ fontWeight: "700", color: hasInvoice ? "#1e293b" : "#94a3b8", display: "block" }}>
                      {purchasePrice}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>رقم الفاتورة</Typography>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", color: hasInvoice ? "#64748b" : "#94a3b8", fontWeight: "600" }}>
                      {invoiceNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>تاريخ الإدخال</Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: "600" }}>
                      {formatDate(batch.receivedDate)}
                    </Typography>
                  </Box>
                </Box>

              </Box>
            </Card>
          );
        })}
      </Box>

      {/* 4. استدعاء مكون الـ Dialog أسفل الواجهة وتمرير الخصائص له */}
      <AddBatchDialog
        open={isAddBatchOpen}
        onClose={() => setIsAddBatchOpen(false)}
        onSave={handleSaveBatch}
        drugName={drugName}
        // isPending={false} // يمكنكِ ربطها بحالة التحميل الخاصة بالـ mutation لاحقاً
      />

    </Box>
  );
};

export default DrugBatchesPage;