import React from 'react';
import icon from '../../img/defaultIcon.png';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import Dashboard from './dashboard';
import './styles.css';
import { updateImage, getUserImage} from "../../action/image";
// import ImageAvatars from './userIcon';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            imageURL: "",
            message: { type: "", body: "" }
        };
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        getUserImage(this);
    }
    
    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }
   
    render() {

        const { app } = this.props;
        return (
            <div className="dropdownPathFinding">
                <button className="dropbtnIcon" onClick={this.handleOpenDialog}>
                    <img className="icon" src={this.state.imageURL} alt="User Icon"></img>
                    <i className="fa fa-caret-down"></i>
                </button>
                <Dialog className='dialog' open={this.state.openDialog} onCancel={this.handleCloseDialog}>
                    <Dashboard dashboardPage={this} />
                    <DialogActions className="dialogActions">
                        <Button variant="contained" onClick={this.handleCloseDialog}>Close</Button>
                    </DialogActions>
                </Dialog>
                <div className="dropdownPathFinding-content">
                    <p>Signed in as {app.state.currentUser.username}</p>
                    <p>Email: {app.state.currentUser.email}</p>
                    <p>History:
                        {app.state.scores.map((item) => {
                        const { round, bestScore } = item;
                        return (
                            <p>{`Round ${round} : ${bestScore}`}</p>
                        )
                    })}
                    </p>
                </div>
            </div>
            
        )
    }
}