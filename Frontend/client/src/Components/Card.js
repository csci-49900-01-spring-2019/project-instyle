import React, {Component} from 'react';
import {Link} from "react-router-dom";


import "../Styles/Cards.css"
import DisplayItem from "./DisplayItem"



import axios from "axios";
import {NavLink} from "react-router-dom";


class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageUrl:this.props.imageUrl,
            price: this.props.price,
            product_name:this.props.product_name,
            brand:this.props.brand,
            category:this.props.category,
            description:this.props.description,
            gender:this.props.gender,
            size:this.props.size,
            id:this.props.id,
            isShow: false

        }
    }

    // handleOnClick = () => {
    //     console.log(this.state.id)
    //
    // }
    render(){
            console.log(this.state.isShow)
        return(
            <div>
                <div className="cardsRows" key={this.state.id}>
                    <ul>
                        <img className="image" src={this.state.imageUrl}/>
                        <li>Product Name:{this.state.product_name}</li>
                        <li>Brand: {this.state.brand}</li>
                        <li>Price: ${this.state.price} </li>
                        {/*<button onClick={this.getID.bind(this,obj) }>See More</button>*/}

                        <NavLink to ={"/displayItem/?ref=" + this.state.id}>See More</NavLink>

                    </ul>
                </div>
            </div>
        )
    }

}

// const DisplayItem = ({})

export default Card;