import React from 'react'
import  { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { ListOrders } from '../actions/orderActions'

function OrderListScreen({history}) {

    const dispatch=useDispatch()
    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() =>{
        if(userInfo && userInfo.isAdmin){
            dispatch(ListOrders()) 
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <div>
            <h1>ORDERS</h1>
            {loading
            ?(<Loader/>)
            : error
                ?(<Alert variant='danger'>{error}</Alert>)
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._Id}>
                                    <td>{order._Id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>₹{order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ):  (
                                           <i className='fas fa-cross' style={{color:'red'}}></i>
                                        )}
                                    </td>

                                    <td>{order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ):  (
                                           <i className='fas fa-cross' style={{color:'red'}}></i>
                                        )}
                                    </td>

                                    <td>
                                        <LinkContainer to={`/orders/${order._Id}`}>
                                            <Button variant='light' className='btn-sm'>
                                            DETAILS
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </div>
    )
}

export default OrderListScreen
