import React, {Component} from 'react';
import "../Styles/Cards.css"
import axios from "axios";

import {NavLink} from "react-router-dom";


class Cards extends Component {
    constructor(props){
        super(props)
        this.state = {
            // price: 50,
            // product_name:"",
            data:[]
        }
    }

    componentDidMount() {
       // console.log("In Cards")

        axios.get("/posting")
            .then(response => {
                // (response.json())
                console.log("In cards: ", response.data.data)
                this.setState({
                    data:response.data.data
                    // price:response.data.price,
                    // product_name:response.data.product_name

                })
                console.log("data: ",this.state.data)
                //save the data in your states
            })

        // console.log("out of axios of cards")


    }


    render(){
        const allItems = this.state.data.slice(0,9).map((obj) => {
            return <div className="cardsRows"><ul>
                {/*<img src={shoes}/>*/}
                 <img className="image" src={obj.imageUrl}/>
                 {/*<span></span>*/}
                <li>Product Name: <a href="/product">{obj.product_name}</a></li>
                <li>Brand: {obj.brand}</li>
                <li>Price: ${obj.price} </li>
                {/*<a href="/product">{obj.product_name}</a>*/}
            </ul></div>
        });
        return (
            <div>
                <div className="cardsCols" >
                    <form className="cardForm">
                        <div>{allItems}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Cards;
