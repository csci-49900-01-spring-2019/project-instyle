import React, { Component } from "react";
import "./Styles/Login.css"
import axios from "axios";

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			uid:'',
			useremail:"",
			password:"",
			auth:false
		}

	}
	handleSubmit() {
		axios.post("/auth",{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.useremail,
				password:this.state.password
			})
		}
		.then(function(response){
			console.log(response)
			}).catch(function(error){
				console.log(error);
			})
		)
	}

    render(){
        return(
            <div>
                <form className="signUpForm">
                    <div>
                        <input id="email" type="text" placeholder="Email"/>
                    </div>
                    <div>
                        <input id="password" type="password" placeholder="Password"/>
                    </div>
                    <br/>
                    <div>
                        <button id="signIn" onClick={this.handleSubmit} disabled ={false}>Sign In</button>
                        <button id="signOut" onClick={this.handleSignOut} disabled ={true}>Sign Out</button>
                    </div>
                    <br/>
                    <div>
                        <input id="message" type="text" value={this.state.message} disabled='1' size="30"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
