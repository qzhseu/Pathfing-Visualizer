import React, { Component }from "react";
import { withRouter } from 'react-router-dom';

import DataTable from './UserTable';
import Header from '../../../components/Header'
import UserForm from './UserForm'
import Notification from "../../../components/Notification";
import Navbar from '../../../components/SideBar/Navbar'

import {addUser, getUsers} from '../../../action/userlist'

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state={
      page: "UserList",
      userName: "",
      userEmail: "",
      userPassword: "",
      users:[],
      //Error
      errors:{},
      //Notification
      isOpen:false, 
      message:'', 
      type:''
    };
    this.props.history.push("/admin/userlist");
    getUsers(this);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value // [name] sets the object property name to the value of the `name` variable.
    });
  };

  render() {
    const {history, app} =this.props
    return (
      <div>
        <Navbar history={history} app={app}/>
        <Notification 
            notify={this.state}
            setNotify={this.setState.bind(this)}
        />
        <Header
          title={`${this.state.page}`}
          subtitle=""
        />
        <UserForm
          userName={this.state.userName}
          userPassword={this.state.userPassword}
          userEmail={this.state.userEmail}
          handleChange={this.handleInputChange}
          errors={this.state.errors}
          addUser={() => addUser(this)}
        />
        <br/>
        <br/>
        <DataTable
          users={this.state.users}
          queueComponent={this}
        />
      </div>
    );
  }
}
 
export default withRouter(UserList);

