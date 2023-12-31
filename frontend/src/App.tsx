import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import PageNotFound from "./pages/errors/PageNotFound";
import { ToastContainer } from "react-toastify";
import Products from "./pages/admin/Products";
import SecureRoute from "./routes/SecureRoute";
import UserProducts from "./pages/user/Products";
import AdminRoute from "./routes/AdminRoute";
import ProductDetail from "./components/user/ProductDetail";
import Cart from "./components/user/Cart";
import CheckoutState from "./context/CheckoutState.tsx";
import ParentContainer from "./pages/user/ParentContainer/index.tsx";
import Success from "./pages/Success/index.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="" element={<SecureRoute />}>
          <Route path="" element={<AdminRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
          <Route path="/all/products" element={<UserProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout-steps"
            element={
              <CheckoutState>
                <ParentContainer />
              </CheckoutState>
            }
          />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/payment/success" element={<Success />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
