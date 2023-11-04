import React from "react";
import { Box, Typography, Grid, Paper, useMediaQuery } from "@mui/material";

function ExploreComponent() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box display="flex" justifyContent={"space-between"}>
      <Box
        p={2}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        maxWidth={isMobile ? 200 : "100%"}
      >
        <Typography
          fontSize={isMobile ? 24 : 34}
          fontWeight={700}
          color={"#acb8c1"}
        >
          Karan
        </Typography>
        <Typography fontSize={isMobile ? 16 : 20}>
          Let's Explore This Evening
        </Typography>
      </Box>
      {/* Right Side: Images */}
      <Grid container spacing={2} flex={1} p={2}>
        <Grid item xs={6}>
          <img
            src="https://vectorain.com/wp-content/uploads/2017/02/Pr%20085%20-%20TRI%20-%2001_12_10%20-%20035.jpg"
            alt="Image 1"
            style={{ width: "100%", height: "auto" }}
          />
          <Typography
            justifyContent={"center"}
            textAlign={"center"}
            color={"#bfc8d4"}
          >
            Offer
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://previews.123rf.com/images/rastudio/rastudio1512/rastudio151203116/49738469-wallet-with-monoey-line-icon-for-web-mobile-and-infographics-vector-white-icon-on-the-blue-gradient.jpg"
            alt="Image 2"
            style={{ width: "100%", height: "auto" }}
          />
          <Typography
            justifyContent={"center"}
            textAlign={"center"}
            color={"#bfc8d4"}
          >
            wallet
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExploreComponent;
