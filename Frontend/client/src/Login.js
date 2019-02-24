import React, { Component } from "react";
import "./Styles/Login.css"
import axios from "axios";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        //axios request
    }

    render(){
        return(
            <div>
                <form className="signUpForm">
                    <div>
                        <input id="email" type="text" placeholder="Email" />
                    </div>
                    <div>
                        <input id="password" type="password" placeholder="Password" />
                    </div>
                    <br/>
                    <div>
                        <button id="signIn">Sign In</button>
                        <button id="register">Register</button>
                        <button id="signOut" >Sign Out</button>
                    </div>
                    <br/>
                    <div>
                        <input id="message" type="text"  disabled='true' size="30"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
