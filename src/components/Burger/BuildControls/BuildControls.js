import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";
const controls = [
    { label : "Salad" , type:"salad"},
    {label : "Bacon" , type:"bacon"},
    {label : "Cheese" , type:"cheese"},
    {label : "Meat" , type:"meat"},
];
const buildControl = (props) => {
    
    return <div className={classes.BuildControls}>
            {
                controls.map(ing => {
                    return <BuildControl key={ing.label} label={ing.label}/>
                })
            }
    </div>;
}
export default buildControl;