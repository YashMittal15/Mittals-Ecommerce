import React from 'react'
import  { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from '../constants/productConstants'

function ProductEditScreen({match, history}) {
    const productId = match.params.id

    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)
    const [Brand, setBrand] = useState('')
    const [Category, setCategory] = useState('')
    const [InStock, setInStock] = useState(0)
    const [image, setImage] = useState('')
    const [Description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()


    const productDetails = useSelector(state => state.productDetails) 
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate) 
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.Name || product._Id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            }else {
                setName(product.Name)
                setPrice(product.Price)
                setBrand(product.Brand)
                setCategory(product.Category)
                setInStock(product.InStock)
                setImage(product.image)
                setDescription(product.Description)
            }
        }
    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _Id:productId,
            Name,
            Price,
            image,
            Brand,
            Category,
            InStock,
            Description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_Id', productId)
        setUploading(true)

        try{
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>Go Back</Link>
            <FormContainer>
                <h1>EDIT PRODUCTS</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}

                {loading ? <Loader/> : error ? <Alert variant='danger'>{error}</Alert> 
                   : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control  type='name' placeholder='Enter Name' value={Name} onChange={(e)=> setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control  type='number' placeholder='Enter Price' value={Price} onChange={(e)=> setPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control  type='text' placeholder='Upload Image' value={image} onChange={(e)=> setImage(e.target.value)}>
                        </Form.Control>
                        <Form.File id='image-file' Label='Click to Select Image' custom onChange={uploadFileHandler}></Form.File>
                        {uploading && <Loader/>}
                    </Form.Group>


                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control  type='text' placeholder='Enter brand' value={Brand} onChange={(e)=> setBrand(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='instock'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control  type='number' placeholder='Enter Stock Available' value={InStock} onChange={(e)=> setInStock(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control  type='text' placeholder='Enter Category' value={Category} onChange={(e)=> setCategory(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control  type='text' placeholder='Enter Category' value={Description} onChange={(e)=> setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update Now</Button>
                    </Form>
                  )}
                
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
