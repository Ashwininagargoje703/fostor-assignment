import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRestaurant } from "./store/slice/restaurantSlice";
import Navbar from "./components/navbar";
import ExploreComponent from "./components/Explore";

function App() {
  const { data } = useSelector((store) => store.restaurant);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      <Typography>Popular once</Typography>
      {data.map((item) => {
        return (
          <Box key={item.restaurant_id} sx={{ display: "flex" }}>
            {/* Left Side: Image */}
            <Box>
              <img
                src={item.images[0].url}
                alt={item.restaurant_name}
                style={{ width: "400px", height: "200px", borderRadius: 8 }}
              />
            </Box>
            <Box>
              <Typography variant="h6">
                Restaurant Name: {item.restaurant_name}
              </Typography>
              <Typography>
                Average cost: {item.currency.symbol}
                {item.avg_cost_for_two}
              </Typography>

              {item.location && (
                <Typography>
                  Location: {item.location.location_address}
                </Typography>
              )}

              {item.location && (
                <Typography>
                  Location: {item.location.location_address_2}
                </Typography>
              )}

              {item.rating && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="restaurant-rating"
                    value={item.rating.restaurant_avg_rating}
                    precision={0.1} // Adjust the precision as needed
                    readOnly
                  />
                  <Typography sx={{ marginLeft: "8px" }}>
                    {item.rating.restaurant_avg_rating.toFixed(1)} (
                    {item.rating.count} ratings)
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default App;
