import React from 'react'
import  { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen({Location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const redirect = Location && Location.search ? Location.search.split('=')[1] : '/' 

    const userLogin = useSelector(state => state.userLogin) 
    const {error, loading, userInfo} = userLogin
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
          <h1>SIGN IN</h1>
          {error && <Alert variant='danger'>{error}</Alert>}
          {loading && <Loader/>}

          <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control type='password' placeholder='Enter Passowrd' value={password} onChange={(e)=> setPassword(e.target.value)}>

                  </Form.Control>
              </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>  
            <Row className='py-3'>
                <Col>
                 New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default LoginScreen


