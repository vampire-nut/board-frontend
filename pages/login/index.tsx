import BaseLayout from "@/src/layouts/BaseLayout";
import {
  Box,
  Button,
  CardMedia,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Login = () => {
  const router = useRouter();
  const theme = useTheme();
  const [themeName, setThemeName] = useState("MainTheme");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        direction={isMobile ? "column-reverse" : "row"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          size={{ xs: 12, sm: 7, md: 7 }}
          direction="column"
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: isMobile ? "50dvh" : "100dvh",
          }}
        >
          <Formik
            initialValues={{ username: "" }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Please enter your username."),
            })}
            onSubmit={(values: any, actions: any) => {
              console.log("values in>>", values);
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
              <Form
                noValidate
                onSubmit={handleSubmit}
                style={{ width: "-webkit-fill-available" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      padding: "0px 20px",
                      width: "-webkit-fill-available",
                      maxWidth: "400px",
                    }}
                  >
                    <Typography>Sing In</Typography>
                    <TextField
                      variant="outlined"
                      id="username"
                      name="username"
                      placeholder="Username"
                      fullWidth
                      value={values.username}
                      onChange={(e) => {
                        handleChange("username")(e);
                      }}
                      onBlur={(e) => {
                        handleBlur("username")(e);
                      }}
                      error={Boolean(errors.username)}
                      sx={{ sx: "100%" }}
                    />
                    {Boolean(errors.username) && (
                      <FormHelperText
                        error
                      >{`${errors.username}`}</FormHelperText>
                    )}
                    <Button type="submit" variant="contained">
                      Sing In
                    </Button>
                  </Stack>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid
          container
          spacing={1}
          size={{ xs: 12, sm: 5, md: 5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: isMobile ? "50dvh" : "100dvh",
            backgroundColor: "tomato",
            borderTopLeftRadius: isMobile ? "0px" : "18px",
            borderBottomLeftRadius: "18px",
            borderBottomRightRadius: isMobile ? "18px" : "0px",
          }}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              height="194"
              image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
              alt="image a board"
            />
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              a Board
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
Login.getLayout = (page: any) => <BaseLayout>{page}</BaseLayout>;
export default Login;
