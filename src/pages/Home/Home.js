import React from "react";
import "./Home.css";
import Cards from "../../components/Cards/Cards";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SubscriptionBar from "../../components/SubscriptionBar/SubscriptionBar";
const Home = () => {
    return (
        <div>
            <Header />
            <div >
                <SubscriptionBar />
                <Cards />
                <Footer />

            </div>


        </div>
    )
}

export default Home