import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Navigation from "./Pages/Navigation/Navigation";
import Landing from "./Pages/Landing/Landing";
import { ROUTER_LINKS } from "./Router";
import { throwMsg, getPopup } from "./util";
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
import Manual from "./Pages/Manual/Manual";

let timerID;
const timeOutValue = 10000;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: false,
            open: null,
            name: "MY SHOP",
            address: "YOUR ADDRESS",
            bgc: "#ffffff",
            tc: "#000000",
            bc: "#EAE8E4",
            bsc: "#707070",
        };
    }

    getData = async () => {
        if (localStorage.getItem("shopID") === "") return;
        try {
            const res = await api.shop.getDetails(localStorage.getItem("shopID"));
            document.documentElement.style.setProperty("--primary", res.color.bgc);
            document.documentElement.style.setProperty("--secondary", res.color.tc);
            document.documentElement.style.setProperty("--border", res.color.bc);
            document.documentElement.style.setProperty("--borderSecondary", res.color.bsc);
            this.setState({ name: res.name, address: res.address, bgc: res.color.bgc, tc: res.color.tc, bc: res.color.bc, bsc: res.color.bsc });
        } catch (e) {
            console.log(e);
        }
    };
    componentWillReceiveProps(nextProps) {
        const { history } = this.props;
        if (
            history.location.pathname !== ROUTER_LINKS.signIn &&
            history.location.pathname !== ROUTER_LINKS.signUp &&
            history.location.pathname !== ROUTER_LINKS.manual &&
            history.location.pathname !== ROUTER_LINKS.landingPage
        ) {
            this.getData();
        }
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
        // const { primary, secondary, border, borderSecondary } = this.state.color3;
        // document.documentElement.style.setProperty("--primary", primary);
        // document.documentElement.style.setProperty("--secondary", secondary);
        // document.documentElement.style.setProperty("--border", border);
        // document.documentElement.style.setProperty("--borderSecondary", borderSecondary);
        // this.setState({ currentColor: { primary, secondary, border, borderSecondary } });
        const { history } = this.props;
        if (
            history.location.pathname !== ROUTER_LINKS.signIn &&
            history.location.pathname !== ROUTER_LINKS.signUp &&
            history.location.pathname !== ROUTER_LINKS.manual &&
            history.location.pathname !== ROUTER_LINKS.landingPage
        ) {
            this.getData();
        }
    }
    handleSaveColor = async () => {
        const { bgc, tc, bc, bsc, name, address } = this.state;
        let isChanged = false;
        document.documentElement.style.setProperty("--primary", bgc);
        document.documentElement.style.setProperty("--secondary", tc);
        document.documentElement.style.setProperty("--border", bc);
        document.documentElement.style.setProperty("--borderSecondary", bsc);
        try {
            const res = await api.shop.getDetails(localStorage.getItem("shopID"));
            if (
                res.name !== name ||
                res.address !== address ||
                res.color.bgc !== bgc ||
                res.color.tc !== tc ||
                res.color.bc !== bc ||
                res.color.bsc !== bsc
            ) {
                await api.shop.details({
                    name: this.state.name,
                    address: this.state.address,
                    color: {
                        bgc: bgc,
                        tc: tc,
                        bc: bc,
                        bsc: bsc,
                    },
                });
                getPopup("success", "Saved Successfully");
            }
        } catch (e) {
            console.log(e);
        }
    };
    handleColorChange = (e) => {
        const { name, value } = e.target;

        document.documentElement.style.setProperty(
            name === "bgc" ? "--primary" : name === "tc" ? "--secondary" : name === "bc" ? "--border" : "--borderSecondary",
            value
        );

        this.setState({ [name]: value });
    };
    handleDownload = () => {};
    render() {
        const { isLoggedIn } = this.props.adminStatus;
        const { snackbarStatus, openSnackbar, history } = this.props;
        const { isHover, name, address, bgc, tc, bc, bsc } = this.state;
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
                            <Route
                                exact
                                path={ROUTER_LINKS.manual}
                                render={() => (isLoggedIn ? <Manual /> : <Redirect to={ROUTER_LINKS.landingPage} />)}
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
                    history.location.pathname !== ROUTER_LINKS.manual &&
                    history.location.pathname !== ROUTER_LINKS.landingPage && (
                        <div
                            className={`app__right ${isHover ? "app__right-hover" : ""}`}
                            onMouseEnter={() => {
                                this.setState({ isHover: true });
                                this.getData();
                            }}
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
                                    <Link to={ROUTER_LINKS.manual} style={{ "text-decoration": "none" }}>
                                        <div className='app__download' onClick={this.handleDownload}>
                                            HOW TO DEPLOY
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className='app__right-shrink'>
                                    <SlackLogo className='app__slack-logo rotating' />
                                    <div className='app__colors' style={{ background: bgc }}></div>
                                    <div className='app__colors' style={{ background: tc }}></div>
                                    <div className='app__colors' style={{ background: bc }}></div>
                                    <div className='app__colors' style={{ background: bsc }}></div>
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
