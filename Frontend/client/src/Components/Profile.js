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
			name:"",
            // first_name:"",
			// last_name:"",
			token:this.props.token,


        }

	}
	
	componentDidMount(){
		this.fetchUserInfo();
		this.fetchBuyingItems();
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
					name:response.data.first_name + " " + response.data.last_name,
					// first_name:response.data.first_name,
					// last_name:response.data.last_name,
					email: response.data.email
				})
			})
		}

	}


	fetchBuyingItems = () =>{
		// axios.get("/buy",{
		// 	headers: { Authorization: `Bearer ${this.state.token}`,}
		// })
		// 	.then(response => {
		//
		// 	})

	// }

		// })
	 }
	 
	// fetchSoldItems = () => {

	// }

	// fetchMyItems = () => {

	// }
   render(){
        return(
			<div>
				<div className="profileInfoWrapper">
					<div className="welcome">Welcome!</div>

					{/* <input className="first" id="name" disabled={true} readOnly={true} value={this.state.first_name} size="30"/>
					<input className="last" id="name" disabled={true} readOnly={true} value={this.state.last_name} size="30"/> */}
					
					<div className="userInfo">
						<input className="info" id="userName" disabled={true} readOnly={true} value={this.state.name} size="30"/>
					</div>

					<div className="userInfo">
						<input className="info" id="userEmail" disabled={true} readOnly={true} value={this.state.email} size="30"/>
					</div>
				</div>

				<div className="profileCardInfo">
					<h5 className="profileHeader" ><strong id="itemDisplay">Bought Items</strong></h5>
				</div>

				<div className="profileCardInfo">
					<h5 className="profileHeader" ><strong id="itemDisplay">Sold Items</strong></h5>
				</div>

				<div className="profileCardInfo">
					<h5 className="profileHeader" ><strong id="itemDisplay">My Items</strong></h5>
				</div>

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

