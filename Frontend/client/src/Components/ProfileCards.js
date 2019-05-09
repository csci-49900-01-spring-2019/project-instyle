import React, {Component} from 'react';
import "../Styles/ProfileCards.css"
import axios from "axios";

import {NavLink} from "react-router-dom";


class ProfileCards extends Component {
    constructor(props){
        super(props)
        this.state = {
            product_name:this.props.product_name,
            price:this.props.price,
            id:this.props.id
        }
    }

    render(){
        return (
            <div className="cardsRow">
                <div className="cardsCols" >
                    <form className="cardForm">
                        <ul className="wrappingList">
                            <li className="listItem">Product Name:{this.state.product_name}</li>
                            <li className="listItem">Price: ${this.state.price} </li>
                            <NavLink to ={"/displayItem/?ref=" + this.state.id}>See More</NavLink>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProfileCards;
