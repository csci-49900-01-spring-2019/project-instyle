//Frontend/client/src/App.js
import React, { Component } from "react";
import {NavLink} from "react-router-dom";

import "../Styles/Landing.css"
import "../Styles/Header.css"


import Card from "./Card.js"
import Sidebar from "./Sidebar.js"

import {connect} from 'react-redux';
import axios from "axios";

function searchFor(search) {
    return function (x) {
        return x.name.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

class Landing extends Component {

    constructor(props){
        super(props)
        this.state = {
            data:[],
            search:""
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
    }


    render() {
        // console.log(this.state.token)
        let filteredPosts = this.state.data.filter(
            (post) => {
                return post.product_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        const posts = this.state.data.length ?
            (filteredPosts.map(post => {
                 // console.log(post)
                 // console.log(post.imageUrls[0])
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
            })): <div>"No data"</div>

        return (
            <div className="landingWrapper">
                <Sidebar/>
                <div className="search">
                    <input className="searchinput" name="search" type="text" value={this.state.search} onChange={this.handleSearch} placeholder={"Product Name"}/>
                    {/*<button className="searchbutton">Search</button>*/}
                </div>

                <div className= "grid-container"> 
                    {posts}
                </div>

                {this.props.token ?
                    <div>
                        <NavLink to="/addItem" className="postButton">POST</NavLink>
                    </div>
                :
                    <div>
                        <NavLink to="/register" className="postButton">POST</NavLink>
                    </div>
                }

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