import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import React from 'react';
import "./styles.css";
import Stepper from './indexStepper';

export default function Tutorial(props) {
    const { tutorial } = props;

    return (
        <Dialog className='dialog' open={tutorial.isOpen}>
            
            <Stepper />
            <DialogActions className="dialogActions">

                <Button variant="contained" onClick={tutorial.onCancle}>Close</Button>
                
            </DialogActions>

        </Dialog>
    )
}

