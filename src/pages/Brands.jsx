import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import FirmaCard from "../components/FirmaCard";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStart } from "../features/authSlice";
// import { fetchFail, getSuccess } from "../features/stockSlice";
import useStockCall from "../hooks/useStockCall";
import { flex } from "../styles/globalStyles";

const Brands = () => {
  const { getStockData } = useStockCall();
  const { firms } = useSelector((state) => state.stock);
  useEffect(() => {
    // getFirms();
    getStockData("firms");
  }, []);
  console.log(firms);
  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Brands
      </Typography>
      <Button variant="contained">New Brand</Button>

      <Grid container sx={flex}>
        {firms?.map((firm) => (
          <Grid item>
            <BrandCard firm={firm} key={firm.id} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Brands;
