import { Button, Card } from "@mui/material";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../../config";
import { errorToast } from "../../../services/toaster.services";
import axios from "axios";
import { createOrder } from "../../../slice/orderSlice";

const CheckoutStep = ({ setActiveStep }: any) => {
  const { cartItem, shippingAddress, paymentMethod } = useSelector(
    (state: any) => state.product
  );

  const { jwt } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const returnTotalQuantity = () => {
    return cartItem.reduce((acc: any, item: any) => acc + item.qty, 0);
  };
  const returnShippingPrice = () => {
    if (returnSubTotalPrice() <= 2000) {
      return 0;
    } else {
      return 0.01 * returnSubTotalPrice();
    }
  };
  const returnTaxPrice = () => {
    return 0.13 * returnSubTotalPrice();
  };
  const returnSubTotalPrice = () => {
    return cartItem.reduce(
      (acc: any, item: any) => acc + item.qty * item.price,
      0
    );
  };
  const returnGrandTotalPrice = () => {
    return returnSubTotalPrice() + returnTaxPrice() + returnShippingPrice();
  };

  const payOnline = async (e: any) => {
    e.preventDefault();
    const orderData = {
      orderItems: cartItem,
      shipping: shippingAddress,
      payment: { paymentMethod },
      itemsPrice: returnSubTotalPrice(),
      taxPrice: returnTaxPrice(),
      shippingPrice: returnShippingPrice(),
      totalPrice: returnGrandTotalPrice(),
    };
    try {
      const { data } = await axios.post(
        `${config.SERVER_URL}/order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (data.status === "success") {
        dispatch(createOrder(data.data));
        paymentEsewa(data.data);
      }
    } catch (error: any) {
      errorToast(error.response.data.error);
    }
  };
  function paymentEsewa(order: any) {
    let path = "https://uat.esewa.com.np/epay/main";
    let params: any = {
      amt: order.totalPrice,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: order.totalPrice,
      pid: order._id,
      scd: "EPAYTEST",
      su: "http://localhost:5173/payment/success",
      fu: "http://merchant.com.np/page/esewa_payment_failed",
    };
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }
  return (
    <>
      <Row className="mt-4">
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address: {shippingAddress.postalCode}, {shippingAddress.address}
                , {shippingAddress.city}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>Method: {paymentMethod.toUpperCase()}</p>
            </ListGroup.Item>
            <ListGroup variant="flush" className="mt-2">
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
                        <span>{item.qty}</span>
                      </Col>
                      <Col md={2}>NPR. {item.qty * item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
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
                  <b>Sub Total Price: </b>NPR. {returnSubTotalPrice()}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  <b>Shipping Price: </b>NPR. {returnShippingPrice()}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  <b>Tax Price: </b>NPR. {returnTaxPrice()}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  <b> Grand Total Price: </b>NPR. {returnGrandTotalPrice()}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button
                  variant="outlined"
                  color="success"
                  className="mt-2 me-2"
                  onClick={payOnline}
                >
                  Pay
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  className="mt-2"
                  onClick={(e) => setActiveStep(1)}
                >
                  Go back
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutStep;
