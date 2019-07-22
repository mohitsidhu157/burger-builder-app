import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
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
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    }
    addIngredientHandler= (type) => {
        const current = this.state.ingredients[type];
        const updated = current+1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updated;
        const sum  = Object.keys(updatedIngredient)
        .map(igKey=>{
            return updatedIngredient[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        // console.log(sum);
        const priceToAdd = INGREDIENT_PRICES[type];
        const currentPrice = this.state.totalPrice;
        const updatedPrice = currentPrice + priceToAdd;
        this.setState({ingredients : updatedIngredient, totalPrice : updatedPrice,purchasable : sum>0});
        ;
    }
    removeIngredientHandler = (type) => {
        const current = this.state.ingredients[type];
        if(current<=0){return;}
        const updated = current-1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updated;
        const sum  = Object.keys(updatedIngredient)
        .map(igKey=>{
            return updatedIngredient[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        // console.log(sum);
        const priceToRemove = INGREDIENT_PRICES[type];
        const currentPrice = this.state.totalPrice;
        const updatedPrice = currentPrice - priceToRemove;
        this.setState({ingredients : updatedIngredient, totalPrice : updatedPrice,purchasable : sum>0});
        // this.updatePurchasableState();
    }
    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }
    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable = {this.state.purchasable}
                    purchaseHandler = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;