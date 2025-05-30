import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SxProps, styled, useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Iconify from "../Iconify";

export interface MenuItemProps {
  id: string;
  title: string;
  icon: string;
  children?: readonly MenuItemProps[];
  path: string;
  disabled?: boolean;
  expand?: boolean;
  is_dashboard?: boolean;
  is_show_count?: boolean;
  path_api_count?: string;
  count?: string;
}

interface MenuProps {
  item: MenuItemProps;
  level: number;
  isOpen?: boolean;
}

const noWrap: SxProps = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const activeMenu = {
  backgroundColor: (theme: any) => theme.colors.primary.main,
  fontWeight: "700",
  color: (theme: any) => theme.palette.common.white,
  "& .MuiListItemIcon-root": {
    color: (theme: any) => theme.palette.common.white,
  },
};
const hoverMenu = {
  backgroundColor: "#DBEBFF",
  color: (theme: any) => theme.palette.common.black,
  "& .MuiListItemIcon-root": {
    color: (theme: any) => theme.palette.common.black,
  },
};

const MenuItem = ({ item, isOpen = true }: MenuProps) => {
  const { pathname } = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(isOpen);
  const handleOpen = () => setOpen((prev) => !prev);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsSelected(
        item?.path !== "" && item?.path !== "/" && pathname.includes(item?.path)
      );
    })();
  }, [pathname]);

  return (
    <Box>
      <NextLink href={item?.path} style={{ textDecoration: "none" }}>
        <ListItemButton
          onClick={() => handleOpen()}
          sx={{
            padding: 0,
            height: "42px",
            borderRadius: "8px",
            fontWeight: "400",
            "&:hover": hoverMenu,
            "&.Mui-selected:hover": activeMenu,
            ...(isSelected && activeMenu),
          }}
        >
          {item?.icon != "" && (
            <ListItemIcon
              sx={{
                minWidth: "32px",
                marginLeft: !!item?.icon ? "8px" : "0px",
              }}
            >
              <Iconify
                icon={item.icon}
                color={theme.colors.primary}
                sx={{
                  width: 22,
                  height: 22,
                }}
              />
            </ListItemIcon>
          )}
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: isSelected ? 700 : "inherit",
                ...noWrap,
              },
            }}
            primary={item?.title}
          />
        </ListItemButton>
      </NextLink>
    </Box>
  );
};

export default MenuItem;
