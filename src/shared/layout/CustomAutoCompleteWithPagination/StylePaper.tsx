import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import PaginationFooter from "./PaginationFooter";
import type { PaginationData } from "./pagination-types";

interface Props {
  children: React.ReactNode;
  pagination?: PaginationData;
  onPageChange(page: number): void;
  onQuickAdd?: () => void;
}

const StyledPaper = ({
  children,
  pagination,
  onPageChange,
  onQuickAdd,
}: Props) => {
  return (
    <Paper
      sx={{
        mt: 1,
        borderRadius: 3,
        direction: "rtl",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 💡 أزلنا الـ Box الإضافي لتفادي تعارض الـ Scroll البطيء */}
      {children}

      <Divider />

      {pagination && (
        <PaginationFooter
          {...pagination}
          onPageChange={onPageChange}
          onQuickAdd={onQuickAdd}
        />
      )}
    </Paper>
  );
};

export default StyledPaper;
