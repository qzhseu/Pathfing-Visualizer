import React from 'react'

import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from "../../action/login";

import './styles.css';

export default function LogoutButton(props) {
    const{history, app}=props;
    const Logout=()=>{
        props.history.push("/login")
        logout(app);
    }

    return (
        <Button
            className ="signOut"  
            onClick={Logout} 
            color="secondary"
            variant="contained"
            startIcon={<ExitToAppIcon />}
        >
                    Sign Out
        </Button>
    )
}
