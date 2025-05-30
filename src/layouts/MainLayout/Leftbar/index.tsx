import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu_Nav_List, { MenuItemProps } from "@/src/data/MenuNav";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const LeftBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<MenuItemProps[]>(Menu_Nav_List);

  useEffect(() => {
    (async () => {
        console.log("menuData ==> ",menu);
    })();
  }, [menu]);

  return (
    <>
  <Box
      role="presentation"
      onClick={() => {
        console.log(" Click ");
      }}
      sx={{
        backgroundColor: "tomato",
      }}
    >
      <List>
        {menu?.map((d:MenuItemProps, index: number) => (
          <ListItem key={d?.id} disablePadding>
            <ListItemButton
              onClick={() => {
                console.log("click !! ", d?.path);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={d?.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  
    </>
  );
};

export default LeftBar;
