import type { Supplier } from "../types/supplier";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  PhoneOutlined,
  LocationOnOutlined,
  EditOutlined,
  DeleteOutlined,
  Note,
} from "@mui/icons-material";
import theme from "../../../shared/styles/mainTheme";
import useDeleteItem from "../../../shared/hooks/useDeleteItem";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import { useState } from "react";

interface SupplierCardProps {
  supplier: Supplier;
  refetch: () => void;
}

const SupplierCard = ({ supplier, refetch }: SupplierCardProps) => {
  const { mutate } = useDeleteItem(`/supplier`);
  const { showSnackbar } = useSnackbar();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = () => {
    mutate(supplier.supplierId, {
      onSuccess: () => {
        showSnackbar("تم حذف المورد بنجاح", "success");
        setOpenDeleteDialog(false);
        refetch()
      },
      onError: () => {
        showSnackbar("حدث خطأ أثناء حذف المورد", "error");
        setOpenDeleteDialog(false);
      },
    });
  };
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        border: "1px solid #eef2f6",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#111",
            mb: 2,
          }}
        >
          {supplier.supplierName}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <PhoneOutlined sx={{ fontSize: 18, color: "#666" }} />
            <Typography variant="body2" sx={{ color: "#444" }}>
              {supplier.phone}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LocationOnOutlined sx={{ fontSize: 18, color: "#666" }} />
            <Typography variant="body2" sx={{ color: "#444" }}>
              {supplier.address}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Note sx={{ fontSize: 18, color: "#666" }} />
            <Typography variant="body2" sx={{ color: "#444" }}>
              {supplier.notes}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pb: 3,
        }}
      >
        <Box>
          <IconButton
            size="small"
            sx={{ color: "#d32f2f" }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: "#2e7d32" }}>
            <EditOutlined fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            backgroundColor: alpha(theme.palette.secondary.light, 0.1),
            color: "secondary.main",
            px: 2,
            py: 0.5,
            borderRadius: 1.5,
            fontSize: "0.85rem",
            fontWeight: "bold",
          }}
        >
          {supplier.createdAt.split("T")[0]} {/* Display only the date part */}
        </Box>
      </Box>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>تأكيد الحذف</DialogTitle>

        <DialogContent>
          <DialogContentText>
            هل أنت متأكد أنك تريد حذف المورد
            <strong> {supplier.supplierName}</strong>؟
            <br />
            لا يمكن التراجع عن هذه العملية.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>إلغاء</Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SupplierCard;
