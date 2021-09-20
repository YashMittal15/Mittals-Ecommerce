import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Alert } from 'react-bootstrap'
import  Message  from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ match, Location, history }) {
    const productId = match.params.id
    const qty =  Location && Location.search ? Number(Location.search && Location.search.split('=')[1]) : 1
    console.log('qty:', qty)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    
    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler =() =>{
        history.push('/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>The Cart</h1>
                {cartItems.length === 0 ? (
                    
                    <Alert variant='info'>
                    <Alert.Heading>Add Something In Your Cart </Alert.Heading> 
                    <Link to='/' className='btn btn-light my-3'>Go Back</Link>
                   
                 </Alert>
                ) :(
                    <ListGroup variant= 'flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md ={2} >
                                    <Image src={item.Image} alt={item.Name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.Name}</Link>
                                    </Col>
                                    <Col md={2}>
                                    ₹{item.Price}
                                    </Col>
                                    <Col md={3}>
                                    <Form.Control 
                                           as="select" 
                                           value = {item.qty}
                                           onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.InStock).keys()].map((x)=>(
                                                    <option key={x + 1} value={x + 1}>
                                                        {x+1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                    <Button type= 'button' 
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                    > 
                                            <i className='fas fa-trash-alt'></i>
                                    </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>CART TOTAL ({cartItems.reduce((acc, item)=> acc + item.qty, 0)})</h2>
                            ₹{cartItems.reduce((acc, item)=> acc + item.qty * item.Price, 0).toFixed(2)}
                        </ListGroup.Item>

                    </ListGroup>
                    <ListGroup.Item>
                        <Button 
                         type='button' 
                         className='btn-block'
                         disabled={cartItems.length === 0}
                         onClick={checkoutHandler}
                        >
                            Proceed To Pay
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
