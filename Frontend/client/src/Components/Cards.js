import React, {Component} from 'react';
import "../Styles/Cards.css"
import  shoes from "../assets/shoes.png"

class Cards extends Component {
    render(){
        return (
            <div className="Cards">
                <h4>Men's Athletic Shoes</h4>
                <img src={shoes}/>
                <form>
                    <div>
                        <label>Price: </label>

                    </div>
                </form>
                <button>BUY</button>
            </div>
        );
    }
}

export default Cards;
