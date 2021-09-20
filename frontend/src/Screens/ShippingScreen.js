import React from 'react'
import  { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import CheckoutProgress from '../Components/CheckoutProgress'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [pinCode, setPinCode] = useState(shippingAddress.pinCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)

    const submitHandler =(e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({name, address, city, pinCode, country, phoneNumber}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutProgress step1 step2/>
            <h1>Enter Destination</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control  required type='text' placeholder='Enter Name' value={name ? name: ''} onChange={(e)=> setName(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>

            <Form.Group controlId='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control  required type='text' placeholder='Enter Address' value={address ? address: ''} onChange={(e)=> setAddress(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>


              <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control  required type='text' placeholder='Enter City Name' value={city ? city: ''} onChange={(e)=> setCity(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>


              <Form.Group controlId='pinCode'>
                  <Form.Label>PinCode</Form.Label>
                  <Form.Control  required type='number' placeholder='Enter PinCode Here' value={pinCode ? pinCode: ''} onChange={(e)=> setPinCode(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>


              <Form.Group controlId='country'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control  required type='text' placeholder='Enter Country Name' value={country ? country: ''} onChange={(e)=> setCountry(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='phoneNumber'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control  required type='text' placeholder='Enter Phone Number' value={phoneNumber ? phoneNumber: ''} onChange={(e)=> setPhoneNumber(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>
              
              <Button type='submit' variant='primary'>Proceed</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen