import React, { Component } from "react";

import "../Styles/Sidebar.css"

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
             isActive: false
        }
        this.toggleSidebar = this.toggleSidebar.bind(this)
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
                 <ul >
                     <div className="eachLi">
                         <li><a  href="/tshirts">T-Shirts</a></li>
                     </div>
                     <div className="eachLi">
                         <li><a  href="/shirts">Shirts</a></li>
                     </div>
                     <div className="eachLi">
                         <li><a  href="/pants">Pants</a></li>
                     </div>
                     <div className="eachLi">
                         <li><a  href="/shoes">Shoes</a></li>
                     </div>
                 </ul>
             </div>
          </div>
        );

    }
}

export default SideBar;
