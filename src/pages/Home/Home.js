import React, { useState } from "react";
import "./Home.css";
import MultiActionAreaCard from "../../components/CardsInfo/Cards/CardsHome";
import Footer from "../../components/Layouts/Footer/Footer";
import SubscriptionBar from "../../components/SubscriptionBar/SubscriptionBar";
import SampleNextArrow from "../../components/CardsInfo/Carrusel/Carrusel";
import CardsSubscription from "../../components/CardsInfo/CardsSubscription";
import Banner from "../../components/CardsInfo/Banner/Banner";
import { Divider } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Home = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1000);

    if (loading) {
        return <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={80} sx={{color: '#FF9901'}} />
        </Box>
    }

    return (
        <div className="HomeContainer">
            <div>
                <Banner />
                {/* <CardsSubscription /> */}
                <SampleNextArrow />

                <Divider sx={{ mt: 5 }} />
                <MultiActionAreaCard />
                <Footer />
            </div>
        </div>
    );
};