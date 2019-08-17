import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
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
        purchasing : false,
        loading : false
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
    continueHandler = () => {
        // alert("Continue succesful!");
        this.setState({loading : true})
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : 'Max',
                address : {
                    street : "Teststreet 1",
                    zipCode : '41345',
                    country : 'germany'
                },
                email : "test@test.com"
            },
            deliveryMethod : "Fastest"
        }
        axios.post('/orders.json',order).then(res=>this.setState({loading : false,purchasing : false})).catch(err=>this.setState({loading : false,purchasing : false}))
    }
    modalClosed = () =>{
        this.setState({purchasing : false});
    }
    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = (<OrderSummary 
            ingredients={this.state.ingredients}
            cancel={this.modalClosed}
            price={this.state.totalPrice.toFixed(2)}
            continue={this.continueHandler}
        />);
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
                    {orderSummary}
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