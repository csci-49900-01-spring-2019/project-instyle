//Frontend/client/src/App.js
import React, { Component } from "react";
import {NavLink} from "react-router-dom";

import "../Styles/Landing.css"
import "../Styles/Header.css"


import Card from "./Card.js"
import Sidebar from "./Sidebar.js"

import {connect} from 'react-redux';
import axios from "axios";


class Landing extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[],
            search:"",
            filterType : "",
            filterGender : "",
            hasFilter:false
        }
    }

    componentDidMount() {
        axios.get('/api/posting')
            .then(response => {
                // console.log("In cards: ", response.data.data)

                    this.setState({
                        data:response.data.data

                    })

            })
    }

    handleSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    };

    handleSetFilter = (gender,type)=>{
        this.setState({
            filterType : type,
            filterGender : gender,
            hasFilter:true
        })
    };

    handleRemoveFilter = ()=>{
        this.setState({
            filterType : "",
            filterGender : "",
            hasFilter:false
        })
    };

    render() {
        let filteredPosts = this.state.data.filter(
            (post) => {
                return post.product_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        );

        if(this.state.hasFilter) {
             filteredPosts = filteredPosts.filter(
                post =>
                    post.gender.indexOf(this.state.filterGender) !== -1 &&
                    post.category.indexOf(this.state.filterType) !== -1
            );
        }

        const posts = filteredPosts.length ?
            (filteredPosts.map(post => {
                return (
                    <div key={post.id}>
                        <Card id = {post.id}
                              imageUrl = {post.imageUrls[0]}
                              product_name = {post.product_name}
                              brand = {post.brand}
                              price = {post.price}
                              description = {post.description}
                              gender ={post.gender}
                              size = {post.size}
                              sold = {post.sold}
                              uid = {post.uid}
                        />
                    </div>
                )
            })): <div></div>

        return (
            <div className="landingWrapper">
                <Sidebar handleSetFilter={this.handleSetFilter} handleRemoveFilter={this.handleRemoveFilter} />
                <div className="search">
                    <input className="searchinput" name="search" type="text" value={this.state.search} onChange={this.handleSearch} placeholder={"Product Name"}/>
                </div>
                {this.props.token ?
                    <div className = "button">
                        <NavLink to="/addItem" className="postButton">POST</NavLink>
                    </div>
                :
                    <div className = "button">
                        <NavLink to="/register" className="postButton">POST</NavLink>
                    </div>
                }
                <div className= "grid-container"> 
                    {posts}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
   return {
       token:state.auth.token
   }
}
export default connect(mapStateToProps)(Landing);