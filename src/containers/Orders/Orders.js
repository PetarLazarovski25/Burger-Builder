import React, { Component } from 'react'
import axios from '../../AxiosOrder'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'

import Order from '../../components/Order/Order/Order'

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
        showOrder: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                })
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
            })
    }

    deleteOrderHandler = (index) => {
        this.setState({
            showOrder: false
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />

                    ))
                }
            </div>
        );
    }
}

export default ErrorHandler(Orders, axios);