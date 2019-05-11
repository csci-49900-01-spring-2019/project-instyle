import React, {Component} from 'react';
import "../Styles/Cards.css"
import axios from "axios";

import {connect} from "react-redux";


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
            id:"",

        }
    }
    getAllItems = () => {
        return this.state.data.slice(0,9).map((obj, index) => {
            // console.log("id: ",obj.id)
            if(obj.sold === false){
            return <div className="cardsRows" key={obj.id}>
                <ul>
                    <img className="image" src={obj.imageUrl}/>
                    <li>Product Name: <a href="/product">{obj.product_name}</a></li>
                    <li>Brand: {obj.brand}</li>
                    <li>Price: ${obj.price} </li>
                    {/*<button onClick={this.getID.bind(this,obj) }>See More</button>*/}
                    <button onClick={() => this.onClickSeeMore(obj)}>See More</button>
                </ul>
            </div>
            }})
    }

    onClickSeeMore = (e, obj) => {
            e.preventDefault()
            console.log("AAAAAAAAAAAAAAAAAAAAAAA")
            console.log(obj.id)
            console.log("AAAAAAAAAAAAAAAAAAAAAAA")


    }


    componentDidMount() {
        // axios.get('/posting')
        //     .then(response => {
        //         console.log("In cards: ", response.data.data)
        //
        //         this.setState({
        //             data:response.data.data
        //
        //         })
        //          // console.log("data: ",this.state.data)
        //     })
    }

    getID(obj){
        // evt.preventDefault()
        console.log(obj.id)
        this.setState({
            id:obj.id
        })
        console.log("id is:",this.state.id);
        axios({
            method:"get",
            url: '/listing',
            body:{
                    id:obj.id
            }
        })
            .then(response=>{
                console.log("in id", response)
                this.setState({
                    item:response.data
                })
            })
        console.log(this.state.item)
        console.log("out")
    }

     render(){
        return (
            <div>
                <div className="cardsCols" >
                    <form className="cardForm">
                        <div>{this.getAllItems()}</div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token:state.auth.token
    }
}
// export default  connect(mapStateToProps)(Cards);

