import React from "react";
import "./Home.css";
import MultiActionAreaCard from "../../components/CardsInfo/Cards/CardsHome";
import Footer from "../../components/Layouts/Footer/Footer";
import SubscriptionBar from "../../components/SubscriptionBar/SubscriptionBar";
import SampleNextArrow from "../../components/CardsInfo/Carrusel/Carrusel";

export const Home = () => {
    return (
        <div>

            <div >
                <SampleNextArrow />
                <SubscriptionBar />
                <MultiActionAreaCard />
                <Footer />          
            </div>
        </div>
    )
}

