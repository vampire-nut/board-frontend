import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  useTheme,
  Typography,
  FormHelperText,
  Stack,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import CommunityDropdown from "../../CommunityDropdown";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CardItemProps } from "../../CardPost";

export interface PostsProps {
  title: string;
  content: string;
  category: string;
}

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  dialogTitle?: string;
  onSubmit: (values: any, actions: any) => void;
  data?: CardItemProps;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
  open,
  onClose,
  dialogTitle = "Create Post",
  onSubmit,
  data,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle>
        <Typography component={"span"} variant="Body1">
          {dialogTitle}
        </Typography>
      </DialogTitle>
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

      <DialogContent>
        <Formik
          initialValues={{
            post_id: data?.post_id || "",
            category: data?.category || "",
            title: data?.title || "",
            content: data?.content || "",
          }}
          validationSchema={Yup.object().shape({
            category: Yup.string().required("Please select category"),
            title: Yup.string().required("Please enter title"),
            content: Yup.string().required("Please enter content"),
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
                <Grid size={12}>
                  <CommunityDropdown
                    selected={data?.category || ""}
                    handleCategoryChange={(e) => handleChange("category")(e)}
                  />
                  {Boolean(errors.category) && (
                    <FormHelperText
                      error
                    >{`${errors.category}`}</FormHelperText>
                  )}
                </Grid>
                <Grid size={12} pt="10px">
                  <TextField
                    variant="outlined"
                    id="title"
                    name="title"
                    placeholder="Title"
                    fullWidth
                    value={values.title}
                    onChange={(e) => {
                      handleChange("title")(e);
                    }}
                    onBlur={(e) => {
                      handleBlur("title")(e);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.title)}
                  />
                  {Boolean(errors.title) && (
                    <FormHelperText error>{`${errors.title}`}</FormHelperText>
                  )}
                </Grid>
                <Grid size={12} pt="10px">
                  <TextField
                    variant="outlined"
                    id="content"
                    name="content"
                    placeholder="What's on your mimd..."
                    fullWidth
                    multiline
                    maxRows={4}
                    minRows={4}
                    value={values.content}
                    onChange={(e) => {
                      handleChange("content")(e);
                    }}
                    onBlur={(e) => {
                      handleBlur("content")(e);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.content)}
                  />
                  {Boolean(errors.content) && (
                    <FormHelperText error>{`${errors.content}`}</FormHelperText>
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
                    {`${data?.post_id ? "Confirm" : "Post"}`}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
