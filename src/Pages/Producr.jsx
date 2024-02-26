import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Button, Pagination, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { MdOutlineStar } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addUserCart } from '../Redux-Toolkit/CartStore';


function Product() {
    const Dispatch = useDispatch()
    const [product, setProduct] = useState([])

    const [pageData, setPagedata] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    useEffect(() => {
        axios.get('https://dummyjson.com/products').then(data => {
            const product = data.data.products;
            setProduct(product)
        }).catch(err => {
            console.log(err);
        })
    }, [page])

    // FOR HANDLING NEXT PAGINATION
    const handleNext = () => {
        if (page === pageCount) return page;
        setPage(page + 1)
    }


    // FOR HANDLING PREV PAGINATION
    const handlePrev = () => {
        if (page === 1) return page;
        setPage(page - 1);
    }

    useEffect(() => {
        const pageDataCount = Math.ceil(product.length / 4);
        setPageCount(pageDataCount)

        if (page) {
            const LIMIT = 4;
            const pageSkip = LIMIT * page;
            const skipData = product.slice(page === 1 ? 0 : pageSkip - LIMIT, pageSkip);

            setPagedata(skipData)
        }
    }, [product])

    const { userCartValue } = useSelector(state => state.userCart)
    // console.log(userCartValue);

    const cartBtnContol = (e) => {
        return userCartValue.find(items => items.id === e)
    }

    // for add user Cart
    const addCart = (e) => {
        const userCart = { ...e, amaunt: 1 }
        Dispatch(addUserCart(userCart))
    }


    return (
        <section className="container">
            {
                product.length > 0 ?
                    <>
                        <Row xs={1} md={2} lg={4} className="g-4 p-1 pt-5">
                            {pageData.map((items, idx) => (
                                <Col key={idx}>

                                    <Card >
                                        <Card.Link style={{ textDecoration: 'none', color: 'unset' }} href={`/cartditels/${items.id}`} >
                                            <Card.Img className='cart-img' variant="top" src={items.thumbnail} />
                                            <Card.Body className='p-2'>
                                                <Card.Title>{items.title.length > 10 ? items.title.substring(0, 10) : items.title}</Card.Title>
                                                <Card.Text>
                                                    {items.description.length > 30 ? items.description.substring(0, 20) : 'no hello'}
                                                </Card.Text>
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <h6 style={{ color: '#f98800' }}>${items.price}</h6>
                                                    <div className='d-flex align-items-center pb-1'>
                                                        <MdOutlineStar style={{ color: '#f98800' }} />
                                                        <small style={{ fontSize: '12px' }}>{items.rating}</small>
                                                    </div>
                                                </div>
                                            </Card.Body>

                                        </Card.Link>
                                        <Button style={{ pointerEvents: cartBtnContol(items.id) ? 'none' : '' }} onClick={() => addCart(items)} className='m-1' variant={cartBtnContol(items.id) ? 'danger' : 'primary'} size='sm'>Add to Cart</Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <div className="pagination d-flex justify-content-end my-5">
                            <Pagination>
                                <Pagination.First onClick={handlePrev} disabled={page === 1} />
                                {
                                    Array(pageCount).fill(null).map((items, index) => {
                                        return (
                                            <Pagination.Item active={page === index + 1} key={index} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                                        )
                                    })
                                }

                                <Pagination.Last onClick={handleNext} disabled={page === pageCount} />
                            </Pagination>
                        </div>
                    </>
                    :
                    <div className="loding-box">
                        <div className="loding-body">
                            <h2>Loding...</h2>
                            <Spinner animation='border' variant='secondary' />
                        </div>
                    </div>
            }
        </section>
    );
}

export default Product;