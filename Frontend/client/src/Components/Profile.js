import React, { Component } from "react";
import "../Styles/Profile.css"
import axios from "axios";
import {NavLink} from "react-router-dom";

import {connect} from 'react-redux'


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            uid:'',
            email:"",
            first_name:"",
			last_name:"",
			token:this.props.token
        }

	}
	
	componentDidMount(){
		this.fetchUserInfo();
		// this.fetchBuyingItems;
		// this.fetchSoldItems;
		// this.fetchMyItems
	}
    
    fetchUserInfo= () => {

		if(this.props.token !== null){
			console.log("Inside if statement")
			axios.get('/userInfo',{
				headers: { Authorization: `Bearer ${this.state.token}`,}
			})
			.then(response => {

				this.setState({
					first_name:response.data.first_name,
					last_name:response.data.last_name,
					email: response.data.email
				})
			})
		}

	}

	// fetchBuyingItems = () =>{

	// }

	// fetchSoldItems = () => {

	// }

	// fetchMyItems = () => {

	// }
   render(){
        return(
			<div className="User-info">
				<div>Welcome</div>
				<input className="First" id="name" disabled={true} readOnly={true} value={this.state.first_name} size="30"/>
				<input className="last" id="name" disabled={true} readOnly={true} value={this.state.last_name} size="30"/>
				<input className="User-email" id="email" disabled={true} readOnly={true} value={this.state.email} size="30"/>
			</div>

        );
    }
}

const mapStateToProps = (state) =>{
	return {
		token: state.auth.token
	}
}
export default connect(mapStateToProps)(Profile);

