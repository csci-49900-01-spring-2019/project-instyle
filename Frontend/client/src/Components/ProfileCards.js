import React, {Component} from 'react';
import "../Styles/Cards.css"
import axios from "axios";

import {NavLink} from "react-router-dom";


class ProfileCards extends Component {
    constructor(props){
        super(props)
        this.state = {
            image:"",
            product_name:"",
            user_name:"",
            email:""
        }
    }

    render(){
        return (
            <div>
            </div>
        );
    }
}

export default ProfileCards;
