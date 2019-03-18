import React, {Component} from 'react';
import "./Styles/Cards.css"
import  shoes from "./assets/shoes.png"
import Input from "reactstrap/es/Input";

class Cards extends Component {
    render(){
        return (
            <div className="Cards">
                <h4>Men's Athletic Shoes</h4>
                <img src={shoes}/>
                <form>
                    <div>
                        <label>Price: </label>
                        <Input type="text"/>
                    </div>
                </form>
                <button>BUY</button>
            </div>
        );
    }
}

export default Cards;
