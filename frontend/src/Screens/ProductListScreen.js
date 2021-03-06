import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Row, Col, Alert} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { listProducts, deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
function ProductListScreen({ history, match }) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        dispatch({ type:PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        } 

        if(successCreate){
            history.push(`/admin/product/${createdProduct._Id}/edit`)
        }else{
            dispatch(listProducts())
        }
    },[dispatch, history, successDelete, userInfo, successCreate, createdProduct])


    const deleteHandler = (id) => {

        if (window.confirm('Do You Want To Delete This Product?')) {
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler =() => {
        dispatch(createProduct())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>  

            {loadingDelete && <Loader/>}
            {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Alert variant='danger'>{error}</Alert>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._Id}>
                                            <td>{product._Id}</td>
                                            <td>{product.Name}</td>
                                            <td>???{product.Price}</td>
                                            <td>{product.Category}</td>
                                            <td>{product.Brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._Id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._Id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen