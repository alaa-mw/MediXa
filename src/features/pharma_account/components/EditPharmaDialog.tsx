import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import type { Pharmacy } from "../types/allPharmaciesResponse";
import PharmaEditForm from "./PharmaEditForm";

interface Props {
  open: boolean;
  pharmacy: Pharmacy | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const EditPharmacyDialog = ({
  open,
  pharmacy,
  onClose,
  onSubmit,
  isLoading,
}: Props) => {
  if (!pharmacy) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        تعديل بيانات الصيدلية
      </DialogTitle>

      <DialogContent>
        <PharmaEditForm
          pharmacy={pharmacy}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPharmacyDialog;
