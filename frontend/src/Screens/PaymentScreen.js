import React from 'react'
import  { useState, useEffect } from 'react'
import { Form, Button,Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import CheckoutProgress from '../Components/CheckoutProgress'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        history.push('/shipping')

    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutProgress step1 step2 step3/>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Desired Payment Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' 
                                    label ='PayPal Or Other Bank Cards' 
                                    id='paypal' 
                                    name='paymentMethod' 
                                    checked 
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>

            </Form>
            
        </FormContainer>
    )
}

export default PaymentScreen
