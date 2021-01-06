import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';

// Importing the  Home Page
import PathfindingVisualizer from './pages/PathfindingVisualizer/PathfindingVisualizer';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import PathfindingGamePage from './pages/PathfindingVisualizer/PathfindingGamePage';
import Admin from './pages/Admin/admin';
import Navbar from './components/SideBar/Navbar'

import UserList from './pages/Admin/UserList/UserList'
import GameRank from './pages/Admin/GameRank/GameRank'
import Maze from './pages/Admin/Maze/Maze'
import EditMaze from './pages/Admin/EditMaze/EditMaze'
import {getAllMazes} from "./action/editMaze";


import {checkSession} from "./action/login";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      currentUser : null,
      currentAdmin : null,
      scores:[],
      NumOfRound:1,
      mazes:[{round:1, encodedMaze:"Init", startNode:[10,15], endNode:[10,35]}],
      maxRound:1
    }
    checkSession(this);
    getAllMazes(this);
  }


  render() {
    const { currentUser, currentAdmin } = this.state;
    return (
        <div>
        <BrowserRouter>
        <Switch> 
            <Route 
                exact path={["/", "/login" ,"/admin","/dashboard/practice"]} 
                render={ props => (
                    currentUser ? <PathfindingVisualizer {...props} app={this}/> :  currentAdmin ? <Admin {...props} app={this}/> : <Login {...props} app={this}/> 
                )}
            />
            
            <Route 
                exact path='/dashboard/game' 
                render={ props =>(
                    currentUser ? <PathfindingGamePage {...props} app={this}/> : <Login {...props} app={this}/>
                )} 
            />

            <Route exact path='/register' render={(props) => (<Register {...props} app={this}/>)}/>
            <Route
                path="/admin"
                render={({ match:{ url }}) => (
                  currentAdmin ?
                    <>
                        <Route exact path={`${url}/userlist`} render={(props) => (<Admin {...props} app={this}/>)}/>
                        <Route path={`${url}/gamerank`} render={(props) => (<GameRank {...props} app={this}/>)}/>
                        <Route path={`${url}/updatemaze`} render={(props) => (<Maze {...props} app={this}/>)} />
                        <Route path={`${url}/editmaze/:id`}  render={(props) => (<EditMaze {...props} app={this}/>)} /> 
                    </>
                    : <Login app={this}/>
                )}
            />

            <Route render={() => <div>404 Not found team 16</div>} />
        </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}
export default App;
