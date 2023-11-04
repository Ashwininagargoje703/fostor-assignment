import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRestaurant } from "./store/slice/restaurantSlice";

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
      {data.map((item) => {
        return (
          <Box key={item.restaurant_id}>
            <img
              width="250px"
              height="150px"
              src={item.images[0].url}
              alt={item.restaurant_name}
            />
            <Typography>Restaurant Name: {item.restaurant_name}</Typography>
            <Typography>
              Average cost: {item.currency.symbol}
              {item.avg_cost_for_two}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default App;
