
import CardItem from "@/src/components/CardPost";
import MainLayout from "@/src/layouts/MainLayout";
import { Typography } from "@mui/material";

const Home = () => {

    return (
        <>
            <CardItem item={{}}></CardItem>
        </>
    );
};
Home.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Home;
