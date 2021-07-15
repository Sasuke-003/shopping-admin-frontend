import React, { useState, useEffect } from "react";
import { ReactComponent as LandingIllustration } from "../../Svg/landing.svg";
import { ReactComponent as SlackLogo } from "../../Svg/SlackLogo.svg";
import { Link } from "react-router-dom";
import { ROUTER_LINKS } from "../../Router";
import { Reveal } from "react-text-reveal";
import "./Landing.css";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titlePlay: false,
            descPlay: false,
            btnPlay: false,
        };
    }
    componentDidMount() {
        setTimeout(
            function () {
                //Start the timer
                this.setState({ titlePlay: true }); //After 1 second, set render to true
            }.bind(this),
            100
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ descPlay: true }); //After 1 second, set render to true
            }.bind(this),
            300
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ btnPlay: true }); //After 1 second, set render to true
            }.bind(this),
            600
        );
    }
    componentDidUnMount() {
        this.setState({ titlePlay: false, descPlay: false, btnPlay: false });
    }
    render() {
        const { titlePlay, descPlay, btnPlay } = this.state;
        return (
            <div className='landing'>
                <div className='landing__left'>
                    <div className='landing__title'>
                        <SlackLogo className='landing__logo rotating' />
                        <h1>
                            E-SHOP
                            <div className={`landing__text-block ${!titlePlay ? "" : "landing__text-no-block"}`}></div>
                        </h1>
                    </div>
                    <h1 className='landing__desc'>
                        <Reveal canPlay={descPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                            A <span className='landing__desc-pink-word'>ECOMMERCE</span> WEBSITE BUILDER
                        </Reveal>
                    </h1>
                    {/* <div className='landing__btn' onMouseEnter={() => setPlay(true)} onMouseLeave={() => setPlay(false)}> */}
                    <Reveal canPlay={btnPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <Link to={ROUTER_LINKS.signIn}>
                            <div className='landing__btn'>LOGIN</div>
                        </Link>
                    </Reveal>
                </div>

                <div className='landing__right'>
                    <LandingIllustration />
                </div>
            </div>
        );
    }
}

export default Landing;
