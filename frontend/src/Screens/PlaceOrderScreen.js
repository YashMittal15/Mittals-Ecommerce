import React from 'react'
import  { useState, useEffect } from 'react'
import { Button,Row, Col, ListGroup, Image, Card, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProgress from '../Components/CheckoutProgress'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({history}) {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const dispatch=useDispatch()
    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.Price*item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 50
    cart.taxPrice = Number((0.18)*cart.itemsPrice).toFixed(2) 
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(3)

    if(!cart.paymentMethod){
        history.push('/payment')
    }

    useEffect(()=> {
        if(success){
            history.push(`/orders/${order._Id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,

        }))
    }
    return (
        <div>
            <CheckoutProgress step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping To: </strong>
                                <br></br>
                                {cart.shippingAddress.name}, {cart.shippingAddress.phoneNumber},
                                <br></br>
                                {cart.shippingAddress.address},{cart.shippingAddress.city},
                                <br></br>
                                {cart.shippingAddress.pinCode},{cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method : </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Items Ordered</h2>
                            {cart.cartItems.length === 0 ? <Alert variant='info'>
                                Your Cart Is Empty
                            </Alert> :(
                                <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src ={item.Image} alt={item.Name} fluid rounded />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.Name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X ₹{item.Price} = ₹{item.qty*item.Price}

                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                                
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>₹{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>₹{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>₹{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Alert variant='danger'>{error}</Alert>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block' 
                                    disabled={cart.cartItems===0} 
                                    onClick={placeOrder}
                                >
                                    Proceed To Payment
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
