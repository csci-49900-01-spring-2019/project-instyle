import React, { Component } from "react";
import Card from "./Card";

import axios from "axios"

class FilteredPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        axios.get('/api/posting')
            .then(response => {
                // console.log("In cards: ", response.data.data)

                this.setState({
                    data:response.data.data

                })

            })
    }

    render(){
        const category = "Shoes";
        const gender = "M";
        let filterMale = this.state.data.filter(
            (post)=> post.gender.indexOf(gender) !== -1
        )
        let filterShoes = filterMale.filter(
            (post) => {
                return post.category.indexOf(category) !== -1
            }
        )

        filterShoes.map(post => {
            // console.log("posts",post)
            return(
                <div key={post.id}>
                    <Card id = {post.id}
                          imageUrl = {post.imageUrls[0]}
                          product_name = {post.product_name}
                          brand = {post.brand}
                          price = {post.price}
                          description = {post.description}
                          gender ={post.gender}
                          size = {post.size}
                          sold = {post.sold}
                          uid = {post.uid}
                    />
                </div>
            )})

        return(
            <div>
                {filterMale}
            </div>
        );
        }

}

export default FilteredPost;