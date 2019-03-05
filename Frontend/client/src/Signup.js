import React, { Component } from "react";
import "./Styles/Signup.css"
import axios from "axios";

class Signup extends Component{

   render(){
        return(
            <div>
                <form className="registerForm">
                    <div className="submission">
                        <label for="email">Email</label>
                        <input className="email" id="email" type="text"/>
                    </div>
                    <div className="submission">
                        <label for="password">Password</label>
                        <input className="password" id="password" type="text"/>
                    </div>
                    <br/>
                     <div className="registerButton">
                        <button className="submitButton" id="register" onClick={this.handleRegister} disabled ={false}>Register</button>
                    </div>
                    <br/>
                    <div>
                        <input className="message" id="message" type="text" disabled='1' size="30"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;
