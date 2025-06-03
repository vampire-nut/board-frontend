import CardComment, { CommentsProps } from "@/src/components/CardComment";
import CardItem, { CardItemProps } from "@/src/components/CardPost";
import AddCommentsDialog from "@/src/components/Dialog/AddCommentsDialog";
import Loadding from "@/src/components/Loading";
import MainLayout from "@/src/layouts/MainLayout";
import {
  Box,
  Button,
  IconButton,
  List,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BlogInfo = () => {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoad] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<CardItemProps>();
  const [dataComment, setDataComment] = useState<CommentsProps>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [auth, setAuth] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const checkAddComment = async () => {
    const { encryptStorage } = await import("@/src/components/storage");
    const user = encryptStorage.getItem("username") || "";
    if (!!user) {
      handleOpenDialog();
      // if (isMobile) {
      //     handleOpenDialog();
      // } else {

      // }
      setAuth(true);
    } else {
      router.push("/singin");
      setAuth(false);
    }
  };

  const handlePostComment = async (values: CommentsProps) => {
    const { encryptStorage } = await import("@/src/components/storage");
    setLoad(true);
    await fetch("http://localhost:8081/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_id: encryptStorage.getItem("users_id"),
        post_id: data?.post_id,
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
          window.location.reload();
        }, 1000);
        console.log("Fetch operation finished.");
      });
  };

  async function fetchData(post_id: string) {
    try {
      setLoad(true);
      const res = await fetch(
        `http://localhost:8081/posts/find-one/${post_id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch post data");
      }
      const jsonData = await res.json();
      setData(jsonData?.data);
      setDataComment(jsonData?.data?.comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (router) {
          await fetchData(router?.query?.post_id as string);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router]);

  return (
    <Box sx={{ padding: "24px", backgroundColor: "white", height: "100dvh" }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <IconButton
          aria-label="back"
          onClick={() => {
            if (router) {
              router.back();
            }
          }}
        >
          <ArrowBackIcon
            sx={{
              color: theme.colors.green.main,
              backgroundColor: theme.colors.green.lighter,
              borderRadius: "50px",
              padding: "10px",
              width: "40px",
              height: "40px",
            }}
          />
        </IconButton>
        {data ? (
          <CardItem
            data={{ ...data, totalComments: dataComment?.length || 0 }}
            is_info={true}
          />
        ) : null}
        <Button
          onClick={checkAddComment}
          variant="outlined"
          sx={{
            backgroundColor: "inherit",
            height: 40,
            width: { xs: "fit-content" },
            color: theme.colors.success.main,
            borderRadius: "8px",
            borderColor: theme.colors.success.main,
          }}
        >
          Add Comments
        </Button>

        {dataComment && (
          <List sx={{ width: "100%", marginTop: "20px" }}>
            {dataComment?.map((d: CommentsProps) => (
              <CardComment key={d?.comment_id} data={{ ...d }} />
            ))}
          </List>
        )}
      </Stack>

      {isDialogOpen && (
        <AddCommentsDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handlePostComment}
        />
      )}

      <Loadding openLoading={loading} />
    </Box>
  );
};
BlogInfo.getLayout = (page: any) => (
  <MainLayout is_info={true}>{page}</MainLayout>
);

export default BlogInfo;
