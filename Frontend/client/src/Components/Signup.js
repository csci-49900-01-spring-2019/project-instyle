import React, { Component } from "react";
import "../Styles/Signup.css"
import axios from "axios";
import {NavLink} from "react-router-dom";


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            uid:'',
            email:"",
            password:"",
            verifyPassword:"",
            first_name:"",
            last_name:"",
            user_name:"",
            isAuth:false,
            message:"",
            passwordMessage:"Password doesn't match",
            showError:false,
            stopButton:true
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
        axios.post("/api/register",{
            email:this.state.email,
            password:this.state.password,
            user_name:this.state.user_name,
            first_name:this.state.first_name,
            last_name:this.state.last_name
        })
            .then(response => {
                if(response.data.success) {
                    this.setState(
                        {
                            isAuth: response.data.success,
                            uid: response.data.uid,
                            message: "Welcome " + this.state.first_name
                        }
                    )
                    this.props.history.push('/login')
                } else {
                    this.setState(
                        {
                            isAuth: response.data.success,
                            uid: null,
                            message: response.data.message
                        }
                    )
                }
            }).catch(function (error) {
            console.log("Authorization failed: "+ error.message);
        })
    }
    
    passwordVerify(evt){
        evt.preventDefault()
        if(this.state.password !== this.state.verifyPassword)
        {
            this.setState({
                showError: true,
                stopButton: true

            }); 
        }  
        else
        {
            this.setState({
                stopButton: false,
                showError: false
            
            });
        }
    }


   render(){
        return(
   <div className="registerForm">
            <h5 className="register-header" ><strong>Register</strong></h5>
            <div className="register-body">
                <form className="register-form">
                
                    <div className="input-form-name">
                        <input className="form-control-name" name="first_name" type="text" value={this.state.first_name}  onChange={this.handleChange.bind(this)}/>
                        <label className="lable-control" htmlFor="firstname">First Name</label>
                    </div>

                    <div className="input-form-name" id="name">
                        <input className="form-control-name"  name="last_name" type="text" value={this.state.last_name}  onChange={this.handleChange.bind(this)}/>
                        <label className="lable-control" htmlFor="lastname">Last Name</label>
                    </div>

                    <div className="input-form">
                        <input className="form-control"  name="user_name" type="text" value={this.state.user_name}  onChange={this.handleChange.bind(this)}/>
                        <label className="lable-control" htmlFor="username">User Name</label>
                    </div>

                    <div className="input-form">
                        <input className="form-control" autoComplete="username email" name="email" type="text" value={this.state.email}  onChange={this.handleChange.bind(this)}/>
                        <label className="lable-control" htmlFor="email">Email</label>
                    </div>

                    <div className="input-form">
                        <input className="form-control" autoComplete="new-password" name="password" type="password" value={this.state.password}  onChange={this.handleChange.bind(this)}/>
                        <label className="lable-control" htmlFor="password">Password</label>
                    </div>

                    <div className="input-form">
                        <input className="form-control" name="verifyPassword" autoComplete="new-password" type="password" value={this.state.verifyPassword}  onChange={this.handleChange.bind(this)} onKeyUp={this.passwordVerify.bind(this)}/>
                        <label className="lable-control" htmlFor="verifypassword">Verify Password</label>
                    </div>

                    <div>
                        <input className="message-box" id="message" disabled={true} readOnly={true} value={this.state.message}  size="30"/>
                    </div>
                    { this.state.showError && (<input className="message-box" id="message" disabled={true} readOnly={true} value={this.state.passwordMessage} size="30"/>) }
                    <br/>
                    <button className="register-button" type="submit" id="signIn" disabled={this.state.stopButton} onClick={this.handleSubmit.bind(this)}>Register</button>
                    {/*<button id="signOut" onClick={this.handleSignOut.bind(this)} >Sign Out</button>*/}
                </form>
            </div>
        </div> 
        );
    }
}

export default Signup;
