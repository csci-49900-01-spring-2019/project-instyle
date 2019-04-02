//Frontend/client/src/App.js
import React, { Component } from "react";
import {NavLink} from "react-router-dom";

import "../Styles/Landing.css"
import "../Styles/Header.css"


import Cards from "./Cards.js"
import Sidebar from "./Sidebar.js"


class Landing extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <Sidebar/>
                <div className="search">
                    <input className="searchinput" name="search" type="text" />
                    <button className="searchbutton">Search</button>
                </div>

                <Cards/>
                <Cards/>
                {/*<Cards/>*/}
                {/*<Cards/>*/}
                {/*<Cards/>*/}
                {/*<Cards/>*/}
                {/*<Cards/>*/}
                {/*<Cards/>*/}


                <div>
                     <NavLink to = "/addItem" className="postButton" >POST</NavLink>
                </div>

            </div>
        );
    }
}

export default Landing;