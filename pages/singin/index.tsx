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
import { useContext, useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { SidebarContext } from "@/src/contexts/SidebarContext";
import Loadding from "@/src/components/Loading";

const Singin = () => {
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoad] = useState<boolean>(false);
  const [themeName, setThemeName] = useState("MainTheme");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    (async () => {})();
  }, []);

  async function fetchData(values: any) {
    const { encryptStorage } = await import("@/src/components/storage");
    setLoad(true);
    const api = "http://localhost:8081/users/create";
    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const { users_id, username } = data?.data;
        encryptStorage.setItem("users_id", users_id);
        encryptStorage.setItem("username", username);
        setLoad(false);
        return data;
      })
      .catch((error) => {
        setLoad(false);
        console.error("Fetch error:", error);
        throw error;
      })
      .finally(() => {
        setLoad(false);
        console.log("Fetch operation finished.");
        router.push("/home");
      });
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        direction={isMobile ? "column-reverse" : "row"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.green.main,
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
            onSubmit={async (values: any, actions: any) => {
              await fetchData(values);
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
                    spacing={"20px"}
                    sx={{
                      padding: "0px 20px",
                      width: "-webkit-fill-available",
                      maxWidth: "384px",
                    }}
                  >
                    <Typography
                      variant="headings"
                      sx={{
                        color: theme.colors.white.main,
                        pb: "20px",
                      }}
                    >
                      Sing in
                    </Typography>
                    <TextField
                      size="small"
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
            backgroundColor: theme.colors.green.light,
            borderTopLeftRadius: isMobile ? "0px" : "36px",
            borderBottomLeftRadius: "36px",
            borderBottomRightRadius: isMobile ? "36px" : "0px",
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
              height={isMobile ? "132" : "230"}
              image="/static/images/logo-login/logo_login.png"
              alt="image a board"
            />
            <Typography
              variant="headings"
              sx={{ fontStyle: "italic", color: theme.colors.white.main }}
            >
              a Board
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Loadding openLoading={loading} />
    </>
  );
};
Singin.getLayout = (page: any) => <BaseLayout>{page}</BaseLayout>;
export default Singin;
