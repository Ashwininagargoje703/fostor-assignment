import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addRestaurant } from "./store/slice/restaurantSlice";
import Navbar from "./components/navbar";
import StarIcon from "@mui/icons-material/Star";
import ExploreComponent from "./components/Explore";
import PercentIcon from "@mui/icons-material/Percent";
import Slider from "./components/slider";

function App() {
  const { data } = useSelector((store) => store.restaurant);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const fetchRestaurant = async () => {
    try {
      let res = await fetch(
        `https://staging.fastor.in/v1/m/restaurant?city_id=118`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      res = await res.json();
      console.log(res, "data");

      if (res.length > 0) {
        dispatch(addRestaurant(res));
      }
    } catch (e) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    if (!user.user_id) {
      navigate("/login");
    }
    if (user.user_id) {
      fetchRestaurant();
    }
  }, [user]);

  return (
    <Box>
      <Navbar />
      <ExploreComponent />

      <Slider />

      <Box>
        <Typography fontSize={24} fontWeight={600} ml={2}>
          Popular once
        </Typography>

        {data.map((item) => {
          return (
            <Box
              key={item.restaurant_id}
              sx={{
                display: "flex",
                p: 2,
              }}
            >
              {/* Left Side: Image */}
              <Link
                to={`/restaurant/${item.restaurant_id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Box>
                  <img
                    src={item.images[0].url}
                    alt={item.restaurant_name}
                    style={{
                      width: isMobile ? "200px" : "400px",
                      maxHeight: isMobile ? "auto" : "200px",
                      borderRadius: 8,
                    }}
                  />
                </Box>
              </Link>

              <Link
                to={`/restaurant/${item.restaurant_id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Box ml={3}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {item.restaurant_name}
                  </Typography>

                  {item.location && (
                    <Typography>{item.location.location_address}</Typography>
                  )}

                  {!item.location && (
                    <Typography>
                      cakes, Pastry, Pasta, cakes, Pastry, Pastacakes, Pastry,
                      Pastacakes, Pastry, Pasta New Delhi
                    </Typography>
                  )}
                  <Typography color={"#d89d81"}>
                    <PercentIcon style={{ color: "#d89d81", marginTop: 5 }} /> 4
                    offers tranding
                  </Typography>

                  <br />
                  <Box display={"flex"} justifyContent={"space-between"}>
                    {item.rating && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <StarIcon />

                        <Typography sx={{ marginLeft: "8px" }}>
                          {item.rating.restaurant_avg_rating.toFixed(1)}
                        </Typography>
                      </Box>
                    )}

                    <Typography>
                      {item.currency.symbol}
                      {item.avg_cost_for_two}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default App;
