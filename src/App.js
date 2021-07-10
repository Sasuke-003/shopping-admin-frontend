import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Navigation from "./Pages/Navigation/Navigation";
import Landing from "./Pages/Landing/Landing";
import { ROUTER_LINKS } from "./Router";
import { throwMsg } from "./util";
import { openSnackbar } from "./redux/snackbar/snackbar.actions";
import { getMsgYN } from "./util";
import { ReactComponent as SlackLogo } from "./Svg/SlackLogo.svg";
import { api } from "./server";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BusinessIcon from "@material-ui/icons/Business";
import StoreIcon from "@material-ui/icons/Store";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: false,
            open: null,

            color1: {
                primary: "#f1faee",
                secondary: "#1d3557",
                border: "#457b9d",
                borderSecondary: "#a8dadc",
            },
            color2: {
                primary: "#edf2f4",
                secondary: "#2b2d42",
                border: "#d90429",
                borderSecondary: "#ef233c",
            },
            color3: {
                primary: "#f2f2f2",
                secondary: "#040506",
                border: "#7c7c7c",
                borderSecondary: "#eeeeee",
            },
            currentColor: {},
            name: "",
            address: "",
            bgc: "#ffffff",
            tc: "#000000",
            bc: "#EAE8E4",
            bsc: "#707070",
        };
    }
    componentDidMount() {
        // const color1 = {
        //     primary: "#f1faee",
        //     secondary: "#1d3557",
        //     border: "#457b9d",
        //     borderSecondary: "#a8dadc",
        // };
        // const color2 = {
        //     primary: "#edf2f4",
        //     secondary: "#2b2d42",
        //     border: "#d90429",
        //     borderSecondary: "#ef233c",
        // };
        // const color3 = {
        //     primary: "#f2f2f2",
        //     secondary: "#040506",
        //     border: "#7c7c7c",
        //     borderSecondary: "#7c7c7c",
        // };
        const { primary, secondary, border, borderSecondary } = this.state.color3;
        document.documentElement.style.setProperty("--primary", primary);
        document.documentElement.style.setProperty("--secondary", secondary);
        document.documentElement.style.setProperty("--border", border);
        document.documentElement.style.setProperty("--borderSecondary", borderSecondary);
        this.setState({ currentColor: { primary, secondary, border, borderSecondary } });
    }
    handleSaveColor = () => {
        const { bgc, tc, bc, bsc } = this.state;
    };
    handleColorChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { isLoggedIn, isAdmin } = this.props.adminStatus;
        const { snackbarStatus, openSnackbar, history } = this.props;
        const { isHover, name, address, bgc, tc, bc, bsc, open } = this.state;
        const { primary, secondary, border, borderSecondary } = this.state.currentColor;
        return (
            <div className='App'>
                {console.log("1")}
                <div
                    className={`app__left ${isHover ? "app__left-hover" : ""} ${
                        history.location.pathname === ROUTER_LINKS.signIn ||
                        history.location.pathname ||
                        ROUTER_LINKS.signUp ||
                        ROUTER_LINKS.landingPage
                            ? "app__full-width"
                            : ""
                    }`}>
                    <Header isHover={isHover} />
                    <div className='App__page'>
                        <Switch>
                            <Route
                                exact
                                path={ROUTER_LINKS.landingPage}
                                render={() => (!isLoggedIn ? <Landing /> : <Redirect to={ROUTER_LINKS.home} />)}
                            />
                            <Route
                                exact
                                path={ROUTER_LINKS.home}
                                render={() => (isLoggedIn ? <Home /> : <Redirect to={ROUTER_LINKS.landingPage} />)}
                            />
                            <Route exact path={ROUTER_LINKS.signIn} render={() => (isLoggedIn ? <Redirect to={ROUTER_LINKS.home} /> : <SignIn />)} />
                            <Route exact path={ROUTER_LINKS.signUp} render={() => (isLoggedIn ? <Redirect to={ROUTER_LINKS.home} /> : <SignUp />)} />
                            <Route
                                exact
                                path={ROUTER_LINKS.navigation}
                                render={() => (isLoggedIn ? <Navigation /> : <Redirect to={ROUTER_LINKS.landingPage} />)}
                            />
                        </Switch>

                        {throwMsg(
                            snackbarStatus.open,
                            () => openSnackbar({ open: false, status: "", msg: "" }),
                            snackbarStatus.status,
                            snackbarStatus.msg
                        )}
                        {getMsgYN(snackbarStatus.popupMsg, snackbarStatus.popupYesFunc)}
                    </div>
                </div>
                {history.location.pathname !== ROUTER_LINKS.signIn &&
                    history.location.pathname !== ROUTER_LINKS.signUp &&
                    history.location.pathname !== ROUTER_LINKS.landingPage && (
                        <div
                            className={`app__right ${isHover ? "app__right-hover" : ""}`}
                            onMouseEnter={() => this.setState({ isHover: true })}
                            onMouseLeave={() => {
                                this.setState({ isHover: false });
                                this.handleSaveColor();
                            }}>
                            {isHover ? (
                                <div className='app__right-large'>
                                    <div className='app__right-header'>
                                        <PopupState variant='popover' popupId='demo-popup-menu'>
                                            {(popupState) => (
                                                <React.Fragment>
                                                    <MoreVertIcon
                                                        // onClick={(e) => this.setState({ open: e.currentTarget })}
                                                        {...bindTrigger(popupState)}
                                                        style={{ cursor: "pointer", fontSize: "30px" }}
                                                    />
                                                    <Menu {...bindMenu(popupState)}>
                                                        <MenuItem
                                                            key={"menu1"}
                                                            onClick={() => {
                                                                api.token.clearToken();
                                                                this.setState({ isHover: false });
                                                            }}>
                                                            Log Out
                                                        </MenuItem>
                                                    </Menu>
                                                </React.Fragment>
                                            )}
                                        </PopupState>{" "}
                                        <div className='app__header-logo-container'>
                                            <h1>SHOPIFY</h1>
                                            <SlackLogo className='app__header-logo rotating' />
                                        </div>
                                    </div>
                                    <div className='app__right-basic-input'>
                                        <div class='wrap-input100 validate-input' data-validate='Please enter your name'>
                                            <StoreIcon fontSize='large' />
                                            <input
                                                class='input100'
                                                type='text'
                                                name='name'
                                                placeholder='Shop Name'
                                                value={name}
                                                onChange={(e) => this.setState({ name: e.target.value })}
                                            />
                                            <span class='focus-input100'></span>
                                        </div>{" "}
                                        <div class='wrap-input100 validate-input' data-validate='Please enter your name'>
                                            <BusinessIcon fontSize='large' />
                                            <input
                                                class='input100'
                                                type='text'
                                                name='address'
                                                placeholder='Shop Address'
                                                value={address}
                                                onChange={(e) => this.setState({ address: e.target.value })}
                                            />
                                            <span class='focus-input100'></span>
                                        </div>
                                    </div>
                                    <hr className='app__right-divider' />
                                    <div className='app__right-color-input-container'>
                                        <h1>Select Colors</h1>
                                        <div className='app__right-color-input'>
                                            <input type='color' value={bgc} name='bgc' id='bgc' onChange={this.handleColorChange} />
                                            Background Color
                                        </div>
                                        <div className='app__right-color-input'>
                                            <input type='color' value={tc} name='tc' id='tc' onChange={this.handleColorChange} />
                                            Text Color
                                        </div>
                                        <div className='app__right-color-input'>
                                            <input type='color' value={bc} name='bc' id='bc' onChange={this.handleColorChange} />
                                            Border Color
                                        </div>
                                        <div className='app__right-color-input'>
                                            <input type='color' value={bsc} name='bsc' id='bsc' onChange={this.handleColorChange} />
                                            Border Secondary Color
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='app__right-shrink'>
                                    <SlackLogo className='app__slack-logo rotating' />
                                    <div className='app__colors' style={{ background: primary }}></div>
                                    <div className='app__colors' style={{ background: secondary }}></div>
                                    <div className='app__colors' style={{ background: border }}></div>
                                    <div className='app__colors' style={{ background: borderSecondary }}></div>
                                </div>
                            )}
                        </div>
                    )}
            </div>
        );
    }
}

const mapSateToProps = (state) => ({
    adminStatus: state.adminStatus.currentUserStatus,
    adminToken: state.adminToken,
    snackbarStatus: state.snackbar,
});

const mapDispatchToProps = (dispatch) => ({
    openSnackbar: (status) => dispatch(openSnackbar(status)),
});

export default connect(mapSateToProps, mapDispatchToProps)(withRouter(App));
