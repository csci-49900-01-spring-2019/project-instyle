import React, {Component} from 'react';

import queryString from "query-string";
import axios from "axios";

import {connect} from "react-redux";

import {NavLink} from "react-router-dom";

import "../Styles/DisplayItem.css"
import Button from "reactstrap/es/Button";

import defaultImage from "../assets/defaultImage.png"


class DisplayItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            imageUrls: [],
            price: "",
            product_name: "",
            brand: "",
            category: "",
            description: "",
            gender: "",
            size: "",
            token:this.props.token,
            sold:false

        }

    }
     componentDidMount() {

        const request= queryString.parse(this.props.location.search)

        axios.get("/api/posts",{
            params:{
                id: request.ref
            }
        })
            .then(response =>{
                // console.log("in display page",response)
                this.setState({
                    data: response.data.data,
                    imageUrls: response.data.data.imageUrls,
                    price: response.data.data.price,
                    product_name: response.data.data.product_name,
                    brand: response.data.data.brand,
                    category: response.data.data.category,
                    description: response.data.data.description,
                    gender: response.data.data.gender,
                    size: response.data.data.size,
                    sold:response.data.data.sold


                })
                 // console.log("response from display item",this.state.data)
             })

     }

    handleOnClick =() =>{
        const request= queryString.parse(this.props.location.search)
        let id = request.ref;
        console.log("Access token in display Item:",this.state.token)
        axios({
            method: 'post',
            url: '/api/buy',
            data:{
                token:this.state.token,
                id:id
            }
        })
            .then(response =>{
                console.log("the display Item Response",response);

            })
            .catch(error => { console.log(error) })

    }

    render(){

        return(
            <div className="wrappingItems">
                    <div className="imageDiv">
                        <img className="image" src={this.state.imageUrls[0] ? this.state.imageUrls[0]: defaultImage }/>
                    </div>
                    <div className="listWrapper">
                        <ul className="wrappingList">
                            <div className="eacDiv">
                                <li className="titleList">{this.state.brand}</li>
                            </div>
                            <div className="eacDiv">
                                <li className="eachList">{this.state.product_name}</li>
                            </div>
                            <div className="eacDiv">
                                <li className="eachList">${this.state.price} </li>
                            </div>
                            <div className="eacDiv">
                               <li className="eachList">{this.state.gender} </li>
                            </div>
                            <div className="eacDiv">
                                <li className="eachList">{this.state.size} </li>
                            </div>
                            <div className="eacDiv">
                                 <li className="eachList">{this.state.description}</li>
                            </div>
                            {this.state.sold ?
                                <div>
                                    <Button className="buyButton">SOLD</Button>
                                </div>
                                :
                                this.props.token ?
                                    <div>
                                        <Button className="buyButton" onClick={this.handleOnClick}>BUY</Button>
                                    </div>
                                    :
                                    <div>
                                        <NavLink to="/register" className="postButton" onClick={this.handleOnClick}>BUY</NavLink>
                                    </div>
                            }
                        </ul>
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
export default connect(mapStateToProps)(DisplayItem);