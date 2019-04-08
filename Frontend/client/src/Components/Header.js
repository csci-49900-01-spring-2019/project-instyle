import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import "../Styles/Header.css";
import logo from '../assets/Logo.png';
import {connect} from "react-redux";

class Header extends Component{
    constructor(props){
        super(props);
        // this.state = {
        //     auth:null
        // }
    }

    // componentDidMount() {
    //     //get axios request here
    // }

    renderContent() {
        //make switch statement for logout
        switch (this.props.isAuth) {
            case true:
                return <ul>
                        <li><a className="authButton" href="/profile">Profile</a></li>
                        <li><a className="authButton" href="/logout">Logout</a></li>
                    </ul>
            default:
                return <ul>
                    <li><a className="authButton" href="/login">Login</a></li>
                    <li><a className="authButton" href="/register">SignUp</a></li>
                </ul>

        }
    }
    render(){
        return(
          <div className="header">
              {this.renderContent()}
                <NavLink to = "/"><img src={logo} alt="InStyle"/></NavLink>

              <br />

          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth:state.auth.isAuth
    }
}
export default connect(mapStateToProps)(Header);