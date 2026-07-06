import { AddCircle } from "@mui/icons-material";
import { Box, Button, Pagination } from "@mui/material";

interface Props {
  page: number;
  pages: number;
  total: number;
  limit: number;
  onPageChange(page: number): void;
  onQuickAdd?: () => void;
}

const PaginationFooter = ({
  page,
  pages,
  total,
  limit,
  onPageChange,
  onQuickAdd,
}: Props) => {
  // ملاحظة: يمكنك تفعيل الـ from و to إذا احتجتها لاحقاً
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <Box
      onMouseDown={(e) => e.preventDefault()}
      sx={{
        width: "100%",
        p: 1,
        direction: "rtl",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // 💡 هنا السر: دفع العناصر للأطراف القصوى بناءً على وجود زر الإضافة أو عدمه
          justifyContent: onQuickAdd ? "space-between" : "flex-end",
          p: 1.5,
          direction: "rtl",
          flexWrap: "nowrap",
          width: "100%",
        }}
      >
        {onQuickAdd && (
          <Button
            size="large"
            startIcon={<AddCircle />}
            onClick={onQuickAdd}
            sx={{
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              fontSize: "15px",
              textTransform: "none",
              color: "secondary.main",
              p: 0, // إزالة الحواف الداخلية الزائدة للالتصاق بالطرف تماماً
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            إضافة عنصر غير موجود؟
          </Button>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "nowrap",
          }}
        >
          <Pagination
            page={page}
            count={pages}
            size="small"
            color="primary"
            shape="rounded"
            onChange={(_, value) => onPageChange(value)}
          />
          {/* <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            عرض {from} - {to} من {total}
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default PaginationFooter;
