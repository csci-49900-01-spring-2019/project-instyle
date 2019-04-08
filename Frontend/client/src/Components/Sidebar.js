import React, { Component } from "react";

import "../Styles/Sidebar.css"

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
             isActive: "false"
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
                 <ul>
                     <div>
                        <div className="eachLi">
                            <li className="genderLi"><a  href="/male">Male</a></li>
                        </div>
                         <ul className="wrappingCategories">
                             <div className="eachLi">
                                 <li><a  href="/male/tshirts">T-Shirts</a></li>
                             </div>
                             <div className="eachLi">
                                 <li><a  href="/male/shirts">Shirts</a></li>
                             </div>
                             <div className="eachLi">
                                 <li><a  href="/male/pants">Pants</a></li>
                             </div>
                             <div className="eachLi">
                                 <li><a  href="/male/shoes">Shoes</a></li>
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
