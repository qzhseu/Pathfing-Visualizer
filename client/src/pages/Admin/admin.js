import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, withRouter, } from 'react-router-dom';
import UserList from './UserList/UserList'
import GameRank from './GameRank/GameRank'
import Maze from './Maze/Maze'
import EditMaze from './EditMaze/EditMaze'


class Admin extends Component{
    constructor(props) {
        super(props);
        this.props.history.push("/admin/userlist");
    }
   
    render(){
        const {history, app} =this.props
        return(
            <>
                <UserList history={history} app={app}/>
            </>
        );
    }
}

export default withRouter(Admin);