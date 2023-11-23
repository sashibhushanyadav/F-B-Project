import { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../../slice/productSlice";

const Shipping = ({ setActiveStep }: any) => {
  const shpData = useSelector((state: any) => state.product.shippingAddress);
  const [shippingData, setShippingData] = useState<any>(shpData);
  const dispatch = useDispatch();

  function handleChange(e: any) {
    let data = { ...shippingData, [e.target.name]: e.target.value };
    dispatch(setShippingAddress(data));
    setShippingData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setShippingAddress(shippingData));
    setActiveStep(1);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter Address"
          type="text"
          className="mt-2"
          name="address"
          value={shpData.address}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Enter City"
          type="text"
          className="mt-2"
          name="city"
          value={shpData.city}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Enter Postal Code"
          type="number"
          className="mt-2"
          name="postalCode"
          value={shpData.postalCode}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Enter Country"
          type="text"
          className="mt-2"
          name="country"
          value={shpData.country}
          onChange={handleChange}
        />
        <Button type="submit" className="mt-2">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default Shipping;
