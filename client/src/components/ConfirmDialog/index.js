import { IconButton,Button, Dialog, DialogActions, DialogContent, DialogContentText} from '@material-ui/core'
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close'
import "./styles.css";
import successImg from "../../img/success.jpg"
import failImg from "../../img/fail.jpg"
import GameStepper from './indexGameStepper';


export function GameTutorial(props) {
    const { gameTutorial}=props;
    
    return (
        <Dialog className='dialog' open={gameTutorial.isOpen}>
            <GameStepper />
            <DialogActions className="dialogActions">
                <Button variant="contained" onClick={gameTutorial.onCancle}>Cancle</Button>
                <Button variant="contained" color="secondary" onClick={gameTutorial.onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default function ConfirmDialog(props) {
    const { confirmDialog } = props;

    return (
        <Dialog className='dialog' open={confirmDialog.isOpen}>
            <DialogContent className="dialogContent">
                <h3>{ confirmDialog.title}</h3>
                <p>{ confirmDialog.subTitle}</p>
            </DialogContent>
            <DialogContentText>
                <p>{confirmDialog.text}</p>
            </DialogContentText>
          
            <DialogActions className="dialogActions">
                <Button variant="contained" onClick={confirmDialog.onCancle}>Cancle</Button>
                <Button variant="contained" color="secondary" onClick={confirmDialog.onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export function ShowResultDialog(props){
    const {resultDialog} = props;
    return (
            <Dialog className='dialog' open={resultDialog.isOpen}>
                 <IconButton className="closeButton" color="primary" aria-label="upload picture" 
                             onClick={resultDialog.onCancle}>
                        <CloseIcon />
                </IconButton>
                <DialogContent className="dialogContent_Img">
                    <img className="dialogImg" alt="" src={resultDialog.pass? successImg : failImg}></img>
                </DialogContent>
                <DialogContentText className="dialogContent">
                    <h3>{resultDialog.title}</h3>
                    <p>{resultDialog.score}</p>
                    <p>{resultDialog.subtitle}</p>
                    <p>{resultDialog.notice}</p>
                </DialogContentText>
                <DialogActions className="dialogActions">
                    <Button variant="contained"  color="primary" onClick={resultDialog.Replay}>Replay</Button>
                    {(resultDialog.pass && resultDialog.finalRound) ? <Button variant="contained" color="primary"onClick={resultDialog.Next}>Next</Button> : <></>}
                    <Button variant="contained" color="primary" onClick={resultDialog.Visualize}>Visualize</Button>
                </DialogActions>
            </Dialog>
        
    )
}

export function SelectRoundDialog(props){
    const{ mazes, selectRoundDialog} = props;
    const buttonBroup=[];
    if(mazes){
        mazes.map((maze)=>{
            buttonBroup.push(<Grid item xs={4}><button variant="contained" onClick={()=>{selectRoundDialog.goRound(maze.round)}}>{`Round ${maze.round}`}</button></Grid>);
        })
    }
    return (
        <Dialog className='dialog' open={selectRoundDialog.isOpen}>
            <IconButton className="closeButton" color="primary" aria-label="upload picture" 
                        onClick={selectRoundDialog.onCancle}>
                    <CloseIcon />
            </IconButton>
            <DialogContent className="dialogContent">
                <h3>{ selectRoundDialog.title}</h3>
            </DialogContent>
            <DialogActions className="dialogButtonGroup">
                <Grid container spacing={1.5}>
                {
                    buttonBroup
                }
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export function AlertDialog(props){
    const {AlertDialog} =props;
    return(
        <Dialog className='dialog' open={AlertDialog.isOpen}>
            <IconButton className="closeButton" color="primary" aria-label="upload picture" 
                        onClick={AlertDialog.onCancle}>
                    <CloseIcon />
            </IconButton>
            <DialogContent className="dialogContent">
                <h3>{ AlertDialog.title}</h3>
                <p>{ AlertDialog.subTitle}</p>
            </DialogContent>
            <DialogContentText>
                <p>{AlertDialog.text}</p>
            </DialogContentText>
        </Dialog>
    )
}
