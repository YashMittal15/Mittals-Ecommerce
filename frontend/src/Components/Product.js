import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product({product}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._Id}`}>
             <Card.Img src={product.image} width='1200' height='400px' />
            </Link>
            <Card.Body>
            <Link to={`/product/${product._Id}`}>
             <Card.Title as="div">
                 <strong>{product.Name}</strong>
            </Card.Title>
            </Link>
             <Card.Text as="div"> 
             <div className="my-3">
                < Rating value = {product.rating} text={`${product.TotalReview}reviews`} color= {'#f8e825'}/>
             </div>
             </Card.Text>
             <Card.Text as="h3">
             ₹{product.Price}
             </Card.Text>
            </Card.Body>
            </Card>
        
    )
}

export default Product
