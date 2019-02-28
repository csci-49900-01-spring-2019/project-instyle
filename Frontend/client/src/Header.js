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
       return <ul><li><a className="authButton"><NavLink to = "/login">SignIn</NavLink></a></li><li><a className="authButton"><NavLink to = "/register">SignUp</NavLink></a></li></ul>
    }

    render(){
        return(
          <div className="header">
              {this.renderContent()}
                <img src={logo} alt="InStyle"/>

              <br />



          </div>
        );
    }
}

export default Header;