import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../services/axios.service";
import Loader from "../Loader";
import NavbarComponent from "../Navbar";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  // console.log(
  //   window.location.pathname.slice(10, window.location.pathname.length)
  // );
  // console.log(window.location.pathname.split("/")[2]);

  useEffect(() => {
    const getProductById = async () => {
      setIsLoading(true);
      const resp = await getData(`/product/${productId}`);
      setProduct(resp);
      setIsLoading(false);
    };
    getProductById();
  }, []);
  return (
    <>
      <NavbarComponent />{" "}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {product.status === "success" && (
            <>
              <Row>
                <Col md={6}>
                  <Image
                    src={product.data.productImage}
                    alt={product.data.name}
                    fluid
                    style={{ height: "80vh", width: "100%" }}
                  />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{product.data.name}</ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        name="read-only"
                        value={product.averageRating}
                        precision={0.5}
                        readOnly
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Price:</b>${product.data.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Description:</b>
                      {product.data.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price</Col>
                        <Col>
                          <strong>${product.data.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status</Col>
                        <Col>
                          <strong>
                            {product.data.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col className="mt-3">Quantity</Col>
                        <Col>
                          <FormControl
                            variant="standard"
                            sx={{ minWidth: 140 }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Choose Quantity
                            </InputLabel>
                            <Select
                              value=""
                              label="Choose Quantity"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              {[...Array(product.data.countInStock)].map(
                                (_, index) => {
                                  return (
                                    <MenuItem key={index + 1} value={index + 1}>
                                      {index + 1}
                                    </MenuItem>
                                  );
                                }
                              )}
                            </Select>
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        variant="contained"
                        fullWidth
                        disabled={product.data.countInStock == 0}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetail;