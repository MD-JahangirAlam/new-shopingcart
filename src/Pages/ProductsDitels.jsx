import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { LuHeading1 } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";


function ProductsDitels() {
  const { id } = useParams();

  const [getProduct, setProduct] = useState();
  const [loding, setLogin] = useState(true);
  const [ratings, setRating] = useState([
    { rating: false },
    { rating: false },
    { rating: false },
    { rating: false },
    { rating: false }
  ])

  const RatingControl = (rating) => {
    for (let i = 0; i < rating; i++) {
      setRating(items => [...items, items[i].rating = true])
    }
  }

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((data) => {
        setProduct(data.data);
        setLogin(false);
        RatingControl(Math.floor(data.data.rating));
      })
      .catch((err) => {
        console.log(err.Message);
      });
  }, []);
  return (
    <Container className="pt-5" >
      {loding ? (
        <h1>Loding...</h1>
      ) : (
        <Row style={{ backgroundColor: '#fff' }}>
          <Col>
            <div className="d-flex justify-content-center p-5" style={{ borderRight: '2px solid #ddd' }}>
              <div style={{ width: "250px", height: "300px", border: '1px solid #333' }}>
                <Card.Img
                  style={{ width: "250px", height: "300px", objectFit: "cover" }}
                  className="cart-img"
                  src={getProduct.thumbnail}
                  variant="top"
                />
              </div>
            </div>
          </Col>
          <Col className="p-5">
            <div>
              <h3>{getProduct.title}</h3>
              <h4>{getProduct.brand}</h4>
              <p>
                {getProduct.description}
              </p>
              <div style={{ width: '90px' }} className="d-flex justify-content-between">
                <h6>
                  ${getProduct.price}
                </h6>
                <small style={{ textDecoration: 'line-through', fontSize: '12px', color: 'green' }}>
                  %{
                    getProduct.discountPercentage
                  }
                </small>
              </div>
              <ul className="d-flex" style={{ listStyle: 'none', padding: 'unset' }}>
                <li>
                  <MdOutlineStar
                    style={ratings[0].rating ? { color: '#f98800' } : { color: '#ddd' }}
                  />
                </li>
                <li>
                  <MdOutlineStar
                    style={ratings[1].rating ? { color: '#f98800' } : { color: '#ddd' }}
                  />
                </li>
                <li>
                  <MdOutlineStar
                    style={ratings[2].rating ? { color: '#f98800' } : { color: '#ddd' }}
                  />
                </li>
                <li>
                  <MdOutlineStar
                    style={ratings[3].rating ? { color: '#f98800' } : { color: '#ddd' }}
                  />
                </li>
                <li>
                  <MdOutlineStar
                    style={ratings[4].rating ? { color: '#f98800' } : { color: '#ddd' }}
                  />
                </li>
              </ul>
              <div>
                <Button variant="primary">Cart Now</Button>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductsDitels;
