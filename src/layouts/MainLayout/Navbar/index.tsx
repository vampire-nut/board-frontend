import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Sidebar from "../Sidebar";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";

export default function MenuAppBar() {
  const theme = useTheme();
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("se"));
  console.log("isMobile ==> ", isMobile);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push("/login");
  };

  useEffect(() => {
    (async () => {
      const { encryptStorage } = await import("@/src/components/storage");
      const username = encryptStorage?.getItem("username") || "";
    })();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontStyle: "italic" }}
          >
            a Board
          </Typography>

          {isMobile ? (
            <Sidebar />
          ) : (
            <>
              {auth ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="Body1">Username...</Typography>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
              ) : (
                <Button variant="contained" onClick={(e) => handleClick(e)}>
                  Sing In
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
