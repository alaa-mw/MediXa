import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchTextField from "./SearchTextFiled";

interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
}

interface OwnerSearchDialogProps {
  open: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  filteredOwners: Owner[];
  onSelectOwner: (owner: Owner) => void;
}

export const OwnerSearchDialog = ({
  open,
  onClose,
  search,
  onSearchChange,
  filteredOwners,
  onSelectOwner,
}: OwnerSearchDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableEnforceFocus
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        اختيار مالك الصيدلية
      </DialogTitle>

      <DialogContent
        sx={{
          height: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SearchTextField
          placeholder="ابحث باسم المالك الثلاثي..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Box sx={{ flex: 1, overflowY: "auto", mt: 2 }}>
          {filteredOwners.length > 0 ? (
            <List>
              {filteredOwners.map((owner) => (
                <ListItemButton
                  key={owner.id}
                  onClick={() => onSelectOwner(owner)}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ color: "#000000", fontWeight: "400" }}>
                        {owner.name}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ color: "#666666", fontSize: "12px" }}>
                        {owner.phone}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="text.secondary">لا يوجد نتائج</Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OwnerSearchDialog;
