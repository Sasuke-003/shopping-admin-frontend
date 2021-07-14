import React from "react";
import { withRouter } from "react-router-dom";
import { getPopup, validateEmail } from "../../util";
import { connect } from "react-redux";
import { setCurrentUserStatus } from "../../redux/userStatus/userStatus.actions";
import { api } from "../../server";
import "./SignUp.css";
import { ReactComponent as SignUpIllustration } from "../../Svg/signup.svg";
import { ReactComponent as SlackLogo } from "../../Svg/SlackLogo.svg";
import { Link } from "react-router-dom";
import { ROUTER_LINKS } from "../../Router";
import { Reveal } from "react-text-reveal";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailPlay: false,
            passPlay: false,
            rPassPlay: false,
            loginPlay: false,
            signUpPlay: false,
            dividerPlay: false,
            phonePlay: false,
            namePlay: false,
            email: "",
            pass: "",
            rPass: "",
            phone: "",
            name: "",
        };
    }
    handleSubmit = async () => {
        const { email, name, phone, pass, rPass } = this.state;
        if (name === "" || pass === "" || rPass === "" || phone === "") {
            getPopup("error", "FILL ALL THE FIELDS");
            return;
        }
        if (name.length < 4 || name.length > 16) {
            getPopup("error", "NAME MUST BE FROM 4 TO 16 CHARACTERS");
            return;
        }
        if (!validateEmail(email)) {
            getPopup("error", "ENTER VALID EMAIL ID");
            return;
        }
        if (phone.length !== 10) {
            getPopup("error", "PHONE NUMBER MUST BE 10 NUMBERS");
            return;
        }
        if (pass.length < 8 || pass.length > 16) {
            getPopup("error", "PASSWORD MUST BE FROM 8 TO 16 CHARACTERS");
            return;
        }
        if (pass !== rPass) {
            getPopup("error", "BOTH PASSWORDS MUST MATCH");
            return;
        }
        try {
            const Data = {
                name,
                email,
                pass,
                phone,
            };
            await api.user.signUp(Data);
            getPopup("success", "signed up successfully");
            this.props.history.pushState(ROUTER_LINKS.signIn);
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
    };
    componentDidMount() {
        setTimeout(
            function () {
                //Start the timer
                this.setState({ namePlay: true }); //After 1 second, set render to true
            }.bind(this),
            100
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ emailPlay: true }); //After 1 second, set render to true
            }.bind(this),
            300
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ phonePlay: true }); //After 1 second, set render to true
            }.bind(this),
            500
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ passPlay: true }); //After 1 second, set render to true
            }.bind(this),
            700
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ rPassPlay: true }); //After 1 second, set render to true
            }.bind(this),
            900
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ signUpPlay: true }); //After 1 second, set render to true
            }.bind(this),
            1100
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ dividerPlay: true }); //After 1 second, set render to true
            }.bind(this),
            1300
        );
        setTimeout(
            function () {
                //Start the timer
                this.setState({ loginPlay: true }); //After 1 second, set render to true
            }.bind(this),
            1500
        );
    }
    componentDidUnMount() {
        this.setState({ titlePlay: false, descPlay: false, btnPlay: false });
    }
    render() {
        const { emailPlay, passPlay, loginPlay, dividerPlay, signUpPlay, rPassPlay, phonePlay, namePlay, email, name, phone, pass, rPass } =
            this.state;
        return (
            <div className='sign-up'>
                <div className='sign-up__left'>
                    <Reveal canPlay={namePlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div class='wrap-input100 validate-input' data-validate='Please enter your name'>
                            <PersonIcon fontSize='large' />
                            <input
                                class='input100'
                                type='text'
                                name='name'
                                placeholder='Full Name'
                                value={name}
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                            />
                            <span class='focus-input100'></span>
                        </div>
                    </Reveal>
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
                    <Reveal canPlay={phonePlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div class='wrap-input100 validate-input' data-validate='Please enter your name'>
                            <PhoneEnabledIcon fontSize='large' />
                            <input
                                class='input100'
                                type='number'
                                name='phone'
                                placeholder='Phone Number'
                                value={phone}
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
                    <Reveal canPlay={rPassPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div class='wrap-input100 validate-input' data-validate='Please enter your name'>
                            <NoEncryptionIcon fontSize='large' />
                            <input
                                class='input100'
                                type='text'
                                name='rPass'
                                placeholder='Re-Enter Password'
                                value={rPass}
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                            />
                            <span class='focus-input100'></span>
                        </div>
                    </Reveal>
                    <Reveal canPlay={signUpPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div className='sign-up__btn' onClick={this.handleSubmit}>
                            CREATE ACCOUNT
                        </div>
                    </Reveal>
                    <Reveal canPlay={dividerPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <div className='sign-up__divider'>
                            <hr className='sign-up__divider-line-left' />
                            OR
                            <hr className='sign-up__divider-line-right' />
                        </div>
                    </Reveal>
                    <Reveal canPlay={loginPlay} ease={"cubic-bezier(0,0.4,0.4,1)"}>
                        <Link to={ROUTER_LINKS.signIn}>
                            <div className='sign-up__sign-in-btn sign-in__btn'>LOGIN</div>
                        </Link>
                    </Reveal>
                </div>

                <div className='sign-up__right'>
                    <div className='sign-up__title'>
                        <h1>SHOPIFY</h1>
                        <SlackLogo className='sign-up__logo rotating' />
                    </div>
                    <SignUpIllustration className='sign-up__illustration' />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUserStatus: (user) => dispatch(setCurrentUserStatus(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
