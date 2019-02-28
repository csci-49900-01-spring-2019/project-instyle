import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import "./Styles/Header.css";
import logo from './assets/Logo.png';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            auth:null
        }
    }

    componentDidMount() {
        //get axios request here
    }

    renderContent(){
        //make switch statement for logout
       return <ul><li><a className="authButton" href = "/login">SignIn</a></li><li><a className="authButton" href = "/register">SignUp</a></li></ul>
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

export default Header;