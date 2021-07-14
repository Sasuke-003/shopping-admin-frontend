import React from "react";
import Category from "../../Components/Category/Category";
import ProductHomeView from "../../Components/ProductHomeView/ProductHomeView";
import "./Home.css";

function Home() {
    return (
        <div className='home'>
            <Category />
            <img className='banner' src='/images/winter-banner.jpg' alt='cannot load' />
            <h1 className='product-home-view-title'>PRODUCTS ON SALE</h1>
            <ProductHomeView key='sale' classKey='sale' />
            <h1 className='product-home-view-title'>RECOMMENDED PRODUCTS</h1>
            <ProductHomeView key='recent' classKey='recent' />
            <h1 className='product-home-view-title'>MOST POPULAR PRODUCTS</h1>
            <ProductHomeView key='searched' classKey='searched' />
        </div>
    );
}

export default Home;
