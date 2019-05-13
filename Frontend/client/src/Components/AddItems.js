import React, { Component } from "react";


import axios from "axios";
import firebase from "../fbConfig/fbConfig"
import uuid from "uuid/v1"

import "../Styles/AddItems.css";
import defaultImage from "../assets/defaultImage.png";
import {connect} from "react-redux";
import {getToken} from "../actions/authAction";


var storage = firebase.storage();
var storageRef = storage.ref();
const imgRef = storageRef.child("web/images")

class AddItems extends Component{
    constructor(props){
        super(props)
        this.state = {
            imageUrls:[],
            product_name:"",
            price:"",
            size:"",
            brand:"",
            gender:"",
            category:"",
            description:"",
            token:""
        }
    }
    handleChange(evt){
        this.setState({[evt.target.name]:evt.target.value});
    }

    reset(evt){
        this.setState({
            product_name:"",
            price:"",
            size:"",
            brand:"",
            gender:"",
            category:"",
            description:"",
            id:"",
            imageUrls:""
            // sold

        })
    }
    handleSubmit(evt) {
        evt.preventDefault();
        if (this.props.token != null) {
            axios.post("/api/posts", {
                token:this.props.token,
                product_name: this.state.product_name,
                price: this.state.price,
                size: this.state.size,
                brand: this.state.brand,
                gender: this.state.gender,
                category: this.state.category,
                description: this.state.description,
                imageUrls: this.state.imageUrls

            })
                .then(response => {

                    // console.log(response.data.id)
                    if (response.data.success){
                        this.props.history.push("/profile")
                    }
                    else{
                        console.log("cannot post")
                    }

                })
                .catch(function (error) {
                    console.log("no token: "+ error.message);
                })
        }


    }

    handleUpload = (evt) =>{

        const file = evt.target.files[0]
        const filename = uuid()
        const fileRef = imgRef.child(filename)

        fileRef.put(file)
            .then((snapshot) => {
                fileRef.getDownloadURL()
                    .then((url) => {
                        console.log(`URL: ${url}`)
                        this.setState({
                            imageUrls: [...this.state.imageUrls, url]
                        })
                    })
                    .catch(error => {
                        console.log("Cannot get imageUrl")
                    })
            })
            .catch(error => {
                console.log("Error Uploading")
            })
    }



    render(){
        const image = (this.state.imageUrls.length) ?
            <img className="imageConstraints" src={this.state.imageUrls[0]}/> :
            <img className="imageConstraints" src={defaultImage}/>


        return(
            <div className="Wrapper">
                <form className="formWrapper" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="product_name">Product Name:</label>
                        <input className="allInputs" name="product_name" type="text" value={this.state.product_name}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="price">Price:</label>
                        <input className="allInputs" name="price" type="number" value={this.state.price}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="size">Size:</label>
                        <input className="allInputs" name="size" type="text" value={this.state.size}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="brand">Brand:</label>
                        <input className="allInputs" name="brand" type="text" value={this.state.brand}  onChange={this.handleChange.bind(this)}/>
                    </div>

                    <label className="allLabels" >Gender:</label>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="gender">Male:</label>
                        <input className="allInputs" name="gender" type="radio" value="M"  checked={this.state.gender==="M"} onChange={this.handleChange.bind(this)}/>
                        <label className="allLabels" htmlFor="gender">Female:</label>
                        <input className="allInputs" name="gender" type="radio" value="F"  checked={this.state.gender==="F"} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="category">Category:</label>
                        <input className="allInputs" name="category" type="text" value={this.state.category}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="description">Description:</label>
                        <input className="allInputs" name="description" type="text" value={this.state.description}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="allDIvs">
                        <label className="allLabels" htmlFor="description">Image:</label>
                        {image}
                        <input className="allInputs" type="file" onChange={this.handleUpload}/>
                        {/*<button onClick={this.fileUploadHandle}>Upload</button>*/}
                    </div>
                    <div className="allDIvs">
                        <button className="submitButton" type="submit">ADD</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps,{getToken})(AddItems);
