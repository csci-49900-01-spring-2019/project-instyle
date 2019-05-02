import React, { Component } from "react";


import axios from "axios";



import "../Styles/AddItems.css";
// import shirts from "../assets/shirts.jpg";
import {connect} from "react-redux";
import {getToken} from "../actions/authAction";


class AddItems extends Component{
    constructor(props){
        super(props)
        this.state = {
            product_name:"",
            price:"",
            size:"",
            brand:"",
            gender:"",
            category:"",
            description:"",
            token:"",
            selectedFile:null
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
            // sold

        })
    }
    handleSubmit(evt) {

        if (this.props.token != null) {
            axios.post("/addPosting", {
                token:this.props.token,
                product_name: this.state.product_name,
                price: this.state.price,
                size: this.state.size,
                brand: this.state.brand,
                gender: this.state.gender,
                category: this.state.category,
                description: this.state.description

            })
                .then(response => {
                    console.log(response)
                    this.setState({
                        id:response.data.id
                    });
                    // this.props.setIdInApp(response.data.id);
                     console.log("id:",this.state.id)
                    // console.log("id:",th)

        //             console.log("product_name: ", this.state.product_name)
        //             console.log("price: ", this.state.price)
        //             console.log("size: ", this.state.size)
        //             console.log("brand: ", this.state.brand)
        //             console.log("gender: ", this.state.gender)
        //             console.log("category: ", this.state.category)
        //             console.log("description: ", this.state.description)
                })
                .catch(function (error) {
                    console.log("no token: "+ error.message);
                })
        }

        else{
            console.log("No token")
        }
        evt.preventDefault();
        this.reset(evt);
    }

    fileSelectorHandler = evt =>{
        // console.log(evt.target.files[0]);
        this.setState({
            selectedFile: evt.target.files[0]
        })
    }

    fileUploadHandle = () => {
        // axios.post("")
    }

    render(){
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
                        <input className="allInputs" type="file" onChange={this.fileSelectorHandler}/>
                        <button onClick={this.fileUploadHandle}>Upload</button>
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
