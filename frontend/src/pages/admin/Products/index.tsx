import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getData } from "../../../services/axios.service";
import Loader from "../../../components/Loader";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { config } from "../../../config";
import axios from "axios";
import { useSelector } from "react-redux";
import { errorToast } from "../../../services/toaster.services";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Products = () => {
  const [products, setProducts] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { jwt } = useSelector((state: any) => state.auth);

  const getProducts = async () => {
    setIsLoading(true);
    const resp = await getData("/product");
    setProducts(resp.data);
    setIsLoading(false);
  };
  const deleteProduct = async (id: string) => {
    try {
      const resp = await axios.delete(`${config.SERVER_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(resp)
    } catch (error: any) {
      errorToast(error.response.data.error);
    }
    // OLD WAY
    // const deleteHandler = products.results.filter((product: any) => {
    //   return product.id !== id;
    // });
    // setProducts((prev:any) => {
    //   return { ...prev, results: deleteHandler };
    // });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {products.status === "success" && (
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Stock</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="left">Brand</StyledTableCell>
                  <StyledTableCell align="left">Created At</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.results.map((product: any) => {
                  return (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        <img
                          src={product.productImage}
                          width={"150"}
                          height={"100"}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.countInStock}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.category}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.brand}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {/* {new Date(product.createdAt).getFullYear() +
                          "-" +
                          new Date(product.createdAt).getMonth() +
                          "-" +
                          new Date(product.createdAt).getDay()} */}
                        {moment(product.createdAt).format("MMM Do YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Button variant="primary" className="me-2">
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(e) => deleteProduct(product.id)}
                        >
                          <AiFillDelete />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </TableContainer>
  );
};
export default Products;
