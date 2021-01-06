import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Header from '../../../components/Header'
import GameRankList from './GameRankList';
import {getAllMazes} from '../../../action/editMaze';
import {getAllRanks} from '../../../action/gameRank';
import Navbar from '../../../components/SideBar/Navbar'
 
class GameRank extends Component {
  constructor(props){
    super(props);
    this.props.history.push("/admin/gamerank");
    getAllMazes(this).then((results) => {
      getAllRanks(this);
    }, (error) => {
      console.log('Reject function:', error)
    });
  }

  state={
    page: "Ranks",
    mazes:[],
    ranks:[]
  }

  render() {
    const {history, app} =this.props
    return (
      <div>
        <Navbar history={history} app={app}/>
        <Header
          title={`${this.state.page}`}
          subtitle=""
        />
        <GameRankList
          ranks={this.state.ranks}
        />
      </div>
    );
  }
}
 
export default withRouter(GameRank);

