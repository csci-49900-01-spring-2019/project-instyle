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
			<div>
				<form className="signUpForm">
					<div>
						<input name="email" type="text"  value={this.state.email} placeholder="Email" onChange={this.handleChange.bind(this)}/>
					</div>
					<div>
						<input name="password" autoComplete="new-password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange.bind(this)}/>
					</div>
					<br/>
					<div>
						<button id="signIn" onClick={this.handleSubmit.bind(this)} >Sign In</button>
						<button id="signOut" onClick={this.handleSignOut.bind(this)} >Sign Out</button>
					</div>
					<br/>
					<div>
						<input id="message" readOnly={true} value={this.state.message}  size="30"/>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
