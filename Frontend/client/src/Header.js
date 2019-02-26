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
       return <li><a className="authButton"><NavLink to = "/login">SignUp/SignIn</NavLink></a></li>
    }

    render(){
        return(
          <div className="header">
              {this.renderContent()}
                <img src={logo} alt="_Logo"/>
              {/*<p className="logo">LOGO</p>*/}
              <br />
              {/*<p className="header"></p>*/}


          </div>
        );
    }
}

export default Header;