// components/DeleteConfirmationDialog.tsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Please confirm if you wish to delete the post",
  message = "Are you sure you want to delete the post? Once deleted, it cannot be recovered.",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid
          size={'grow'}
          padding={'10px 20px'}
          mb={"10px"}
          container
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              backgroundColor: "inherit",
              height: 40,
              width: { xs: "100%", sm: "165px" },
              color: theme.colors.grey.main,
              borderRadius: "8px",
              borderColor: theme.colors.grey.main,
            }}
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{
              width: { xs: "100%", sm: "165px" },
              height: 40,
              backgroundColor: "red",
            }}
          >
            {confirmButtonText}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
