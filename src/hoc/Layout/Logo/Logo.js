import React from 'react';
import burgerLogo from "../../../Assets/Images/burger-logo.png";
import classes from "./Logo.module.css";
const logo = (props) => {
    return <div className={classes.Logo}>
        <img src={burgerLogo} alt="MYBurger"/>
    </div>
}
export default logo;