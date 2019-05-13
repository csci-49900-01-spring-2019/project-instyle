import React, { Component } from "react";

import "../Styles/Sidebar.css"

import axios from "axios"
import Card from "./Landing";
import {NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
             isActive: "false",
            data:[]

        }
        this.toggleSidebar = this.toggleSidebar.bind(this)
    }

    componentDidMount() {
        axios.get('/api/posting')
            .then(response => {
                console.log("In Sidebar: ", response.data.data)

                this.setState({
                    data:response.data.data

                })

            })
    }

    GetMaleShoes(){
            (this.state.data.map(post => {
                // console.log("posts",post)
                return post.category === "shoes"?
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
                    : <div>"No data"</div>
            }))
    }

    GetFemaleShoes(){

    }

    toggleSidebar(){
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render() {
        return(
          <div className="globalSidebar">
             <div className="sidebar" onClick={this.toggleSidebar} id={this.state.isActive ? 'active' : null}>
                 <div className="toggle-btn" >
                     <span className="eachSpan"></span>
                     <span className="eachSpan"></span>
                     <span className="eachSpan"></span>
                 </div>
                 <div className="classCat">
                     <h3 className="categories">Categories</h3>
                 </div>
                 <ul>
                     <div>
                        <div className="eachLi">
                            <li className="genderLi">Male</li>
                        </div>
                         <ul className="wrappingCategories">
                             <div className="eachLi">
                                 <li>T-Shirts</li>
                             </div>
                             <div className="eachLi">
                                 <li>Shirts</li>
                             </div>
                             <div className="eachLi">
                                 <li>Pants</li>
                             </div>
                             <div className="eachLi">
                                 <li>Shoes</li>
                             </div>
                         </ul>
                     </div>
                     </ul>
                     <ul>
                         <div>
                         <div className="eachLi">
                            <li className="genderLi"><a  href="/female">Female</a></li>
                         </div>
                         <ul className="wrappingCategories">
                             <div className="eachLi">
                                 <li><a  href="/female/tshirts">T-Shirts</a></li>
                             </div>
                             <div className="eachLi">
                                 <li><a  href="/female/shirts">Shirts</a></li>
                             </div>
                             <div className="eachLi">
                                 <li><a  href="/female/pants">Pants</a></li>
                             </div>
                             <div className="eachLi">
                                 <li><a  href="/female/shoes">Shoes</a></li>
                             </div>
                         </ul>
                         </div>
                     </ul>
             </div>
          </div>
        );
    }
}

export default SideBar;
