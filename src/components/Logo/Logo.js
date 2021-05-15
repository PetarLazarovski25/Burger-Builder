import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="JadiBurger"/>
        </div>
    );
}

export default logo