import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4
    }
    addIngredientHandler= (type) => {
        const current = this.state.ingredients[type];
        const updated = current+1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updated;
        const priceToAdd = INGREDIENT_PRICES[type];
        const currentPrice = this.state.totalPrice;
        const updatedPrice = currentPrice + priceToAdd;
        this.setState({ingredients : updatedIngredient, totalPrice : updatedPrice});
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;