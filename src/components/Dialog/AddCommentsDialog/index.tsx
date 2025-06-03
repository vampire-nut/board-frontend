// components/AddCommentsDialog.js
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  FormHelperText,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { CommentsProps } from "../../CardComment";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CommunityDropdown from "../../CommunityDropdown";

interface AddCommentsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, actions: any) => void;
  data?: CommentsProps;
}

function AddCommentsDialog({
  open,
  onClose,
  onSubmit,
  data,
}: AddCommentsDialogProps) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle>
        <Typography component={"span"} variant="Body1">
          {"Add Comments"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={{
            comment: data?.comment || "",
          }}
          validationSchema={Yup.object().shape({
            comment: Yup.string().required("Please enter comment"),
          })}
          onSubmit={(values: any, actions: any) => {
            onSubmit(values, actions);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container>
                <Grid size={12} pt="10px">
                  <TextField
                    variant="outlined"
                    id="comment"
                    name="comment"
                    placeholder="What's on your mimd..."
                    fullWidth
                    multiline
                    maxRows={4}
                    minRows={4}
                    value={values.comment}
                    onChange={(e) => {
                      handleChange("comment")(e);
                    }}
                    onBlur={(e) => {
                      handleBlur("comment")(e);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.comment)}
                  />
                  {Boolean(errors.comment) && (
                    <FormHelperText error>{`${errors.comment}`}</FormHelperText>
                  )}
                </Grid>
                <Grid
                  size={12}
                  pt="40px"
                  container
                  spacing={2}
                  direction="row"
                  sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                      backgroundColor: "inherit",
                      height: 40,
                      width: { xs: "100%", sm: "105px" },
                      color: theme.colors.success.main,
                      borderRadius: "8px",
                      borderColor: theme.colors.success.main,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: { xs: "100%", sm: "105px" } }}
                  >
                    {`Post`}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddCommentsDialog;
