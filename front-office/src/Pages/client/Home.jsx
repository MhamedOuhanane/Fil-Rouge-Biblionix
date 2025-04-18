import React from "react";
import useToken from "../../store/useToken";

const Home = () => {
    const TokenDecode = useToken((state) => state.TokenDecode);
    console.log(TokenDecode);
    
    return (
        <>
            <h1>
                wilcome to home
            </h1>
        </>
    );
}

export default Home;