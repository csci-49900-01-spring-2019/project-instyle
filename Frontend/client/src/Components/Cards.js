import React, {Component} from 'react';
import "../Styles/Cards.css"
import  shoes from "../assets/shoes.png"

class Cards extends Component {
    constructor(props){
        super(props)
        this.state = {
            price: 50
        }
    }
    render(){
        return (
            <div className="cardsRows">
                <div className="cardsCols">
                    <img src={shoes}/>
                    <form>
                        <div>
                            <label className="priceLabel">Price: $</label>
                            <input className="priceInput"  disabled={true} type="number" value={this.state.price}/>
                        </div>
                        <a href="/shoes/redShoe">Men's Athletic Shoes</a>
                    </form>
                </div>
            </div>
        );
    }
}

export default Cards;
