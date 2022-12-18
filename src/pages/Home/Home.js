import React from "react";
import "./Home.css";
import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import SubscriptionBar from "../../components/SubscriptionBar/SubscriptionBar";

const Home = () => {
    return (
        <div>

            <div >
                <SubscriptionBar />
                <Cards />
                <Footer />
                
            </div>


        </div>
    )
}

export default Home