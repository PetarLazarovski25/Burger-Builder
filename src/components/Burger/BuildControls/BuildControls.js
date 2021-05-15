import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'}
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {controls.map(ctrl => {
                return <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingAdded(ctrl.type)}
                remove={() => props.ingRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
            })}
            <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
            >ORDER</button>
        </div>
    );

}

export default buildControls;