import React from "react";
import { withRouter } from "react-router-dom";
import { getPopup, validateEmail } from "../../util";
import { connect } from "react-redux";
import { setCurrentUserStatus } from "../../redux/userStatus/userStatus.actions";
import { api } from "../../server";
import "./SignIn.css";
import { ReactComponent as SignInIllustration } from "../../Svg/login.svg";
import { ReactComponent as SlackLogo } from "../../Svg/SlackLogo.svg";
import { Link } from "react-router-dom";
import { ROUTER_LINKS } from "../../Router";
import { Reveal } from "react-text-reveal";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailPlay: false,
            passPlay: false,
            loginPlay: false,
            signUpPlay: false,
            dividerPlay: false,
            email: "robin@gmail.com",
            pass: "12345678",
        };
    }
    handleSubmit = async () => {
        const { email, pass } = this.state;
        if (!validateEmail(email)) {
            getPopup("error", "ENTER VALID EMAIL ID");
            return;
        }
        if (pass.length < 8 || pass.length > 16) {
            getPopup("error", "PASSWORD MUST BE FROM 8 TO 16 CHARACTERS");
            return;
        }
        try {
            const Data = {
                email,
                pass,
            };
            const res = await api.user.signIn(Data);

            if (res.typ === "a") {
                this.props.setCurrentUserStatus(["isAdmin", true]);
            } else {
                this.props.setCurrentUserStatus(["isAdmin", false]);
            }
            localStorage.setItem("email", email);
            localStorage.setItem("shopID", res.shopID);
            this.props.setCurrentUserStatus(["isLoggedIn", true]);
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };
    componentDidMount() {
        setTimeout(
            function () {
                //Start the timer
                this.setState({ emailPlay: true }); //After 1 second, set render to true
            }.bind(this),
            100
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ passPlay: true }); //After 1 second, set render to true
            }.bind(this),
            300
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ loginPlay: true }); //After 1 second, set render to true
            }.bind(this),
            500
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ dividerPlay: true }); //After 1 second, set render to true
            }.bind(this),
            700
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ signUpPlay: true }); //After 1 second, set render to true
            }.bind(this),
            900
        );
    }
    componentDidUnMount() {
        this.setState({ titlePlay: false, descPlay: false, btnPlay: false });
    }
    render() {
        const { emailPlay, passPlay, loginPlay, dividerPlay, signUpPlay, email, pass } = this.state;
        return (
            <div className='sign-in'>
                <div className='sign-in__left'>
                    <Reveal canPlay={emailPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div class='wrap-input100 validate-input' data-validate='Please enter your name'>
                            <EmailIcon fontSize='large' />
                            <input
                                class='input100'
                                type='text'
                                name='email'
                                placeholder='Email Id'
                                value={email}
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                            />
                            <span class='focus-input100'></span>
                        </div>
                    </Reveal>
                    <Reveal canPlay={passPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div class='wrap-input100 validate-input' data-validate='Please enter your name'>
                            <VpnKeyIcon fontSize='large' />
                            <input
                                class='input100'
                                type='password'
                                name='pass'
                                placeholder='Password'
                                value={pass}
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                            />
                            <span class='focus-input100'></span>
                        </div>
                    </Reveal>
                    <Reveal canPlay={loginPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div className='sign-in__btn' onClick={this.handleSubmit}>
                            LOGIN
                        </div>
                    </Reveal>
                    <Reveal canPlay={dividerPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div className='sign-in__divider'>
                            <hr className='sign-in__divider-line-left' />
                            OR
                            <hr className='sign-in__divider-line-right' />
                        </div>
                    </Reveal>
                    <Reveal canPlay={signUpPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <Link to={ROUTER_LINKS.signUp}>
                            <div className='sign-in__sign-up-btn sign-in__btn'>CREATE ACCOUNT</div>
                        </Link>
                    </Reveal>
                </div>

                <div className='sign-in__right'>
                    <div className='sign-in__title'>
                        <h1>SHOPIFY</h1>
                        <SlackLogo className='sign-in__logo rotating' />
                    </div>
                    <SignInIllustration className='sign-in__illustration' />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUserStatus: (user) => dispatch(setCurrentUserStatus(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
