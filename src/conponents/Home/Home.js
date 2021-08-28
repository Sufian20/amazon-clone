import React from 'react';
import Product from '../Product/Product';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg" alt="" />

                <div className="home__row">
                    <Product id="321" title="Easy returns" price={10.99} rating={4} image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg" />

                    <Product id="322" title="The lean startup" price={19.99} rating={5} 
                    image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Returns_1x._SY304_CB432774714_.jpg" />


                    {/* Product */}
                </div>
                <div className="home__row">
                    <Product id="323" title="Oculus" price={79.99} rating={5} 
                    image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg" />

                    <Product id="324" title="Shop Laptops & Tablets" price={100.00} rating={5} 
                    image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg" />

                    <Product id="325" title="Explore home bedding" price={65.80} rating={4} 
                    image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_HomeBedding_Single_Cat_1x._SY304_CB418596953_.jpg" />
                </div>
                <div className="home__row">
                    <Product id="326" title="BTCL 40-inch 1080p Smart LED Roku TV 
                " price={77.80} rating={5} 
                image="https://m.media-amazon.com/images/I/81hXnnQz6TL._AC_UY218_.jpg" />
                </div>
            </div>
        </div>
    );
};

export default Home;