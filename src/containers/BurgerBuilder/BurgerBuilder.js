import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../AxiosOrder'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-a81a4-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        })
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    orderedHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    cancelOrderHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    continueOrderHandler = () => {

        // this.setState({ loading: true })



        const quaryParams = [];
        for (let i in this.state.ingredients) {
            quaryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        quaryParams.push("price=" + this.state.totalPrice.toFixed(2))
        const queryString = quaryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });


    }


    render() {

        const disabledBtn = {
            ...this.state.ingredients
        };

        for (let key in disabledBtn) {
            disabledBtn[key] = disabledBtn[key] <= 0;
        }

        let orderSummary = null


        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingAdded={this.addIngredientHandler}
                        ingRemoved={this.removeIngredientHandler}
                        disabled={disabledBtn}
                        price={this.state.totalPrice}
                        ordered={this.orderedHandler}
                        purchasable={this.state.purchasable}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                close={this.cancelOrderHandler}
                continue={this.continueOrderHandler}
                price={this.state.totalPrice}
            />
        }


        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.cancelOrderHandler} >
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);