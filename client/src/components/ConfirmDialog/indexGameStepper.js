import React from 'react';
import "./styles.css";
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import gameImage01 from "../../img/game01.png"
import gameImage02 from "../../img/game02.gif"
import gameImage03 from "../../img/game03.gif"
import gameImage04 from "../../img/game04.gif"
import gameImage05 from "../../img/game05.gif"
import gameImage06 from "../../img/game06.gif"
import gameImage07 from "../../img/game07.gif"
import gameImage08 from "../../img/game08.gif"

const tutorialSteps = [
    {
        label: 'This is a short tutorial to introduce the Game section. Click YES to skip the tutorial and begin the game, click CANCEL back to Practice page.',
        imgPath: gameImage01,
    },
    {
        label: 'We will time you as the game starting and record the completion time for each round, please be as soon as possible to finish the maze.',
        imgPath: gameImage02,
    },
    {
        label: 'We provide several rounds for you to play with, our Administrator will update mazes after a period of time.',
        imgPath: gameImage03,
    },
    {
        label: 'You can not change the location of the Start and End nodes in the Game. Click the grids to build your own path, click again to cancel it.',
        imgPath: gameImage04,
    },
    {
        label: 'Click the SUBMIT button when you finish and the timer will stop.',
        imgPath: gameImage05,
    },
    {
        label: 'Please make sure that you create a continuous path, otherwise you will ask you to REPLAY or VISUALIZE using our algorithm.',
        imgPath: gameImage06,
    },
    {
        label: 'After SUBMIT, the system will give a score that is based on how similar between your path and the algorithm searched path. The path will be highlighted when the mouse move over each of them.',
        imgPath: gameImage07,
    },
    {
        label: 'You can check your profile to see your history score.',
        imgPath: gameImage08,
    },
];

export default function GameStepper() {
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
