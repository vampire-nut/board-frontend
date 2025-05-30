import dynamic from "next/dynamic";
import { ReactNode, useContext, useState } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { SidebarContext } from "@/src/contexts/SidebarContext";
import Loadding from "@/src/components/Loading";
import LeftBar from "./Leftbar";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuItem, { MenuItemProps } from "@/src/components/MenuItem";
import Menu_Nav_List from "@/src/data/MenuNav";

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

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

interface Props {
  children?: ReactNode;
}

const MainLayout = ({ children, ...props }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const down_lg = useMediaQuery(theme.breakpoints.down("lg"));
  const down_md = useMediaQuery(theme.breakpoints.down("md"));
  const down_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const up_lg = useMediaQuery(theme.breakpoints.between("sm", "xxl"));

  const { loading, setLoad } = useContext(SidebarContext);
  const menu = Menu_Nav_List;

  return (
    <>
      <Loadding openLoading={loading} />
      <Navbar />
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          backgroundColor: "tomato",
          width: "100%",
          padding: "24px",
          height: "100dvh",
        }}
      >
        <Grid size={3} sx={{ display: down_sm ? "none" : "" }}>
          {menu?.map((menu: MenuItemProps, i: number) => (
            <MenuItem key={i} item={menu} level={0} isOpen={menu.expand} />
          ))}
        </Grid>
        <Grid size={{ xs: "grow", md: 6 }} offset={{ xs: "auto", md: "auto" }}>
          {children}
        </Grid>
        <Grid size={3} sx={{ display: down_sm ? "none" : "grid" }}></Grid>
      </Grid>
    </>
  );
};

export default MainLayout;

export const MainBoxDetail = ({ children, ...props }: Props) => {
  const theme = useTheme();
  const down_md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        maxWidth: "1300px",
        minHeight: "520px",
        height: "auto",
        padding: down_md ? "16px" : "24px",
        borderRadius: "12px",
        background: "#FFF",
      }}
    >
      {children}
    </Box>
  );
};
