import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu_Nav_List, { MenuItemProps } from "@/src/data/MenuNav";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuItem from "@/src/components/MenuItem";

interface LeftBarProps {
  colorMain: string;
}
const LeftBar = ({colorMain}: LeftBarProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<MenuItemProps[]>(Menu_Nav_List);

  useEffect(() => {
    (async () => {
    })();
  }, [menu]);

  return (
    <>
      {menu?.map((menu: MenuItemProps, i: number) => (
        <MenuItem key={i} item={menu} colorMain={colorMain}/>
      ))}

    </>
  );
};

export default LeftBar;
