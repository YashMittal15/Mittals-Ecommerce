import React from 'react'
import  { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { register } from '../actions/userActions'
import PasswordStrengthMeter from '../Components/PasswordStrengthMeter'

function RegisterScreen({Location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const redirect = Location && Location.search ? Location.search.split('=')[1] : '/' 

    const userRegister = useSelector(state => state.userRegister) 
    const {error, loading, userInfo} = userRegister
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Password does not match. Please Try Again')
        }else{
            dispatch(register(name, email, password))
        }
        
    }
    return (
        <FormContainer>
            <h1>SIGN IN</h1>
            {message && <Alert variant='danger'>{message}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading && <Loader/>}
            
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control  required type='name' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control required type='password' placeholder='Enter Passowrd' value={password} onChange={(e)=> setPassword(e.target.value)}>
                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control required type='password' placeholder='Confirm Passowrd' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}>

                  </Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>Register Now</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                 Already Registered? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>

            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
