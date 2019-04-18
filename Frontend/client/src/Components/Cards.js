import React, {Component} from 'react';
import "../Styles/Cards.css"
import axios from "axios";

import {NavLink} from "react-router-dom";


class Cards extends Component {
    constructor(props){
        super(props)
        this.state = {
            image:"",
            price: "",
            product_name:"",
            brand:"",
            category:"",
            description:"",
            gender:"",
            size:"",
            uid:"",
            data:[]
        }
    }

    // getDetail
    getAllItem = () =>{
        return this.state.data.slice(0,9).map((obj) => {
          this.setState({
                image:obj.image,
                brand: obj.brand,
                price: obj.price,
                category:obj.category,
                gender: obj.gender,
                product_name: obj.product_name,
                size: obj.size,
                uid:obj.uid
            })
            return <div className="cardsRows">
                <ul>
                    <img className="image" src={this.state.image}/>
                    <li>Product Name: <a href="/product">{this.state.product_name}</a></li>
                    <li>Brand: {this.state.brand}</li>
                    <li>Price: ${this.state.price} </li>
                    <NavLink to="/product">See More</NavLink>
                </ul>
        </div>
        })
    }


    seeMore = () =>{

    }

    getItems = () => {
        console.log("get Items")
        return this.state.data.slice(0,9).map((obj, index) => {
            return <div className="cardsRows">
                <ul>
                    {/*<img src={shoes}/>*/}
                    <img className="image" src={obj.imageUrl}/>
                    {/*<span></span>*/}
                    <li>Product Name: <a href="/product">{obj.product_name}</a></li>
                    <li>Brand: {obj.brand}</li>
                    <li>Price: ${obj.price} </li>
                    <div onClick={this.seeMore}>See More</div>
                    {/*<NavLink to="/product">See More</NavLink>*/}
                    {/*<a href="/product">{obj.product_name}</a>*/}
                </ul>
            </div>
            })
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

    getID = ()=>{

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
                <NavLink to="/product" onClick={this.getID()}>See More</NavLink>
                {/*<a href="/product">{obj.product_name}</a>*/}
            </ul></div>
        });
        return (
            <div>
                <div className="cardsCols" >
                    <form className="cardForm">
                        <div>{this.getItems()}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Cards;

