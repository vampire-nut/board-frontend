
import { Typography } from "@mui/material";

const Home = () => {

    return (
        <>
            <Typography variant="H1"> TEST 1 </Typography>
        </>
    );
};
Home.getLayout = (page: any) => <>{page}</>;

export default Home;
