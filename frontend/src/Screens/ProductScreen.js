import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button,Card, Form } from 'react-bootstrap'
import  Rating  from '../Components/Rating'
import  Loader  from '../Components/Loader'
import  Message  from '../Components/Message'
import { listProductDetails } from '../actions/productActions'

function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)


  const dispatch = useDispatch()
  const productDetails = useSelector(state =>state.productDetails)
  const {loading,error, product} = productDetails

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
        console.log(qty)
  
    },[dispatch, match])
    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
             <Loader />
             : error
             ? <Message variant ='danger' >{error}</Message>
             : (
                <Row>
                <Col md={6}>
                <Image src={product.image} alt={product.Name} width='550px' height='400px' fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.Name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value ={product.rating} text= {`${product.TotalReview}reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                           Price: ₹{product.Price}
                        </ListGroup.Item>
                 
                        <ListGroup.Item>
                           Description: {product.Description}
                        </ListGroup.Item>

                 </ListGroup>
                </Col>


                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                    <strong>₹{product.Price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                          {product.InStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.InStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1'>
                                        <Form.Control 
                                           as="select" 
                                           value = {qty}
                                           onChange={(e) => setQty(e.target.value)}
                                        >
                                            {
                                                [...Array(product.InStock).keys()].map((x)=>(
                                                    <option key={x + 1} value={x + 1}>
                                                        {x+1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                       <ListGroup.Item>
                           <Button
                           onClick={addToCartHandler}
                           className='btn-block'
                           disabled={product.InStock===0} 
                           type='button'>
                            Add To Cart
                           </Button>
                       </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

             )

            }
            
        </div>
    )
}

export default ProductScreen
