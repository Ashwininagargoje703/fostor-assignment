import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpWRjEuic5RP0aiDbYQ5Y29-NEyY5wwRHpqw&usqp=CAU",
  },
  {
    label: "Bird",
    imgPath:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4bjRSefUzYoLaMOpUgFQzwpkzi6mISC94Iw&usqp=CAU",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROA8ka5uP4e72mGoRQ248S78kCODn92OVdCUmx8vcEwmwwJ22q2WnwspNThvUBKA9VEPk&usqp=CAU",
  },
];

function Slider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center items horizontally
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div
            key={step.label}
            style={{
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,

                  maxWidth: "60%",
                  overflow: "hidden",
                  width: "100%",

                  borderRadius: 8,
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
      />
    </Box>
  );
}

export default Slider;
