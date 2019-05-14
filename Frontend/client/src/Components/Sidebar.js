import React, { Component } from "react";

import "../Styles/Sidebar.css"

import axios from "axios"
import Card from "./Card";
import {Link, NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
             isActive: "false",
            hasFilter:false

        };
        this.toggleSidebar = this.toggleSidebar.bind(this)
    }

    toggleSidebar(){
        this.setState({
            isActive: !this.state.isActive
        })
    }

    setFilter = (gender,type)=>{
        this.setState({hasFilter:true});
        this.props.handleSetFilter(gender,type);
    };

    removeFilter = ()=>{
        this.setState({hasFilter:false});
        this.props.handleRemoveFilter();
    };

    render() {
        return(
          <div className="globalSidebar">
             <div className="sidebar"  id={this.state.isActive ? 'active' : null}>
                 <div onClick={this.toggleSidebar} className="toggle-btn" >
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
                                 <li onClick={()=>this.setFilter("M","T-Shirts")}>
                                         T-Shirts
                                 </li>
                             </div>
                             <div className="eachLi">
                                 <li onClick={()=>this.setFilter("M","Shirts")}>
                                         Shirts
                                 </li>
                             </div>
                             <div className="eachLi">
                                 <li onClick={()=>this.setFilter("M","Pants")}>
                                         Pants
                                 </li>
                             </div>
                             <div className="eachLi">
                                 <li onClick={()=>this.setFilter("M","Shoes")}>
                                         Shoes
                                 </li>
                             </div>
                         </ul>
                     </div>
                     </ul>
                     <ul>
                         <div>
                         <div className="eachLi">
                            <li className="genderLi">Female</li>
                         </div>
                         <ul className="wrappingCategories">
                             <div className="eachLi">
                                 <li onClick={()=>this.setFilter("F","T-Shirts")}>
                                     T-Shirts
                                 </li>
                             </div>
                             <div className="eachLi">
                                 <li onClick={()=>this.setFilter("F","Shirts")}>
                                     Shirts
                                 </li>
                             </div>
                             <div className="eachLi">
                                 <li onClick={()=>this.setFilter("F","Pants")}>
                                     Pants
                                 </li>
                             </div>
                             <div className="eachLi">
                                 <li onClick={()=>this.setFilter("F","Shoes")}>
                                     Shoes
                                 </li>
                             </div>
                         </ul>
                         </div>
                     </ul>
                 {this.state.hasFilter?
                     (<ul>
                         <ul className="wrappingCategories">
                             <div className="eachLi">
                                 <li>
                                     <a onClick={()=>this.removeFilter()}>Remove Filter</a>
                                 </li>
                             </div>
                         </ul>
                     </ul>):""
                 }
             </div>
          </div>
        );
    }
}

export default SideBar;
