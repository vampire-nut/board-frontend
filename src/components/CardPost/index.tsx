import {
  Chip
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import Iconify from "../Iconify";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import * as React from "react";


export interface CardItemProps {
  id: string;
  title: string;
  icon: string;
  children?: readonly CardItemProps[];
  path: string;
  disabled?: boolean;
  expand?: boolean;
  is_dashboard?: boolean;
  is_show_count?: boolean;
  path_api_count?: string;
  count?: string;
}

interface MenuProps {
  item: any;
}

const CardItem = ({ item }: MenuProps) => {
  const theme = useTheme();

  useEffect(() => {
    (async () => {})();
  }, []);

  const handleCommentClick = () => {};

  return (
    <Card elevation={0} sx={{ border: "none", borderRadius: 0 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="favorites">
            <Iconify
              icon={"solar:star-outline"}
              sx={{
                width: 22,
                height: 22,
              }}
            />
          </IconButton>
        }
        title="Jassica"
      />

      <CardContent sx={{ padding: "0px 16px" }}>
        <Chip label="History" />
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          This impressive paella is a perfect party dish and a fun meal to cook
        </Typography>
        <Typography
          variant="body2"
          component={"p"}
          sx={{
            color: "text.secondary",
            width: "100%",
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            wordBreak: "break-all",
          }}
        >
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="comments" onClick={handleCommentClick}>
          <Iconify
            icon={"solar:chat-round-linear"}
            sx={{
              width: 22,
              height: 22,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              paddingLeft: "8px",
            }}
          >
            {`${32} Comments`}
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardItem;
