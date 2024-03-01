import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { addUserCart } from '../Redux-Toolkit/ProductStore';


function Product() {
  const { userProduct } = useSelector(state => state.UserProduct);
  const Dispatch = useDispatch()
  const { id } = useParams();
  // id ? console.log(id) : console.log('there is not')

  const [data, setData] = useState()


  // const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then(res => {
      const datavalue = res.data
      setData(datavalue);
    })
  }, [id]);



  const paginationControl = async () => {
    try {
      const pageNumber = await Math.ceil(data.length / 5);
      setPageCount(pageNumber)

      if (id) {
        const LIMIT = 5;
        const PageLimit = LIMIT * id;
        const pageValue = await data.slice(id == 1 ? 0 : PageLimit - LIMIT, PageLimit)
        setPageData(pageValue)
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    paginationControl()

  }, [data])




  // FOR ADD CART USER
  const addUserCarts = (item) => {
    const cartItem = { ...item, Amaunt: 1 }
    Dispatch(addUserCart(cartItem))
  }

  const cartBtnControl = e => {
    return userProduct.find(item => item.id == e);
  }

  return (
    <div className='container mt-5'>
      <h1 style={{ textAlign: 'center', padding: '20px 0' }}>product list</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data ?
          pageData.map((item, index) => {
            return (
              <div key={index} className="col">
                <div className="card p-3">
                  <Link to={`/cartshow/${item.id}`} style={{ width: "100%", textAlign: 'center' }}>
                    <img src={item.image} style={{ width: 150, height: 170, margin: 'auto' }} className="card-img-top" alt="..." />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{item.title.length > 30 ? item.title.substring(0, 30) : item.title}</h5>
                    <p className="card-text">{item.description.length > 70 ? item.description.substring(0, 69) : item.description}</p>
                    <span>${item.price}</span>
                  </div>
                  <div className="btn-box d-flex justify-content-center">
                    <button disabled={cartBtnControl(item.id)} className="btn btn-primary" onClick={() => addUserCarts(item)}>cart</button>
                  </div>
                </div>
              </div>
            )
          })
          : <h2>Loding...</h2>
        }
      </div>
      <div className="pagination-box d-flex justify-content-end p-4 m-4">
        <div className="pagination-body">
          <span className={`${Number(id) == 1 ? 'action-btn' : ''}`} style={{ padding: '5px', border: '1px solid #ddd', cursor: 'pointer' }}>
            <Link style={{ color: '#000' }} to={`/product/${id == 1 ? id : id - 1}`}>prev</Link>
          </span>
          {
            Array(pageCount).fill(null).map((item, index) => {
              return (
                <span className={`${Number(id) == index + 1 ? 'action-btn' : ''}`} key={index} style={{ padding: '5px', border: '1px solid #ddd', cursor: 'pointer' }}>
                  <Link to={`/product/${index + 1}`} style={{ color: '#000' }} >{index + 1}</Link>
                </span>

              )
            })
          }
          <span className={`${Number(id) == pageCount ? 'action-btn' : ''}`} style={{ padding: '5px', border: '1px solid #ddd', marginLeft: '3px', cursor: 'pointer' }}>
            <Link to={`/product/${id == pageCount ? id : Number(id) + 1}`} style={{ color: '#000' }}>next</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product