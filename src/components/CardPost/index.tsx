import { Chip, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Iconify from "../Iconify";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import * as React from "react";
import DeleteConfirmationDialog from "../Dialog/DeletePostDialog";
import EditPostDialog, { PostsProps } from "../Dialog/EditPostDialog";
import Loadding from "../Loading";
import { useRouter } from "next/router";

interface UserProps {
  username: string;
}

export interface CardItemProps {
  post_id?: string;
  category?: string;
  title?: string;
  content?: Text;
  users?: UserProps;
  totalComments?: number;
  is_edit?: boolean;
  is_delete?: boolean;
}

interface Props {
  data: CardItemProps;
  is_edit?: boolean;
  is_delete?: boolean;
  is_favorites?: boolean;
  is_info?: boolean;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const CardItem = ({
  data,
  is_edit = false,
  is_delete = false,
  is_favorites = false,
  is_info = false,
}: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const handleCommentClick = () => {
    if (router) {
      router.push({
        pathname: `${router.pathname}/info`,
        query: {
          post_id: `${encodeURIComponent(data?.post_id || "")}`,
        },
      });
    }
  };

  const [loading, setLoad] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteConfirm();
    handleCloseDeleteConfirm();
  };

  const handleSubmit = async (values: PostsProps) => {
    const { encryptStorage } = await import("@/src/components/storage");
    setLoad(true);
    await fetch("http://localhost:8081/posts", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_id: encryptStorage.getItem("users_id"),
        ...values,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data: ==> ", data);
        handleCloseDialog();
        return data;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        throw error;
      })
      .finally(() => {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
        window.location.reload();
        console.log("Fetch operation finished.");
      });
  };

  const deleteConfirm = async () => {
    setLoad(true);
    await fetch(
      `http://localhost:8081/posts/${encodeURIComponent(data?.post_id || "")}`,
      {
        method: "DELETE",
      }
    )
      .then((data) => {
        return data;
      })
      .catch((error) => {
        setLoad(false);
        console.error("Fetch error:", error);
        throw error;
      })
      .finally(() => {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
        window.location.reload();
        console.log("Fetch operation finished.");
      });
  };

  return (
    <Card
      elevation={0}
      sx={{ border: "none", borderRadius: "12px", marginBottom: "4px" }}
    >
      <CardHeader
        avatar={
          <>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={is_info ? "dot" : "standard"}
            >
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {/* {data.users?.profile} */}
              </Avatar>
            </StyledBadge>
          </>
        }
        action={
          <>
            <Stack direction="row" spacing={0}>
              {is_edit ? (
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    handleOpenDialog();
                  }}
                >
                  <Iconify
                    icon={"iconamoon:edit-light"}
                    sx={{
                      width: 22,
                      height: 22,
                    }}
                    color={theme.colors.green.light}
                  />
                </IconButton>
              ) : null}
              {is_delete ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    handleDeleteClick();
                  }}
                >
                  <Iconify
                    icon={"fluent:delete-24-regular"}
                    sx={{
                      width: 22,
                      height: 22,
                    }}
                    color={theme.colors.green.light}
                  />
                </IconButton>
              ) : null}
              {is_favorites ? (
                <IconButton aria-label="favorites">
                  <Iconify
                    icon={"solar:star-outline"}
                    sx={{
                      width: 22,
                      height: 22,
                    }}
                    color={theme.colors.green.light}
                  />
                </IconButton>
              ) : null}
            </Stack>
          </>
        }
        title={data.users?.username}
        titleTypographyProps={{ fontSize: "28px" }}
      />

      <CardContent sx={{ padding: "0px 16px" }}>
        <Chip
          label={`${data?.category || ""}`}
          sx={{ color: theme.colors.grey.light }}
        />
        <Typography
          variant="h5"
          sx={{
            color: theme.colors.black.main,
            fontWeight: 600,
            marginTop: "16px",
            marginBottom: "10px",
          }}
        >
          {`${data?.title || ""}`}
        </Typography>
        <Typography
          variant="body2"
          component={"p"}
          sx={{
            color: "text.secondary",
            width: "100%",
            fontSize: '12px',
            ...(!is_info && {
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              wordBreak: "break-all",
            }),
          }}
        >
          {`${data?.content || ""}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="comments" onClick={handleCommentClick}>
          <Iconify
            icon={"solar:chat-round-linear"}
            sx={{
              width: 22,
              height: 22,
              color: theme.colors.grey.light,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: theme.colors.grey.light,
              paddingLeft: "8px",
            }}
          >
            {`${data.totalComments || 0} Comments`}
          </Typography>
        </IconButton>
      </CardActions>

      <EditPostDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={(values: any, actions: any) => {
          handleSubmit(values);
        }}
        data={data}
        dialogTitle="Edit Post"
      />

      <DeleteConfirmationDialog
        open={isDeleteConfirmOpen}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
      />
      {loading && <Loadding openLoading={loading} />}
    </Card>
  );
};

export default CardItem;
