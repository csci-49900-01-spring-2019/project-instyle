import React, { Component } from "react";
import "../Styles/Profile.css"

import axios from "axios";
import {NavLink} from "react-router-dom";

import {connect} from 'react-redux'

import ProfileCards from "./ProfileCards";


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
			product_name:"",
			price:"",
			data:[]


        }

	}
	
	componentDidMount() {
		this.fetchUserInfo();
		// this.fetchBuyingItems();
		// this.fetchSoldItems;
		//  this.fetchMyItems
		// console.log("in profile")
	}

    fetchUserInfo = () => {

		if(this.props.token !== null){
			console.log("Inside if statement")
			axios.get('/api/userInfo',{
				headers: { Authorization: `Bearer ${this.state.token}`,}
			})
			.then(response => {
				const uid  = response.data.uid
				this.setState({
					name: response.data.first_name + " " + response.data.last_name,
					// first_name:response.data.first_name,
					// last_name:response.data.last_name,
					email: response.data.email
				})

				axios.get("/api/user/posts",{
					params:{
						uid:uid
					}
				})
					.then(response => {
						console.log("in getting user items",response);
						this.setState({
							data: response.data
						})
					})
					.catch(err => {
						console.log(err);
					})

			})
				.catch(err =>{
					console.log(err);
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

	}


	// fetchSoldItems = () => {

	// }


   render(){

	   const userPosts = this.state.data.length ?
		   (this.state.data.map(userPosts => {
			   console.log(userPosts)
			   return (
				   <div key={userPosts.id}>
					   <ProfileCards id = {userPosts.id}
							 product_name = {userPosts.product_name}
							 price = {userPosts.price}
					   />
				   </div>
			   )
		   })): <div>"No data"</div>
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
					<h5 className="profileHeader" ><strong id="itemDisplay">Purchased Items</strong></h5>
				</div>

				<div className="profileCardInfo">
					<h5 className="profileHeader" ><strong id="itemDisplay">Sold Items</strong></h5>
				</div>

				<div className="profileCardInfo">
					<h5 className="profileHeader" ><strong id="itemDisplay">My Items</strong></h5>
				</div>
				<div>
					{userPosts}
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

