import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductModal from "../components/modals/ProductModal";
import useStockCall from "../hooks/useStockCall";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { btnStyle } from "../styles/globalStyles";

const Products = () => {
  const { getProCatBrand, deleteStockData } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [info, setInfo] = useState({
    category_id: "",
    brand_id: "",
    name: "",
  });
  const columns = [
    {
      field: "id",
      headerName: "#",
      minWidth: 40,
      maxWidth: 70,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
      flex: 3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      minWidth: 110,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 100,
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      renderCell: ({ id }) => (
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          sx={btnStyle}
          onClick={() => deleteStockData("products", id)}
        />
      ),
    },
  ];

  // const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleClose = () => setOpen(false);
  useEffect(() => {
    // getStockData("products");
    // getStockData("categories");
    // getStockData("brands");
    getProCatBrand();
  }, []);
  // console.log(product);
  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>
      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          rows={products}
          autoHeight
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      {/* <Grid container sx={flex}>
        {product?.map((product) => (
          <Grid item>
            <ProductCard
              product={product}
              key={product.id}
              setOpen={setOpen}
              info={info}
              setInfo={setInfo}
            />
          </Grid> */}
      {/* ))}
      </Grid> */}
    </div>
  );
};

export default Products;
