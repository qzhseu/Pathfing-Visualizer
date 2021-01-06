import { Snackbar } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React from 'react'

import './styles.css';

export default function Notification(props) {

    const {notify, setNotify}=props;

    if(notify.isOpen){
        setTimeout(()=>{ setNotify({
            ...notify,
            isOpen:false,
        })},3000);
    }
    
    const handleClose=(event, reason)=>{
        if(reason==='clickaway'){
            return 
        }
        setNotify({
            ...notify,
            isOpen:false,
        })
    }
    return (
        <div>
            <Snackbar
            className="snackbar"
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            onClose={handleClose}
            >
                <Alert 
                    severity={notify.type}
                    onClose={handleClose}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
