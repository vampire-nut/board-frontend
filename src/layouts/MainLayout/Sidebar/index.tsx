import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu_Nav_List, { MenuItemProps } from "@/src/data/MenuNav";
import LeftBar from "../Leftbar";
import { useTheme } from "@mui/material";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const menu = Menu_Nav_List;
  console.log("menu ==> ", menu);


  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: theme.colors.green.main,
        height: '100dvh'
      }}
    >
      <List sx={{padding: '16px', }}>
        <ListItem key={"onBack"} disablePadding sx={{ mb: '20px'}}>
          <ListItemButton onClick={toggleDrawer(anchor, false)}>
            <ListItemIcon>
              <ArrowBackIcon
                sx={{ transform: "rotate(180deg)", color: "white" }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <LeftBar colorMain={theme.colors.white.main}/>
      </List>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("right", true)}
          >
            <MenuIcon />
          </IconButton>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
