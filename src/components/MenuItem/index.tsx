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
  path: string;
  disabled?: boolean;
}

interface MenuProps {
  item: MenuItemProps;
  colorMain: string;
}

const noWrap: SxProps = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const activeMenu = {
  fontWeight: "700",
  color: (theme: any) => theme.colors.green.main,
  "& .MuiListItemIcon-root": {
    color: (theme: any) => theme.colors.green.main,
  },
};
const hoverMenu = {
  color: (theme: any) => theme.colors.green.main,
  "& .MuiListItemIcon-root": {
    color: (theme: any) => theme.colors.green.main,
  },
};

const MenuItem = ({ item, colorMain }: MenuProps) => {
  const { pathname } = useRouter();
  const theme = useTheme();
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
          sx={{
            padding: 0,
            height: "42px",
            borderRadius: "8px",
            fontWeight: 400,
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
                color: colorMain,
              }}
            >
              <Iconify
                icon={item?.icon}
                color={colorMain}
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
                fontWeight: isSelected ? 700 : 400,
                ...noWrap,
              },
              color: colorMain
            }}
            primary={item?.title}
          />
        </ListItemButton>
      </NextLink>
    </Box>
  );
};

export default MenuItem;
