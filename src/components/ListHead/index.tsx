import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Dispatch, SetStateAction, useEffect } from "react";
import Iconify from "../Iconify";
import * as React from "react";
import CommunityDropdown from "../CommunityDropdown";

interface Props {
  search?: string;
  selectCategory?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  handleClickCreate?: () => void;
  handleClickSearch?: () => void;
  handleCategoryChange?: (category: string) => void;
}

const ListHead = ({
  search,
  selectCategory,
  setSearch,
  handleClickCreate,
  handleClickSearch,
  handleCategoryChange,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isMobile ? null : (
          <Iconify
            icon="solar:magnifer-linear"
            fontSize="24px"
            sx={{
              color: "#222222",
              cursor: "pointer",
            }}
            onClick={handleClickSearch}
          />
        )}

        <Stack
          direction="row"
          spacing={3}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: !isMobile ? "100%" : "auto",
          }}
        >
          {isMobile ? null : (
            <TextField
              variant="outlined"
              fullWidth
              value={search}
              size="small"
              onChange={(e) => {
                setSearch!(e.target.value);
              }}
              placeholder={"Search"}
              InputProps={{
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    handleClickSearch!();
                    e.preventDefault();
                  }
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon="solar:magnifer-linear"
                      fontSize="24px"
                      sx={{
                        color: "#222222",
                        cursor: "pointer",
                      }}
                      onClick={handleClickSearch}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "inherit",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.colors.green.lighter,
                  },
                },
              }}
            />
          )}

          <CommunityDropdown
            selected={selectCategory || ""}
            handleCategoryChange={(category: string) => {handleCategoryChange && handleCategoryChange(category);}}
          />
          <Button variant="contained" onClick={handleClickCreate}>
            Create +
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default ListHead;
