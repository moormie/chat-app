import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

export const LogoutAlert: FC<Props> = ({ onCancel, onSubmit }) => {
  return (
    <Dialog
      open
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: "20px",
        },
      }}
    >
      <DialogContent>
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to log out?
        </DialogTitle>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button sx={{ minWidth: 100 }} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            sx={{ minWidth: 100 }}
            variant="contained"
            onClick={onSubmit}
            autoFocus
          >
            Log Out
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
