import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";
import { th } from "date-fns/locale";

interface UserProps {
  username: string;
}

export interface CommentsProps {
  [x: string]: any;
  comment_id?: string;
  post_id?: string;
  users_id?: string;
  users?: UserProps;
  comment?: string;
  commentTime?: Date;
}

interface Props {
  data: CommentsProps;
}

const CardComment = ({ data }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNowStrict(date, { addSuffix: true, locale: th });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
      <Avatar sx={{ width: 40, height: 40, mr: 1.5 }} src={""}></Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            {data.users?.username || ""}
          </Typography>
          {data.commentTime && (
            <Typography variant="caption" color="text.secondary">
              {getTimeAgo(data.commentTime)}
            </Typography>
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {data.comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardComment;
