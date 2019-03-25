//Frontend/client/src/App.js
import React, { Component } from "react";

import "./Styles/Landing.css"
import "./Styles/Header.css"


import Cards from "./Cards.js"
import Sidebar from "./Sidebar.js"

class Landing extends Component {

    render() {
        return (
            <div>
                <Sidebar/>
                <div className="search">
                    <input className="searchinput" name="search" type="text" />
                    <button className="searchbutton">Search</button>
                </div>

                {/*<Cards/>*/}

                <div>
                     <button className="postButton" >POST</button>
                </div>

            </div>
        );
    }
}

export default Landing;