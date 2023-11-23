import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPaymentMethod } from "../../../slice/productSlice";

const PaymentMethod = ({ activeStep, setActiveStep }: any) => {
  const [paymentMethod, setPaymentMethod] = useState<any>("esewa");
  const dispatch = useDispatch();

  function submitHandler(e: any) {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    setActiveStep(2);
  }

  return (
    <div>
      <h1 className="text-center text-primary">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Select Payment Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="esewa"
            name="radio-buttons-group"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="esewa" control={<Radio />} label="Esewa" />
            <FormControlLabel
              value="khalti"
              control={<Radio />}
              label="Khalti"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <Button
          variant="outlined"
          color="success"
          className="mt-2 me-2"
          type="submit"
        >
          Continue
        </Button>
        <Button
          variant="outlined"
          color="error"
          className="mt-2"
          onClick={(e) => setActiveStep(0)}
        >
          Go back
        </Button>
      </Form>
    </div>
  );
};

export default PaymentMethod;
