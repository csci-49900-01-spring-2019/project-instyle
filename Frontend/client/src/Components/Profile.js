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
			data:[],
			soldItems: [],
			purchases:[]


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
					email: response.data.email,
					uid: response.data.uid
				})

				this.fetchMyItems(uid);
				this.fetchSoldItems(uid);
				this.fetchPurchases(uid);

			})
				.catch(err =>{
					console.log(err);
				})
		}

	}


	fetchMyItems = (uid) =>{
		axios.get("/api/user/posts",{
			params:{
				uid:uid
			}
		})
			.then(response => {
				let posts = response.data
				console.log("in getting user items", posts);

				this.setState({
					data: posts
				})

			})
			.catch(err => {
				console.log(err);
			})

	}



	fetchSoldItems = (uid) => {
		axios.get("/api/user/soldItems",{
			params:{
				uid:uid
			}
		})
			.then(response => {
				let posts = response.data
				console.log("in getting user sold items", posts);

				posts.forEach( post => {
					axios.get("api/user", {
						params:{
							uid: post.buyerId
						}
					}) .then(userInfo => {
						console.log("USERINFO: ", userInfo.data)
						let p = {
							buyerEmail: userInfo.data.email,
							buyerUsername: userInfo.data.user_name,
							id: post.id,
							product_name: post.product_name,
							price: post.price,
							buyerId: post.buyerId
						}

						this.setState({
							soldItems: [...this.state.soldItems, p]
						})

					}) .catch(error => {console.log("error getting user info",error)})
				})

			})
			.catch(err => {
				console.log(err);
			})
	}

	fetchPurchases = (uid) => {
		axios.get("/api/user/purchases",{
			params:{
				uid:uid
			}
		})
			.then(response => {
				let purchases = response.data
				console.log("in getting user purchases items", purchases);

				purchases.forEach( post => {
					axios.get("api/user", {
						params:{
							uid: post.sellerId
						}
					}) .then(userInfo => {
						console.log("USERINFO: ", userInfo.data)
						let p = {
							sellerEmail: userInfo.data.email,
							sellerUsername: userInfo.data.user_name,
							id: post.id,
							product_name: post.product_name,
							price: post.price,
							sellerId: post.sellerId
						}

						this.setState({
							purchases: [...this.state.purchases, p]
						})

					}) .catch(error => {console.log("error getting user info",error)})
				})

			})
			.catch(err => {
				console.log(err);
			})
	}


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

	   const soldPosts = this.state.soldItems.length ?
		   (this.state.soldItems.map(soldPost => {
			   console.log("sold", soldPost)
			   return (
				   <div key={soldPost.id}>
					   <ProfileCards id = {soldPost.id}
									 product_name = {soldPost.product_name}
									 price = {soldPost.price}
									 email = {soldPost.buyerEmail}
					   />
				   </div>
			   )
		   })): <div>"No data"</div>

		const purchases = this.state.purchases.length ?
			(this.state.purchases.map(purchase => {
				console.log("purchase ", purchase)
				return (
					<div key={purchase.id}>
						<ProfileCards id = {purchase.id}
									  product_name = {purchase.product_name}
									  price = {purchase.price}
									  email = {purchase.sellerEmail}
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
				<div>
					{purchases}
				</div>

				<div className="profileCardInfo">
					<h5 className="profileHeader" ><strong id="itemDisplay">Sold Items</strong></h5>
				</div>
				<div>
					{soldPosts}
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

