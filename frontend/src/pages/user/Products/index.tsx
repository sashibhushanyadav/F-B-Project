import { useEffect, useState } from "react";
import NavbarComponent from "../../../components/Navbar";
import { getData, getDataWithParams } from "../../../services/axios.service";
import { Col, Row } from "react-bootstrap";
import ProductList from "../../../components/user/ProductList";
import Loader from "../../../components/Loader";
import Filter from "../../../components/user/Filter";
import { successToast } from "../../../services/toaster.services";
import { addToCart, removeFromCart } from "../../../slice/productSlice";
import { useDispatch } from "react-redux";
import { payloadForCartItem } from "../../../helpers/product";

const UserProducts = () => {
  const [products, setProducts] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [sort, setSort] = useState<any>([]);
  const [filters, setFilters] = useState<any>({});

  const dispatch = useDispatch();

  const getProducts = async () => {
    setIsLoading(true);
    const resp = await getData("/product");

    const newCategories = resp.data.results.map((result: any) => {
      return result.category;
    });
    setCategories([...new Set(newCategories)]);

    setProducts(resp.data);
    setIsLoading(false);
  };
  const fetchFilteredProduct = async () => {
    setIsLoading(true);
    const resp = await getDataWithParams("/product", filters);

    setProducts(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFilteredProduct();
  }, [filters]);

  useEffect(() => {
    handleFilters("sort", sort.join(","));
  }, [sort]);

  const handleSort = (value: string) => {
    sort.includes(value)
      ? setSort(sort.filter((s: string) => s !== value))
      : setSort((prev: any) => {
          return [...prev, value];
        });
  };
  const handleFilters = (key: any, value: any) => {
    if (value !== "") {
      setFilters({ ...filters, [key]: value });
    }
  };

  const addProdToCart = (product: any) => {
    const data: any = payloadForCartItem(product, 1);
    dispatch(addToCart(data));
    successToast(data.productName + " added to cart successfully");
  };

  const removeProdToCart = (product: any) => {
    dispatch(removeFromCart(product.id));
    successToast(product.name + " removed from cart successfully");
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <NavbarComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="clearfix mb-2 me-5">
            <span className="float-end">
              <Filter
                categories={categories}
                handleSort={handleSort}
                handleFilters={handleFilters}
                sort={sort}
              />
            </span>
          </div>
          {products.status === "success" && (
            <Row>
              {products.results.map((product: any) => {
                return (
                  <Col key={product.id} sm={12} md={6} lg={4} xs={3}>
                    <ProductList
                      product={product}
                      addProdToCart={addProdToCart}
                      removeProdToCart={removeProdToCart}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default UserProducts;
