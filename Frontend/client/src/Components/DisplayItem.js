import React, {Component} from 'react';

import queryString from "query-string";
import axios from "axios";

import {connect} from "react-redux";

import {NavLink} from "react-router-dom";

import "../Styles/DisplayItem.css"
import Button from "reactstrap/es/Button";


class DisplayItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // request:""
            data:[],
            imageUrl: [],
            price: "",
            product_name: "",
            brand: "",
            category: "",
            description: "",
            gender: "",
            size: "",
            token:this.props.token

        }

    }
     componentDidMount() {

        const request= queryString.parse(this.props.location.search)

        // console.log("||||||" + request.ref)
        // console.log("Display Item");
        axios.get("/api/posts",{
            params:{
                id: request.ref
            }
        })
            .then(response =>{
                this.setState({
                    data: response.data.data,
                    imageUrl: response.data.data.imageUrls,
                    price: response.data.data.price,
                    product_name: response.data.data.product_name,
                    brand: response.data.data.brand,
                    category: response.data.data.category,
                    description: response.data.data.description,
                    gender: response.data.data.gender,
                    size: response.data.data.size


                })
                 console.log("response from display item",this.state.data)
             })

     }

    handleOnClick =() =>{
        const request= queryString.parse(this.props.location.search)
        let id = request.ref;
        console.log("Access token in display Item:",this.state.token)
        axios({
            method: 'post',
            url: '/buy',
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
                <div className="listWrapper">
                    <img className="image" src={this.state.imageUrl}/>
                    <ul className="wrappingList">
                        <div className="eacDiv">
                            <li className="titleList">{this.state.product_name}</li>
                        </div>
                        <div className="eacDiv">
                            <li className="eachList">{this.state.brand}</li>
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
                    </ul>

                </div>

                <div className="button">
                    {this.props.token ?
                        <div>
                            <Button className="buyButton" onClick={this.handleOnClick}>BUY</Button>
                        </div>
                        :
                        <div>
                            <NavLink to="/register" className="postButton" onClick={this.handleOnClick}>BUY</NavLink>
                        </div>
                    }
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