import CardItem, { CardItemProps } from "@/src/components/CardPost";
import EditPostDialog, {
  PostsProps,
} from "@/src/components/Dialog/EditPostDialog";
import ListHead from "@/src/components/ListHead";
import Loadding from "@/src/components/Loading";
import MainLayout from "@/src/layouts/MainLayout";
import { Box, List, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";

const Blog = () => {
  const [loading, setLoad] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Array<CardItemProps>>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Community");

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onClickCreate = () => {
    setIsDialogOpen(true);
  };

  const onClickSearch = async () => {
    await fetchData();
  };

  const handleSubmit = async (values: PostsProps) => {
    const { encryptStorage } = await import("@/src/components/storage");
    setLoad(true);
    await fetch("http://localhost:8081/posts", {
      method: "POST",
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

  // async function fetchData() {
  //   try {
  //     const { encryptStorage } = await import("@/src/components/storage");
  //     const users_id = encryptStorage.getItem("users_id");
  //     const res = await fetch(
  //       `http://localhost:8081/posts/${encodeURIComponent(users_id)}`
  //     );
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch dashboard data");
  //     }
  //     const jsonData = await res.json();
  //     setData(jsonData?.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoad(false);
  //   }
  // }

  async function fetchData() {
    try {
      const { encryptStorage } = await import("@/src/components/storage");
      const users_id = encryptStorage.getItem("users_id") || undefined;
      setLoad(true);
      const api = "http://localhost:8081/posts/find-all";
      await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          search: search,
          ...(users_id && { users_id: users_id }),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setData(data?.data);
          return data;
        })
        .catch((error) => {
          setLoad(false);
          console.error("Fetch error:", error);
          throw error;
        })
        .finally(() => {
          setLoad(false);
          console.log("Fetch operation finished.");
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await fetchData();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (selectedCategory) {
          await fetchData();
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [selectedCategory]);

  useEffect(() => {}, [search]);

  useEffect(() => {}, [data]);

  return (
    <Box sx={{ padding: "24px" }}>
      <ListHead
        search={search}
        selectCategory={selectedCategory}
        setSearch={setSearch}
        handleClickCreate={onClickCreate}
        handleClickSearch={onClickSearch}
        handleCategoryChange={setSelectedCategory}
      />
      <List sx={{ width: "100%", marginTop: "20px" }}>
        {data?.map((d: CardItemProps, index: number) => (
          <CardItem
            key={d?.post_id}
            data={d}
            is_edit={d?.is_edit}
            is_delete={d?.is_delete}
          />
        ))}
      </List>
      {isDialogOpen ? (
        <EditPostDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={(values, actions) => {
            handleSubmit(values);
          }}
        />
      ) : null}
      <Loadding openLoading={loading} />
    </Box>
  );
};
Blog.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Blog;
