import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import "../Styles/Header.css";
import logo from '../assets/Logo1.png';
import {connect} from "react-redux";

class Header extends Component{
    constructor(props){
        super(props);
        // this.state = {
        //     logout: false
        // }
    }

    // componentDidMount() {
    //     //get axios request here
    // }

    handleProfile = () => {
        this.props.history.push('/profile')
    }


    // renderContent() {
    //     //make switch statement for logout
    //     //console.log(this.props.isAuth)
    //     switch (this.props.isAuth) {
    //         case true:
    //             return <ul>
    //                     <li className="authButton" onClick={this.handleProfile}>Profile</li>
    //                     <li><NavLink className="authButton" to="/">Logout</NavLink></li>
    //                 </ul>
    //         default:
    //             return <ul>
    //                 <li><NavLink className="authButton" to="/login">Login</NavLink></li>
    //                 <li><NavLink className="authButton" to="/register">SignUp</NavLink></li>
    //             </ul>
    //     }
    // }

    render() {
        const headerButtons = (this.props.isAuth) ? 
            <ul>
                <li className="authButton" onClick={this.handleProfile}>Profile</li>
                <li><NavLink className="authButton" to="/">Logout</NavLink></li>
            </ul> :
            <ul>
                <li><NavLink className="authButton" to="/login">Login</NavLink></li>
                <li><NavLink className="authButton" to="/register">SignUp</NavLink></li>
            </ul>

        return (
          <div className="header">
              
              {headerButtons}
              <NavLink to = "/"><img src={logo} alt="InStyle"/></NavLink>

              <br />

          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps)(Header);