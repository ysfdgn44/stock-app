import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirmaCard from "../components/FirmaCard";
import FirmModal from "../components/modals/FirmModal";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchStart } from "../features/authSlice";
// import { fetchFail, getSuccess } from "../features/stockSlice";
import useStockCall from "../hooks/useStockCall";
import { flex } from "../styles/globalStyles";

const Firms = () => {
  // const { token } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const getFirms = async () => {
  //   const BASE_URL = "https://11195.fullstack.clarusway.com/";
  //   const url = "firms";

  //   try {
  //     dispatch(fetchStart());
  //     const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };
  const { getStockData } = useStockCall();
  const { firms } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [info, setInfo] = React.useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  const handleClose = () => setOpen(false);
  useEffect(() => {
    // getFirms();
    getStockData("firms");
  }, []);
  console.log(firms);
  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Firm
      </Button>
      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex}>
        {firms?.map((firm) => (
          <Grid item>
            <FirmaCard
              firm={firm}
              key={firm.id}
              setOpen={setOpen}
              info={info}
              setInfo={setInfo}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
