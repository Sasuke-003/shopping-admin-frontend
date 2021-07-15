import React, { useState } from "react";
import "./Manual.css";
function Manual() {
    const [data, setData] = useState([
        {
            header: "Create account on GitHub.",
            footer1: "",
            footer2: "",
        },
        {
            header: "Login to your GitHub Account",
            footer1: "",
            footer2: "",
        },
        {
            header: "Click https://github.com/Sasuke-003/shopping-app-frontend to open shopping application repository",
            footer: "",
            footer2: "",
        },
        {
            header: "Fork the repository",
            footer1: "",
            footer2: "",
        },
        {
            header: "You will be redirected to this page after you fork the repository",
            footer1: "",
            footer2: "",
        },
        {
            header: "Create an account on Heroku.com",
            footer1: "",
            footer2: "",
        },
        {
            header: "Login to your heroku",
            footer1: "",
            footer2: "",
        },
        {
            header: "Create a new App",
            footer1: "",
            footer2: "",
        },
        {
            header: "Enter domain name",
            footer1: "",
            footer2: "",
        },
        {
            header: "Go to settings tab",
            footer1: "",
            footer2: "",
        },
        {
            header: "Scroll down and click add build pack",
            footer1: "",
            footer2: "",
        },
        {
            header: "Paste the build pack URL : https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz",
            footer1: "And click save",
            footer2: "",
        },
        {
            header: "Build pack should be successfully added",
            footer1: "",
            footer2: "",
        },

        {
            header: "Open Deploy tab Choose GitHub as a deployment method",
            footer1: "",
            footer2: "",
        },
        {
            header: "Scroll down and click Connect to GitHub",
            footer1: "",
            footer2: "",
        },
        {
            header: "Authorize Heroku to access GitHub",
            footer1: "",
            footer2: "",
        },
        {
            header: "Enter shopping-app-frontend as your repository name and click search and then connect",
            footer1: "",
            footer2: "",
        },

        {
            header: "Click on enable auto-deploy then deploy branch",
            footer1: "",
            footer2: "",
        },
        {
            header: "Your app should start deploying",
            footer1: "",
            footer2: "",
        },
        {
            header: "Your app was successfully deployed",
            footer1: "",
            footer2: "",
        },
        {
            header: "Scroll Up and click setting Tab",
            footer1: "",
            footer2: "",
        },
        {
            header: "On setting Tab click on Reveal Config Vars",
            footer1: "",
            footer2: "",
        },
        {
            header: "Type your environment variable",
            footer1: "KEY : REACT_APP_SHOP_ID",
            footer2: ` VALUE(your SHOP ID) : ${localStorage.getItem("shopID")}`,
        },
        {
            header: "Environment Variable Example",
            footer1: "KEY : REACT_APP_SHOP_ID",
            footer2: ` VALUE(your SHOP ID) : ${localStorage.getItem("shopID")}`,
        },
        {
            header: " In Settings Tab Scroll down to find you website URL",
            footer1: "",
            footer2: "",
        },
    ]);
    return (
        <div className='manual'>
            <div className='manual__top'>
                <h1 style={{ fontSize: "50px", textTransform: "uppercase" }}>Please follow the below steps to deploy your shopping application</h1>
                <h2 style={{ fontSize: "15px", marginTop: "5px" }}>
                    NOTE: You can deploy in any cloud platform, After successful deployment set the environment variable as given below.
                </h2>
                <h2 style={{ fontSize: "25px", marginTop: "18px", marginBottom: "25px" }}>
                    KEY : REACT_APP_SHOP_ID
                    <br /> VALUE : 64465467sd75sd16a54
                </h2>
                {data.map((dt, index) =>
                    index === 0 ? (
                        <div className='manual__steps'>
                            <h1>
                                Step {index + 1} : Create account on&nbsp;
                                <a href='https://github.com/signup?user_email=&source=form-home-signup' target='_blank'>
                                    GitHub
                                </a>
                                &nbsp;to open shopping application repository
                            </h1>
                            <img src={"/images/step" + (index + 1) + ".PNG"} alt='cannot load' />
                        </div>
                    ) : index === 1 ? (
                        <div className='manual__steps'>
                            <h1>
                                Step {index + 1} : Click{" "}
                                <a href='https://github.com/login' target='_blank'>
                                    Login
                                </a>{" "}
                                to your GitHub Account
                            </h1>
                            <img src={"/images/step" + (index + 1) + ".PNG"} alt='cannot load' />
                        </div>
                    ) : index === 2 ? (
                        <div className='manual__steps'>
                            <h1>
                                Step {index + 1} : Click{" "}
                                <a href='https://github.com/Sasuke-003/shopping-app-frontend' target='_blank'>
                                    https://github.com/Sasuke-003/shopping-app-frontend
                                </a>{" "}
                                to open shopping application repository
                            </h1>
                            <img src={"/images/step" + (index + 1) + ".PNG"} alt='cannot load' />
                        </div>
                    ) : index === 5 ? (
                        <div className='manual__steps'>
                            <h1>
                                Step {index + 1} : Create an account on{" "}
                                <a href='https://signup.heroku.com/login' target='_blank'>
                                    Heroku
                                </a>{" "}
                            </h1>
                            <img src={"/images/step" + (index + 1) + ".PNG"} alt='cannot load' />
                        </div>
                    ) : index === 6 ? (
                        <div className='manual__steps'>
                            <h1>
                                Step {index + 1} :{" "}
                                <a href='https://id.heroku.com/login' target='_blank'>
                                    Login
                                </a>{" "}
                                to your Heroku account
                            </h1>
                            <img src={"/images/step" + (index + 1) + ".PNG"} alt='cannot load' />
                        </div>
                    ) : (
                        <div className='manual__steps'>
                            <h1>
                                Step {index + 1} : {dt.header}
                            </h1>
                            <img src={"/images/step" + (index + 1) + ".PNG"} alt='cannot load' />
                            <h2>{dt.footer1}</h2>
                            <h2>{dt.footer2}</h2>
                        </div>
                    )
                )}
            </div>
            <div className='manual__bottom'></div>
        </div>
    );
}

export default Manual;
