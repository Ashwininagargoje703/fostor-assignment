import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import PercentIcon from "@mui/icons-material/Percent";
import StarIcon from "@mui/icons-material/Star";

function SingleRestaurant() {
  const { data } = useSelector((store) => store.restaurant);
  const [singleData, setSingleData] = useState([]);
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    let temp = data.filter((item) => item.restaurant_id === id);
    setSingleData(temp);
  }, [id]);

  return singleData.map((item) => (
    <>
      <Navbar />
      <Box
        key={item.restaurant_id}
        justifyContent={"center"}
        textAlign={isMobile ? "left" : "center"}
        alignContent={"center"}
        p={2}
      >
        <img
          width={isMobile ? "100%" : "40%"}
          height={isMobile ? "400px" : "auto"}
          style={{
            borderRadius: 10,
          }}
          src={item.images[0].url}
          alt={item.restaurant_name}
        />
        <Box
          display={"flex"}
          justifyContent={isMobile ? "space-between" : "center"}
          alignContent={"center"}
          gap={isMobile ? "" : 40}
        >
          <Typography fontSize={isMobile ? 20 : 24} fontWeight={700}>
            {item.restaurant_name}
          </Typography>

          {item.rating && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarIcon />
              <Typography sx={{ marginLeft: "8px" }}>
                {item.rating.restaurant_avg_rating.toFixed(1)}
              </Typography>
            </Box>
          )}
        </Box>

        {item.location && (
          <Typography fontSize={18} color={"#505259"}>
            Location: {item.location.location_address}
          </Typography>
        )}

        {item.location && (
          <Typography>{item.location.location_address2}</Typography>
        )}

        <Typography color={"#d89d81"}>
          <PercentIcon style={{ color: "#d89d81", marginTop: 5 }} /> 4 offers
          tranding
        </Typography>

        <Typography>
          Our delicate vanilla cake swirled with chocolate and filled with mocha
          chocolate chip cream and a layer of dark chocolate ganache
        </Typography>
      </Box>
    </>
  ));
}

export default SingleRestaurant;
