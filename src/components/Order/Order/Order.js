import React from 'react'
import classes from './Order.css'

const order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingrediantOutput = ingredients.map(ig => {
        return (
            <span className={classes.Ingrediant} key={ig.name}>
                {ig.name} ({ig.amount})
            </span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingrediants: {ingrediantOutput}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    );
}

export default order