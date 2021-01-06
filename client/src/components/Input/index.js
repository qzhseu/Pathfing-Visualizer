import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchBar from "material-ui-search-bar";

import "./styles.css";



export class SearchTool extends React.Component {
  state = {
    value: ""
  }
  render() {
    const { value, onChange, onCancelSearch } = this.props;
    return (
      <SearchBar
        className="searchBar"
        value={value}
        onChange={onChange}
        onCancelSearch={onCancelSearch}
      />
    );
  }
}

/* Component for the Input field, a wrapper around MUI TextField */
export class InputText extends React.Component {
  render() {
    const { label, value, onChange, name , helperText } = this.props;
    const styles = {
        helper: {
            color: 'red',
            fontSize: '.8em',
        }
    }

    return (
      <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
        <TextField
          name={name}
          label={label}
          id={name}
          defaultValue={value || ""}
          className="input"
          margin="normal"
          onChange={onChange}
          helperText={helperText}
          FormHelperTextProps={{ style: styles.helper }}
        />
      </Grid>
    );
  }
}

export class InputPassword extends React.Component {

  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    const { label, value, onChange, name, helperText } = this.props;
    const styles = {
      helper: {
          color: 'red',
          fontSize: '.8em',
      }
    }
    return (
      <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
        <TextField
          name={name}
          label={label}
          type={this.state.showPassword ? 'text' : 'password'}
          id={name}
          defaultValue={value || ""}
          className="input"
          margin="normal"
          helperText={helperText}
          FormHelperTextProps={{ style: styles.helper }}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
    );
  }
}