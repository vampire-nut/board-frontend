import dynamic from "next/dynamic";
import { ReactNode, useContext, useState } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { SidebarContext } from "@/src/contexts/SidebarContext";
import Loadding from "@/src/components/Loading";

import * as React from "react";
import LeftBar from "./Leftbar";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

interface Props {
  children?: ReactNode;
  is_info?: boolean;
}

const MainLayout = ({ children, is_info = false, ...props }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const down_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const down_md = useMediaQuery(theme.breakpoints.down("md"));
  const down_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const up_lg = useMediaQuery(theme.breakpoints.between("sm", "xxl"));

  const { loading, setLoad } = useContext(SidebarContext);

  return (
    <>
      <Loadding openLoading={loading} />
      <Navbar />
      <Grid
        container
        spacing={0}
        sx={{
          flexGrow: 1,
          backgroundColor: theme.colors.grey.lighter,
          width: "100%",
          // padding: "24px",
          height: "100dvh",
        }}
      >
        <Grid size={2} sx={{ display: down_sm ? "none" : "" }}>
          <LeftBar colorMain={theme.colors.green.main} />
        </Grid>
        <Grid
          size={{ xs: "grow", md: is_info ? "grow" : 8 }}
          offset={{ xs: "auto", md: "auto" }}
        >
          {children}
        </Grid>
        {!is_info && (
          <Grid size={2} sx={{ display: down_sm ? "none" : "grid" }}></Grid>
        )}
      </Grid>
    </>
  );
};

export default MainLayout;
