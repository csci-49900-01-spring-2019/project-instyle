import React, { Component } from "react";
import "./Styles/Login.css"
import axios from "axios";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
			uid: ''
        }
		this.handleSignIn = this.handleSignIn.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
		this.setAuth = this.setAuth.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount() {
        //axios request
    }
	
	setAuth(res){
		if(!res.isAuth)
		{
			document.getElementById("password").value = "";
			document.getElementById("message").value = res.message;
		}
		else
		{
			this.setState({
				uid: res.uid
			})
			document.getElementById("signIn").disabled = true;
			document.getElementById("register").disabled = true;
			document.getElementById("signOut").disabled = false;
			document.getElementById("email").value = "";
			document.getElementById("password").value = "";
			document.getElementById("message").value = "Welcome, uid:" + res.uid;
		}
	}
	
	handleSignIn(event) {
		event.preventDefault();
		this.callSignInAPI().then(res => this.setAuth(res)).catch(function(error) {
				console.log(error);
			});
	}
	
	handleRegister(event) {
		event.preventDefault();
		this.callRegisterAPI().then(res => this.setAuth(res)).catch(function(error) {
				console.log(error);
			});
	}
	
	handleSignOut(event) {
		event.preventDefault();
		this.setState({
				uid: ""
			})
		document.getElementById("signIn").disabled = false;
		document.getElementById("register").disabled = false;
		document.getElementById("signOut").disabled = true;
		document.getElementById("email").value = "";
		document.getElementById("password").value = "";
		document.getElementById("message").value = "Signed Out";
	}
	
	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callSignInAPI = async () => {
        const response = await fetch('/auth', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email: document.getElementById("email").value,
				password: document.getElementById("password").value
			})
		})
        const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
        return body;
    };
	
	callRegisterAPI = async () => {
        const response = await fetch('/Register', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email: document.getElementById("email").value,
				password: document.getElementById("password").value
			})
		})
        const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
        return body;
    };

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
                        <button id="signIn" onClick={this.handleSignIn} disabled ={false}>Sign In</button>
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
