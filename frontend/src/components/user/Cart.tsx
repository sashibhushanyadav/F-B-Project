import {
  Button,
  Card,
  Container,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../Navbar";
import { removeFromCart } from "../../slice/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { successToast } from "../../services/toaster.services";
import { BsFillCartCheckFill } from "react-icons/bs";

const Cart = () => {
  const { cartItem } = useSelector((state: any) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const returnTotalQuantity = () => {
    // let sum = 0;
    // cartItem.forEach((item: any) => {
    //   sum += item.qty;
    // });
    // return sum;
    return cartItem.reduce((acc: any, item: any) => acc + item.qty, 0);
  };
  const returnTotalPrice = () => {
    // let sum = 0;
    // cartItem.forEach((item: any) => {
    //   sum += item.qty*item.price;
    // });
    // return sum;
    return cartItem.reduce(
      (acc: any, item: any) => acc + item.qty * item.price,
      0
    );
  };
  return (
    <>
      <NavbarComponent />
      <Container>
        <h1 className="text-center">Shopping Cart</h1>
        {cartItem.length > 0 ? (
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                {cartItem.map((item: any) => {
                  return (
                    <ListGroup.Item key={item.productId}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={2}>
                          <span>{item.productName}</span>
                        </Col>
                        <Col md={2}>
                          <span>NPR. {item.price}</span>
                        </Col>
                        <Col md={2}>
                          <Select
                            value={item.qty}
                            label="Choose Quantity"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                          >
                            {[...Array(item.countInStock)].map((_, index) => {
                              return (
                                <MenuItem key={index + 1} value={index + 1}>
                                  {index + 1}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Col>
                        <Col md={2}>NPR. {item.qty * item.price}</Col>
                        <Col md={2}>
                          <IconButton
                            color="error"
                            onClick={() => {
                              dispatch(removeFromCart(item.productId));
                              successToast(
                                item.productName +
                                  " removed from cart successfully"
                              );
                            }}
                          >
                            <BsFillCartCheckFill />
                          </IconButton>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h6>
                      <b>Total Quantity: </b>
                      {returnTotalQuantity()}{" "}
                      {returnTotalQuantity() === 1 ? "Item" : "Items"}
                    </h6>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h6>
                      <b>Total Price: </b>NPR. {returnTotalPrice()}
                    </h6>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={cartItem.length === 0}
                      onClick={() => navigate("/shipping")}
                    >
                      Proceed to checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="text-center">
            Your cart is empty.
            <Link to={"/all/products"}>Continue Shopping</Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
