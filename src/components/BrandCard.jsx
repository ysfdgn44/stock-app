import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle, flex } from "../styles/globalStyles";
import useStockCall from "../hooks/useStockCall";

export default function BrandCard({ firm }) {
  const { deleteStockData } = useStockCall();
  return (
    <Card
      sx={{
        p: 2,
        width: "300px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "1px 3px 1px 2px  rgba(0,0,0,0.4)",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firm?.name}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ p: 1, objectFit: "contain", height: "150px" }}
        image={firm?.image}
        title="firm-image"
      />

      <CardActions sx={flex}>
        <EditIcon sx={btnStyle} />
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStockData("firms", firm?.id)}
        />
      </CardActions>
    </Card>
  );
}
