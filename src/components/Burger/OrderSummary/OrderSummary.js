import React, {Component} from 'react';
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component{
    componentWillUpdate(){
        console.log("[OrderSummary] willUpdate");
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return <li key={igKey}>
                      <span style={{textTransform : 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                  </li>
        }) 
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the folowing ingredients : </p>
                <ul>{ingredientSummary}</ul>
                <p><strong>Total price : {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
            </Aux>
        );
    }
}
export default OrderSummary;