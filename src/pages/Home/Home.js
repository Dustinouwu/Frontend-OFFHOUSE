import React from "react";
import "./Home.css";
import MultiActionAreaCard from "../../components/CardsInfo/Cards/CardsHome";
import Footer from "../../components/Layouts/Footer/Footer";
import SubscriptionBar from "../../components/SubscriptionBar/SubscriptionBar";
import SampleNextArrow from "../../components/CardsInfo/Carrusel/Carrusel";
import CardsSubscription from "../../components/CardsInfo/CardsSubscription";
import { Divider } from "@mui/material";

export const Home = () => {
    return (
        <div className="HomeContainer">

            <div >
                <SampleNextArrow />
                <CardsSubscription />
                <Divider sx={{mt: 5}}/>
                <MultiActionAreaCard />
                <Footer />          
            </div>
        </div>
    )
}

