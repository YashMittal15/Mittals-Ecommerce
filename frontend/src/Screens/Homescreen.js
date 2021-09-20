import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col} from 'react-bootstrap'
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProducts } from '../actions/productActions'

function Homescreen({history}) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList

    let keyword = history.location.search
    console.log(keyword)
    useEffect(()=>{
         dispatch(listProducts(keyword))
 
    },[dispatch, keyword])
    return (
        <div>
            <h1>Trending Products</h1>
            {loading ? <Loader />
             :error ? <Message variant='dark'>{error}</Message>
             : 
             <Row>
             {products.map(product =>
              (
                  <Col key={product._Id} sm={12}md={6}lg={4}xl={3}>
                   <Product product={product}/>                
                  </Col>
              )
              )}
          </Row>
        }
        </div>
    )
}

export default Homescreen
