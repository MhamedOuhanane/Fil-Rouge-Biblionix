import React from "react";
import useToken from "../../store/useToken";

const Home = () => {
    const { user } = useToken();
    console.log(user);
    
    return (
        <>
            <h1>
                wilcome to home
            </h1>
        </>
    );
}

export default Home;