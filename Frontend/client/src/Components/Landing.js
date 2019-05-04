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
        super(props)
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        axios.get('/api/posting')
            .then(response => {
                console.log("In cards: ", response.data.data)

                    this.setState({
                        data:response.data.data

                    })

            })
    }



    render() {
        // console.log(this.state.token)

        const posts = this.state.data.length ?
            (this.state.data.slice(0,9).map(post => {
                // console.log(post.imageUrls[0])
                return (
                    <div key={post.id}>
                        <Card id = {post.id}
                              imageUrl = {post.imageUrls}
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
                    <input className="searchinput" name="search" type="text" />
                    <button className="searchbutton">Search</button>
                </div>

                {/*<Cards/>*/}
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