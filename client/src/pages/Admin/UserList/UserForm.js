import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper'

import {InputText,InputPassword} from "../../../components/Input";
import "./styles.css";



/* Component for the Student Form */
class UserForm extends React.Component {
    render() {
      const {
        userName,
        handleChange,
        userEmail,
        userPassword,
        addUser,
        errors
      } = this.props;
  
      return (
         <Paper className='userlist_paper' >
            <Grid className="user-form" container spacing={5}>
                {/* Inputs to add student */}
                <InputText
                name="userName"
                value={userName}
                onChange={handleChange}
                label="Username"
                helperText={errors.username ? errors.username : ""}
                />

                <InputText
                name="email"
                value={userEmail}
                onChange={handleChange}
                label="Email"
                helperText={errors.email ? errors.email : ""}
                />
                
                <InputPassword
                name="password"
                value={userPassword}
                onChange={handleChange}
                label="Password"
                helperText={errors.password ? errors.password : ""}
                />

                <Grid
                className="user-form__button-grid"
                item xl={2} lg={2} md={12} s={12} xs={12}
                >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addUser}
                    className="user-form__submit-button"
                >
                    Add User
                </Button>
                </Grid>
            </Grid>
         </Paper>
      );
    }
  }
  
  export default UserForm;