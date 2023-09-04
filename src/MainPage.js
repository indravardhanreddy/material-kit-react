import React, { Component } from "react";
import { Button } from 'primereact/button'
import { Link } from '@mui/material';
import { Link as RouterLink, Route } from 'react-router-dom';
import SideNavBar from "./theme/Sidebar";
// import Banner from "/assets/illustrations/illustration_login.png";
import Banner2 from "./assets/images/02.jpg";
import Banner3 from "./assets/images/03.jpg";

import Image4 from "./assets/images/1.png";
import Image5 from "./assets/images/2.png";
import Image6 from "./assets/images/3.png";
import Image7 from "./assets/images/4.png";

export default function MainPage() {
    return (
        <div>

            <section className="cid-rOLoYFuEWo">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-12">
                        <div className="card  text-center">
                            <div className="content">
                                <h1 className="mbr-section-title mbr-bold pb-3 mbr-fonts-style display-1">
                                    The Actuals
                                </h1>
                                <p className="mbr-text pb-3 mbr-semibold mbr-fonts-style display-7">
                                    At TheActuals , we empower businesses and investors with cutting-edge financial analytics solutions.
                                </p>
                                <div className="mbr-section-btn pb-5">
                                    <a
                                        className="btn btn-sm btn-primary display-4 m-2"
                                        href="/signup"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Sign up
                                    </a>
                                    <a
                                        className="btn btn-sm btn-black-outline display-4 m-2"
                                        href="https://indravardhan.com"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Learn more
                                    </a>
                                </div>
                                {/* <img src='/assets/illustrations/illustration_login.png' alt="TheActuals" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="info04 cid-rOM7mCDrl7">
                <div className="container align-items-left">
                    <div className="row justify-content-center">
                        <h1 className="mbr-section-title mbr-bold mbr-fonts-style display-1">
                            Get Started with your Analytics.
                        </h1>
                        <p className="mbr-text pb-3 mbr-semibold mbr-fonts-style display-1">
                            Start growing your business, We help you do it.
                            <a className="text-primary" href='/signup' style={{ fontWeight: 'normal' }}>
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </section>
            <section className="cid-rOM5I4lxla">
                <div className="container">
                    <div className="row">
                        <div className="card-wrapper text-center">
                            <div className="card-box align-center">
                                <span className="mbr-iconfont mobi-mbri-cash mobi-mbri" />
                                <h4 className="card-title align-center mbr-semibold mbr-white mbr-fonts-style display-2">
                                    <strong>Live Data & Analytics For you</strong>
                                </h4>
                                <p className="mbr-text pb-3 mbr-white mbr-semibold mbr-fonts-style display-7">
                                    With Analytics, predict the future of your business and make better decisions.
                                </p>

                                <div className="link-wrap">
                                    <h5 className="link mbr-bold mbr-black mbr-fonts-style display-4">
                                        <a className="text-white" href='/signup'>
                                            Learn more
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-wrapper text-center">
                            <div className="card-box align-center">
                                <span className="mbr-iconfont mobi-mbri-protect mobi-mbri" />
                                <h4 className="card-title align-center mbr-semibold mbr-white mbr-fonts-style display-2">
                                    <strong>Security</strong>
                                </h4>
                                <p className="mbr-text pb-3 mbr-semibold mbr-white mbr-fonts-style display-7">
                                    Your Data is safe with us. We do it for you.
                                </p>

                                <div className="link-wrap">
                                    <h5 className="link mbr-bold mbr-black mbr-fonts-style display-4">
                                        <a className="text-white" href="/signup">
                                            Learn more
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cid-rOM7DTApUY">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="card-wrapper">
                            <div className="card-wrapper text-center">
                                <h4 className="card-title text-center mbr-semibold pb-3 mbr-black mbr-fonts-style display-1">
                                    <strong>Focus on building your Portfolio.</strong>
                                </h4>
                                <p className="mbr-text pb-3 mbr-bold mbr-grey mbr-fonts-style display-7">
                                    With Risk Management and Quick Response, we help you to grow your business.
                                </p>

                                <div className="link-wrap">
                                    <h5 className="link mbr-bold mbr-black mbr-fonts-style display-7">
                                        <div className="text-primary">
                                            View all our features
                                        </div>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div className="grid grid-nogutter surface-0 text-800" >
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                        <span className="block text-6xl font-bold mb-1">Manage your <span style={{ fontFamily: 'revert-layer' }}>Portfolio</span></span>
                        <div className="text-6xl text-primary font-normal mb-3">Live Analytics & Recommendations</div>
                        <p className="mt-0 mb-4 text-700 line-height-3">One stop Solution for all your financial problems.Visit <Link to='/signup' style={{ fontWeight: 'Bold', }} component={RouterLink}>Signup</Link> </p>

                        <Button label="Learn More" type="button" className="mr-3 p-button-raised" />
                        <Button label="Live Demo" type="button" className="p-button-outlined" />
                    </section>
                </div>
                <div className="col-12 md:col-6 overflow-hidden">
                    <img src='/assets/illustrations/illustration_login2.png' alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                </div>
            </div> */}


            <div className=" text-center mbr-semibold pb-3 mbr-white mbr-fonts-style" style={{ backgroundColor: 'black'}}>
                <div className=" font-bold text-6xl mb-4 mbr-white text-center"  style={{ paddingTop:'50px' }}>Pricing Plans</div>
                <div className="text-300 text-xl mb-6 text-center line-height-3">Get Started with your plan right now.We could help you with it. Contact our Team.</div>

                <div className="grid">
                    <div className="col-12 lg:col-4">
                        <div className="p-3 h-full">
                            <div className="mbr-white  h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                <div className=" font-medium text-xl mb-2">Basic</div>
                                <div className="text-300">Plan description</div>
                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <div className="flex align-items-center">
                                    <span className="font-bold text-2xl text-100">$0</span>
                                    <span className="ml-2 font-medium text-300">per month</span>
                                </div>
                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <ul className="list-none p-0 m-0 flex-grow-1">
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>All Basic Features</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>Analytics</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>No Support</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>One Month Free</span>
                                    </li>
                                </ul>
                                <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                                <Button label="Buy Now" className="p-3 w-full mt-auto" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 lg:col-4">
                        <div className="p-3 h-full">
                            <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                <div className="text-100 font-medium text-xl mb-2">Premium</div>
                                <div className="text-300">Plan description</div>
                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <div className="flex align-items-center">
                                    <span className="font-bold text-2xl text-100">$9</span>
                                    <span className="ml-2 font-medium text-300">per month</span>
                                </div>
                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <ul className="list-none p-0 m-0 flex-grow-1">
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>24/7 Support</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>Analytics & Live Tracking</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>Portfolio Suggestions</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>Publish Articles</span>
                                    </li>
                                </ul>
                                <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <Button label="Buy Now" className="p-3 w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 lg:col-4">
                        <div className="p-3 h-full">
                            <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                                <div className="text-100 font-medium text-xl mb-2">Enterprise</div>
                                <div className="text-300">Plan description</div>
                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <div className="flex align-items-center">
                                    <span className="font-bold text-2xl text-100">$19</span>
                                    <span className="ml-2 font-medium text-300">per month</span>
                                </div>
                                <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <ul className="list-none p-0 m-0 flex-grow-1">
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>All Premium Features</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>Quick Response</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>Risk Management</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-green-500 mr-2" />
                                        <span>Learning Modules</span>
                                    </li>
                                </ul>
                                <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                <Button label="Buy Now" className="p-3 w-full" style={{ backgroundColor: '#6366F1' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className="cid-rOMaPAY8vN">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="card col-12 col-md-12 col-lg-6">
                            <div className="card-wrapper">
                                <div className="card-box text-left">
                                    <h4 className="card-title text-left mbr-semibold pb-3 mbr-black mbr-fonts-style display-1">
                                        <strong>Why partner with us?</strong>
                                    </h4>
                                    <p className="mbr-text pb-3 mbr-regular mbr-black mbr-fonts-style display-7">
                                        <div>
                                        📊 Data Analysis: Our Product leverages state-of-the-art tools and techniques to extract key insights from your financial data.
                                        </div>
                                        <div>
                                            📈 Predictive Modeling: We help you understand customer behavior enabling you to make strategic choices.
                                        </div>

                                        <div>
                                        📉 Risk Management: We offer risk assessment strategies to mitigate financial uncertainties and optimize your portfolio.
                                        </div>
                                        <div>
                                        💡 Customized Dashboards: Monitor key performance indicators, track financial metrics, and make decisions with ease.
                                        </div>
                                        🌐 Global Market Insights: Stay informed about global market trends, pointers with our in-depth research and analysis.
                                    </p>

                                    <div className="link-wrap">
                                        <h5 className="link mbr-bold mbr-black mbr-fonts-style display-7">
                                            <div>Become a partner</div>

                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cid-rOM5rKjpOn">
                <div className="container">
                    <div className="row">
                        <div className="wrapper text-left">
                            <h4 className="card-title mbr-semibold mbr-white mbr-fonts-style display-5">
                                <strong>A branded experience</strong>
                            </h4>

                            <p className="mbr-text pb-3 mbr-white mbr-semibold mbr-fonts-style display-4">
                            Ready to embark on a journey of financial excellence? Partner with us and gain the competitive edge you need in today's dynamic financial world. Contact us today to learn more about how [Your Company Name] can elevate your financial strategies and risk management practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cid-rOM5x06CUO">
                <div className="container">
                    <div className="row">

                        <div className="wrapper align-left">
                            <h4 className="card-title mbr-semibold mbr-white mbr-fonts-style display-5">
                                <strong>Our Word</strong>
                            </h4>

                            <p className="mbr-text pb-3 mbr-white mbr-semibold mbr-fonts-style display-4">
                            Ready to take your financial strategies to the next level? Contact Financial Analytics Experts today to learn more about how our analytics solutions can drive success for your business or investment portfolio.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cid-rOM5OI4pFc">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-lg-12">
                            <h2 className="mbr-section-title main-title mbr-fonts-style pb-5 text-center mbr-black display-2">
                                <strong>Our Features</strong>
                            </h2>
                        </div>
                        <div className="card-wrapper mbr-flex">
                            <div className="img-wrapper text-center">
                                <img src={Image4} alt="Actuals" />
                            </div>
                            <div className="card-box text-center">
                                <h4 className="card-title align-center mbr-semibold mbr-fonts-style display-5">
                                    <strong>COMFORT</strong>
                                </h4>
                                <p className="mbr-text mbr-semibold mbr-fonts-style display-4">
                                    Easy to Use and Flexible UI 
                                </p>
                                <div className="link-wrap">
                                    <h5 className="link mbr-bold mbr-black mbr-fonts-style display-4">
                                        <div className="text-primary">
                                            Learn more
                                        </div>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper mbr-flex">
                            <div className="img-wrapper text-center">
                                <img src={Image5} alt="Mobirise" />
                            </div>
                            <div className="card-box text-center">
                                <h4 className="card-title align-center mbr-semibold mbr-fonts-style display-5">
                                    <strong>AI ENABLED</strong>
                                </h4>
                                <p className="mbr-text mbr-semibold mbr-fonts-style display-4">
                                    With AI, witness the power of Analytics
                                </p>
                                <div className="link-wrap">
                                    <h5 className="link mbr-bold mbr-black mbr-fonts-style display-4">
                                        <div className="text-primary">
                                            Learn more
                                        </div>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper mbr-flex">
                            <div className="img-wrapper text-center">
                                <img src={Image6} alt="Mobirise" />
                            </div>
                            <div className="card-box text-center">
                                <h4 className="card-title align-center mbr-semibold mbr-fonts-style display-5">
                                    <strong>UPDATES</strong>
                                </h4>
                                <p className="mbr-text mbr-semibold mbr-fonts-style display-4">
                                    Fastest updates regarding financial Information
                                </p>
                                <div className="link-wrap">
                                    <h5 className="link mbr-bold mbr-black mbr-fonts-style display-4">
                                        <div className="text-primary">
                                            Learn more
                                        </div>
                                    </h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="cid-rOM5rKjpOn" style={{paddingBottom:'150px'}}>
                <div className="container text-center">
                        <h1 className="text-100 mbr-section-title mbr-bold pb-3 mbr-fonts-style display-5">
                            Can't find what you're looking for? Please contact our
                            support, for help.
                        </h1>

                        <div className="mbr-section-btn">
                            <a
                                className="btn btn-sm btn-primary-outline display-4"
                                href="https://indravardhan.com/signup"
                                style={{textDecoration:'NONE'}}
                            >
                                Contact us
                            </a>
                        </div>
                </div>
            </section>
        </div >
    );
}
