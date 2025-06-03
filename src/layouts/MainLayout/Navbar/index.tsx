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
import { Button, Stack, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";

export default function MenuAppBar() {
  const theme = useTheme();
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const settings = ["Logout"];
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async () => {
    const { encryptStorage } = await import("@/src/components/storage");
    encryptStorage.clear();
    window.location.href = "/singin";
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push("/singin");
  };

  useEffect(() => {
    (async () => {
      const { encryptStorage } = await import("@/src/components/storage");
      const user = encryptStorage.getItem("username") || "";
      setUsername(user);
      if (!!user) {
        setAuth(true);
      }
    })();
  }, []);

  useEffect(() => {}, [username]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="headings"
            component="div"
            sx={{ flexGrow: 1, fontStyle: "italic" }}
          >
            a Board
          </Typography>
          <Button
            variant="contained"
            onClick={(e) => handleClick(e)}
            sx={{ marginRight: "10px", display: auth ? "none" : "flex" }}
          >
            Sing In
          </Button>
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
                  <Typography variant="Body1">{`${username}`}</Typography>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="" src="/static/images/avatar/1.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography sx={{ textAlign: "center" }}>
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Stack>
              ) : null}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
