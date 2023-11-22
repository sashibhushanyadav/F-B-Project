import { Container } from "@mui/material";
import NavbarComponent from "../../../components/Navbar";
import CheckoutSteps from "../../../components/user/CheckoutSteps";
import CheckoutContext from "../../../context/CheckoutContext";
import { useContext } from "react";
import Shipping from "../Shipping";
import PaymentMethod from "../PaymentMethod.tsx";

const ParentContainer = () => {
  const { activeStep, setActiveStep }: any = useContext(CheckoutContext);
  return (
    <div>
      <NavbarComponent />
      <Container>
        <CheckoutSteps activeStep={activeStep} setActiveStep={setActiveStep} />
        {activeStep === 0 && <Shipping setActiveStep={setActiveStep} />}
        {/* {activeStep === 1 && <PaymentMethod />} */}
      </Container>
    </div>
  );
};

export default ParentContainer;
