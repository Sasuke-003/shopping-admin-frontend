import React from "react";
import { withRouter } from "react-router-dom";
import LockSharpIcon from "@material-ui/icons/LockSharp";
import { connect } from "react-redux";
import "./Navigation.css";

function Navigation({ history, adminStatus }) {
    return (
        <div class='navigation'>
            <div class='navigation__home navigation__links-container'>
                {" "}
                <h1 className='navigation__links'>Home</h1>
            </div>
            <div class='navigation__first-row'>
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>ORDERS</h1>
                </div>
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>BASKET</h1>
                </div>
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>SEARCH</h1>
                </div>
            </div>
            <div class='navigation__second-row'>
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>PROFILE</h1>
                </div>
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>
                        <LockSharpIcon style={{ fontSize: 70 }} />
                    </h1>
                </div>
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>
                        <LockSharpIcon style={{ fontSize: 70 }} />
                    </h1>
                </div>
            </div>
            <div class='navigation__third-row'>
                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>
                        <LockSharpIcon style={{ fontSize: 70 }} />
                    </h1>
                </div>

                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>
                        <LockSharpIcon style={{ fontSize: 70 }} />
                    </h1>
                </div>

                <div class='navigation__links-container'>
                    <h1 className='navigation__links'>
                        <LockSharpIcon style={{ fontSize: 70 }} />
                    </h1>
                </div>
            </div>
        </div>
    );
}

const mapSateToProps = (state) => ({
    adminStatus: state.adminStatus.currentUserStatus,
    adminToken: state.adminToken,
});

export default connect(mapSateToProps)(withRouter(Navigation));
