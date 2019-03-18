import React, { Component } from "react";
import "./Styles/Login.css"
import axios from "axios";

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			uid:'',
			email:"",
			password:"",
			isAuth:false,
			message:""
		}


	}
	handleChange(evt){
		this.setState({[evt.target.name]:evt.target.value});
	}

	handleSubmit(evt) {
		//console.log("email: ", this.state.email)
		evt.preventDefault()

		console.log("Signing In")

		axios.post("/auth",{
			email:this.state.email,
			password:this.state.password
		})
			.then(response => {
				console.log(response);
				if(response.data.isAuth) {
					this.setState(
						{
							isAuth: response.data.isAuth,
							uid: response.data.uid,
							message: "Welcome " + this.state.email
						}
					)
				} else {
					this.setState(
						{
							isAuth: response.data.isAuth,
							uid: null,
							message: response.data.message
						}
					)
				}
				console.log("isAuth: ", this.state.isAuth)
				console.log("uid: ", this.state.uid)
			}).catch(function (error) {
			console.log("Authorization failed: "+ error.message);
		})

	}

	handleSignOut(){
	// 	axios.get("/logout")
	}

	render(){
		return(
			<div className="loginForm">
				<h5 className="signin-header" ><strong>Log-In</strong></h5>
				<div className="signin-body">
					<form className="signin-form">
					
						<div className="input-form">
							<input className="form-control" id="email-form" name="email" type="email"  value={this.state.email} onChange={this.handleChange.bind(this)}/>
							<label for="email-form" className="lable-control"> E-mail </label>
						</div>

						<div className="input-form">
							<input className="form-control" id="password-form" name="password" autoComplete="new-password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
							<label for="password-form" className="lable-control"> Password </label>
						</div>
						<div>
							<input className="message-box" id="message" disabled={true} readOnly={true} value={this.state.message}  size="30"/>
						</div>
						<br/>
						<button className="signin-button" type="submit" id="signIn" onClick={this.handleSubmit.bind(this)} >Sign In</button>
						{/*<button id="signOut" onClick={this.handleSignOut.bind(this)} >Sign Out</button>*/}

						<p>
							<div>
								<a className="forget-password" href="">Forget Password?</a>
							</div>
							Not a member? 
							<a href="/register">  Register</a>
						</p>
			










					</form>
				</div>
			</div>
		);
	}
}

export default Login;
