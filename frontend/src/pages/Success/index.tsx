import { Link } from "react-router-dom";
import NavbarComponent from "../../components/Navbar";

const Success = () => {
  return (
    <div>
      <NavbarComponent />
      <h3>
        Your payment is successfull. <Link to={"/all/products"} />
        Continue Shopping
      </h3>
    </div>
  );
};

export default Success;
