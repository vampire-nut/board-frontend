import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

const categories = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];

interface Props {
  selected: string;
  handleCategoryChange: (category: string) => void;
}

function CommunityDropdown({ selected, handleCategoryChange }: Props) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<String>(
    selected || "Community"
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (category: string) => {
    setSelectedCategory(category);
    handleCategoryChange(category);
    handleClose();
  };

  return (
    <>
      <Button
        id="community-dropdown-button"
        aria-controls={open ? "community-dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={
          <KeyboardArrowDownIcon
          //   sx={{ color: theme.colors.success.main }}
          />
        }
        sx={{
          fontSize: "1rem",
          padding: "8px 16px",
          backgroundColor: "inherit",
          //   border: '1px solid #49A569',
          //   width:'100%'
        }}
      >
        <Typography
          variant="body1"
          sx={
            {
              // color: theme.colors.success.main
            }
          }
        >
          {selectedCategory}
        </Typography>
      </Button>
      <Menu
        id="community-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(192, 48, 48, 0.1)",
            minWidth: 200,
            marginTop: "8px",
          },
        }}
      >
        {categories?.map((category) => (
          <MenuItem
            key={category}
            onClick={() => handleMenuItemClick(category)}
            selected={category === selectedCategory}
            sx={{
              padding: "10px 16px",
              "&.Mui-selected": {
                backgroundColor: theme.colors.green.lighter,
                "&:hover": {
                  backgroundColor: theme.colors.green.lighter,
                },
              },
            }}
          >
            <Typography variant="inherit" noWrap sx={{ width: "100%" }}>
              {category}
            </Typography>
            {category === selectedCategory && (
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default CommunityDropdown;
