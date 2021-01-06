import React from 'react';
import "./styles.css";
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import mazeImage01 from "../../img/maze01.gif"
import mazeImage02 from "../../img/maze02.png"
import mazeImage03 from "../../img/maze03.gif"
import mazeImage04 from "../../img/maze04.gif"
import mazeImage05 from "../../img/maze05.gif"
import mazeImage06 from "../../img/maze06.gif"
import mazeImage07 from "../../img/maze07.gif"
import mazeImage08 from "../../img/maze08.gif"

const tutorialSteps = [
    {
        label: 'Welcome to Mazer! This is a short tutorial to introduce all features of this application. Click Close to skip the tutorial.',
        imgPath: mazeImage01,
    },
    {
        label: 'Mazer is a visualizing execution of pathfinding algorithms step by step. Pathfinding algorithms are able to finding the shortest path between the start node and end node.',
        imgPath: mazeImage02,
    },
    {
        label: 'We have Practice section and Game section.',
        imgPath: mazeImage03,
    },
    {
        label: 'In practice section, you can drag the start and end nodes to change their position.',
        imgPath: mazeImage04,
    },
    {
        label: 'Your can build the wall by yourself, click the white grid to create wall, click again to delete the wall grid.',
        imgPath: mazeImage05,
    },
    {
        label: 'Choose an algorithm to visualize the pathfinding process.',
        imgPath: mazeImage06,
    },
    {
        label: 'Click Clear Board to clean the grid.',
        imgPath: mazeImage07,
    },
    {
        label: 'You can check your profile and game history by moving your mouse over the icon, click the icon to update a new icon.',
        imgPath: mazeImage08,
    },
];

export default function Stepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="tutorialRoot">
            <Paper square elevation={0} className="tutorialHeader">
                <Typography>{tutorialSteps[activeStep].label}</Typography>
            </Paper>
            <img
                className="tutorialImg"
                src={tutorialSteps[activeStep].imgPath}
                alt={tutorialSteps[activeStep].label}
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
          
                }
                
            />
        </div>
    );
}
