import React, { Component } from "react";

import axios from "axios";


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
            description:""
        }
    }
    handleChange(evt){
        this.setState({[evt.target.name]:evt.target.value});
    }

    handleSubmit(evt){
        evt.preventDefault();
        axios.post("/addPosting",{
            product_name:this.state.product_name,
            price:this.state.price,
            size:this.state.size,
            brand:this.state.brand,
            gender:this.state.gender,
            category:this.state.category,
            description:this.state.description

        })
            .then(response => {
                console.log(response)
                console.log("product_name: ", this.state.product_name)
                console.log("price: ", this.state.price)
                console.log("size: ", this.state.size)
                console.log("brand: ", this.state.brand)
                console.log("gender: ", this.state.gender)
                console.log("category: ", this.state.category)
                console.log("description: ", this.state.description)
            })
    }

    render(){
        return(
            <div>
                <form>
                    <div>
                        <label htmlFor="product_name">Product Name</label>
                        <input name="product_name" type="text" value={this.state.product_name}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input name="price" type="text" value={this.state.price}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="size">Size</label>
                        <input name="size" type="text" value={this.state.size}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input name="brand" type="text" value={this.state.brand}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <input name="gender" type="text" value={this.state.gender}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input name="category" type="text" value={this.state.category}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input name="description" type="text" value={this.state.description}  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <button onSubmit={this.handleSubmit.bind(this) }>ADD</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddItems;