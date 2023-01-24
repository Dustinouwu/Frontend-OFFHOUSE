import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style-prefix.css'

const Banner = () => {

    const navigate = useNavigate()
    return (
        <div class="banner">

            <div class="container">

                <div class="slider-container has-scrollbar">

                    <div class="slider-item">

                        <img src="https://assetspwa.liverpool.com.mx/assets/digital/landing/lineablanca/img/electro_02c_150822.jpg" alt="women's latest fashion sale" class="banner-img" />

                        <div class="banner-content">

                            <p class="banner-subtitle"></p>

                            <h2 class="banner-title">Publica tu producto totalmente gratis</h2>

                            <a class="banner-btn" onClick={() => navigate('/CreateProduct')}>Haz Click Aquí</a>

                        </div>

                    </div>

                    <div class="slider-item">

                        <img src="https://png.pngtree.com/thumb_back/fh260/background/20190727/pngtree-minimalistic-white-honeycomb-paper-cut-wind-business-background-image_285722.jpg" alt="modern sunglasses" class="banner-img" />

                        <div class="banner-content">

                            <p class="banner-subtitle">Suscríbete</p>

                            <h2 class="banner-title">Contrata nuestra suscripción </h2>

                            <p class="banner-text">
                                A tan solo <b>4.99</b>
                            </p>

                            <a href="#" class="banner-btn">Shop now</a>

                        </div>

                    </div>

                    {/* <div class="slider-item">

                        <img src="https://png.pngtree.com/thumb_back/fh260/background/20190727/pngtree-minimalistic-white-honeycomb-paper-cut-wind-business-background-image_285722.jpg" alt="new fashion summer sale" class="banner-img" />

                        <div class="banner-content">

                            <p class="banner-subtitle">Sale Offer</p>

                            <h2 class="banner-title">New fashion summer sale</h2>

                            <p class="banner-text">
                                starting at &dollar; <b>29</b>.99
                            </p>

                            <a href="#" class="banner-btn">Shop now</a>

                        </div>

                    </div> */}

                </div>

            </div>

        </div>
    )
}

export default Banner