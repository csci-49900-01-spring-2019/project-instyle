//Frontend/client/src/App.js
import React, { Component } from "react";

import "./Styles/Landing.css"
import "./Styles/Header.css"

import Cards from "./Cards.js"

import  shoes from "./assets/shoes.png"
import  pants from "./assets/work-pants.jpg"
import  shirts from "./assets/high-bar-dress-shirts.jpg"
import  tshirts from "./assets/Assorted_T_Shirts.jpg"




class Landing extends Component {
    state = {
        data: null
    };

    // componentDidMount() {
    //     // Call our fetch function below once the component mounts
    //     this.callBackendAPI()
    //         .then(res => this.setState({ data: res.express }))
    //         .catch(err => console.log(err));
    // }
    // // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    // callBackendAPI = async () => {
    //     const response = await fetch('/backend');
    //     const body = await response.json();
    //
    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body;
    // };
    render() {
        return (
            <div>

                <div className="search">
                    <input className="searchinput" name="search" type="text" />
                    <button className="searchbutton">Search</button>
                </div>

                <div className="sidebar">
                    <ul>
                        <li><a href="/male" >Male</a>
                            <ul>
                                <li><a href="/male" >Shoes</a></li>
                                <li><a href="/male" >Pants</a></li>
                                <li><a href="/male" >Shirts</a></li>
                                <li><a href="/male" >T-Shirts</a></li>
                            </ul>
                        </li>
                        <li><a href="/female">Females</a>
                            <ul>
                                <li><a href="/male" >Shoes</a></li>
                                <li><a href="/male" >Pants</a></li>
                                <li><a href="/male" >Shirts</a></li>
                                <li><a href="/male" >T-Shirts</a></li>
                            </ul>
                        </li>
                        <li><a  href="/kids">Kids</a>
                            <select>
                                <option><a href="/male" >Shoes</a></option>
                                <option><a href="/male" >Pants</a></option>
                                <option><a href="/male" >Shirts</a></option>
                                <option><a href="/male" >T-Shirts</a></option>
                            </select>
                        </li>
                    </ul>
                </div>
                {/*<div className="grid-container">*/}
                    {/*<div className="List">*/}
                        {/*<img src={shoes} width="42" height="42"/>*/}
                        {/*<a className="ListButton" >Shoes</a>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                        {/*<img src={pants}/>*/}
                        {/*<a className="ListButton" >Pants</a>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                        {/*<img src={shirts}/>*/}
                        {/*<a className="ListButton" >Shirts</a>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                        {/*<img src={tshirts}/>*/}
                        {/*<a className="ListButton" >T-Shirts</a>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <Cards/>

                <div>
                     <button className="postButton" >POST</button>
                </div>

            </div>
        );
    }
}

export default Landing;