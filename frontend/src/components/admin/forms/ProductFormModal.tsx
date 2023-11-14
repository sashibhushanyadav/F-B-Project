import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Col, Row } from "react-bootstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ProductFormModal({
  open,
  handleClose,
  categories,
}: any) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product Form</DialogTitle>
        <DialogContent>
          <Row>
            <Col>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Product Name"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col>
              <TextField
                autoFocus
                margin="dense"
                id="brand"
                name="brand"
                label="Product Brand"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                autoFocus
                margin="dense"
                id="price"
                name="price"
                label="Product Price"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col>
              <TextField
                autoFocus
                margin="dense"
                id="countInStock"
                name="countInStock"
                label="Product Stock"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" name="category">
                  <MenuItem value="">Select category here</MenuItem>
                  {categories.map((category: any) => {
                    return (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Col>
            <Col>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Product Description"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                margin="normal"
                id="file"
                name="productImage"
                type="file"
                fullWidth
                variant="outlined"
              />
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
