import React, { Component } from "react";
import "./Styles/Signup.css"
import axios from "axios";


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            uid:'',
            email:"",
            password:"",
            verifyPassword:"",
            firstName:"",
            lastName:"",
            userName:"",
            isAuth:false,
            message:""
        }
       // this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(evt){
        this.setState({[evt.target.name]:evt.target.value});
    }

    handleSubmit(evt) {
        //console.log("email: ", this.state.email)
        evt.preventDefault()
        console.log("Signing Up")
        axios.post("/register",{
            email:this.state.email,
            password:this.state.password,
            verifyPassword:this.state.verifyPassword,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            userName:this.state.userName,

        })
            .then(response => {
                console.log(response);
                if(response.data.isAuth) {
                    this.setState(
                        {
                            isAuth: response.data.isAuth,
                            uid: response.data.uid,
                            message: "Welcome " + this.state.firstName
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
                console.log("firstname: ", this.state.firstName)
                console.log("lastname: ", this.state.lastName)
                console.log("userName: ", this.state.userName)
                console.log("isAuth: ", this.state.isAuth)
                console.log("uid: ", this.state.uid)
            }).catch(function (error) {
            console.log("Authorization failed: "+ error.message);
        })
    }
   render(){
        return(
            <div>
                <form className="registerForm">
                    <div className="submission">
                        <label htmlFor="firstname">First Name</label>
                        <input className="inputRegister" name="firstName" type="text" value={this.state.firstName} placeholder="First Name" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="submission">
                        <label htmlFor="lastname">Last Name</label>
                        <input className="inputRegister"  name="lastName" type="text" value={this.state.lastName} placeholder="Last Name" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="submission">
                        <label htmlFor="username">User Name</label>
                        <input className="inputRegister"  name="userName" type="text" value={this.state.userName} placeholder="User Name" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="submission">
                        <label htmlFor="email">Email</label>
                        <input className="inputRegister" autoComplete="username email" name="email" type="text" value={this.state.email} placeholder="Email" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="submission">
                        <label htmlFor="password">Password</label>
                        <input className="inputRegister" autoComplete="new-password" name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="submission">
                        <label htmlFor="verifypassword">Verify Password</label>
                        <input className="inputRegister" name="verifyPassword" autoComplete="new-password" type="password" value={this.state.verifyPassword} placeholder="Password" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <br/>
                     <div className="registerButton">
                        <button className="submitButton" onClick={this.handleSubmit.bind(this)}>Register</button>
                    </div>
                    <br/>
                    <div>
                        <input className="message" type="text" readOnly={true} value={this.state.message} size="30"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;
