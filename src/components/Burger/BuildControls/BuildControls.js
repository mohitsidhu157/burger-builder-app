import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";
const controls = [
    { label : "Salad" , type:"salad"},
    {label : "Bacon" , type:"bacon"},
    {label : "Cheese" , type:"cheese"},
    {label : "Meat" , type:"meat"},
];
const buildControls = (props) => {
    
    return <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>

            {

                controls.map(ing => {
                    return <BuildControl 
                                key={ing.label} 
                                label={ing.label} 
                                added={()=>props.ingredientAdded(ing.type)}
                                removed={()=>props.ingredientRemoved(ing.type)} 
                                disable={props.disabled[ing.type]}   
                            />
                })
                
            }
            <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
    </div>;
}
export default buildControls;