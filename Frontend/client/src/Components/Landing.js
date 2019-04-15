//Frontend/client/src/App.js
import React, { Component } from "react";
import {NavLink} from "react-router-dom";

import "../Styles/Landing.css"
import "../Styles/Header.css"


import Cards from "./Cards.js"
import Sidebar from "./Sidebar.js"

import {connect} from 'react-redux';


class Landing extends Component {

    render() {
        // console.log(this.state.token)
        return (
            <div className="landingWrapper">
                <Sidebar/>
                <div className="search">
                    <input className="searchinput" name="search" type="text" />
                    <button className="searchbutton">Search</button>
                </div>

                <Cards/>


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