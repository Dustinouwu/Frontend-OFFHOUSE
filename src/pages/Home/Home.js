import React from "react";
import "./Home.css";
import MultiActionAreaCard from "../../components/Cards/Cards";
import Footer from "../../components/Layouts/Footer/Footer";
import SubscriptionBar from "../../components/SubscriptionBar/SubscriptionBar";

export const Home = () => {
    return (
        <div>

            <div >
                <SubscriptionBar />
                <MultiActionAreaCard />
                <Footer />          
            </div>
        </div>
    )
}

