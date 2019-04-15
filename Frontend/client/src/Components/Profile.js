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
			token:""
        }

	}
	
	componentDidMount(){
		this.fetchUserInfo();
		// this.fetchBuyingItems;
		// this.fetchSoldItems;
		// this.fetchMyItems
	}
    
    fetchUserInfo= () => {
		// this.setState({
		// 	token:this.props.token
		// })
		console.log("In profile userInfo")

		if(this.props.token !== null){
			console.log("Inside if statement")
			axios.get('/userInfo',{
				params:{
					token:this.props.token
				}
				
			
			})
			.then(response => {
				// this.setState{(
				// 	email: response.data.email,
				// 	fir

				// )}
				console.log(response);
			})
		}
		console.log("out of userInfo")
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
export default connect(mapStateToProps) (Profile);

