import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngrediant/BurgerIngrediant';

const burger = (props) => {


    //pretvoranje na state so e objekt so poveke parametri, vo niza, i pravenje na taa niza flat za da moze da se vidi kolku elementi ima dodeleno od stateot direkno.
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);


    //proverka, dokolku nema elementi vo taa niza od stateot, stavi go paragrafot so vika da dodades, inace ke gi nacrta soodvetnite
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please insert ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;