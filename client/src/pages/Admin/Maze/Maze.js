import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Header from '../../../components/Header'
import Navbar from '../../../components/SideBar/Navbar'
import MazeList from './MazeList';
import {createMaze, getAllMazes} from '../../../action/editMaze';
import {START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW,FINISH_NODE_COL} from "../../../components/GridBoard/index";
import ConfirmDialog from "../../../components/ConfirmDialog/index";
import {removeMaze} from "../../../action/editMaze.js"
import "./styles.css";
 
class Maze extends Component {
  constructor(props){
      super(props);
      this.props.history.push("/admin/updatemaze");
      getAllMazes(this);
  }
  state={
    page: "Mazes",
    NumOfRound: 0,
    mazes:[],
    confirmDialog:{isOpen:false, title:'', subTitle: ''}
  }

  createMaze(){
    createMaze(this.state.NumOfRound+1, [START_NODE_ROW, START_NODE_COL], [FINISH_NODE_ROW,FINISH_NODE_COL], this);
  }

  removeMaze(){
    removeMaze(this, this.state.NumOfRound);
  }

  componentDidMount() {
    window.addEventListener("resize", this.windowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowSizeChange);
  } 

  windowSizeChange =()=>{
      const documentWidth= document.body.clientWidth;
      const gridCollections=document.getElementsByName('smgb');
      
      if(gridCollections){
        for(const gridCollection of gridCollections){
          const gridWidth=documentWidth-920;
          const nodeWidth=gridWidth/50;
          const gridRowHeight= nodeWidth*1.12;
          const nodeCollections = gridCollection.getElementsByClassName('smnode')
          const nodeRowCollections = gridCollection.getElementsByClassName('smgrid_row')
          for (const node of nodeCollections) {
              node.style.width = `${nodeWidth}px`;
              node.style.height = `${nodeWidth}px`; 
          }
          for (const nodeRow of nodeRowCollections) {
              nodeRow.style.height = `${gridRowHeight}px`; 
          }
        }
      }
  }


  render() {
    const {history, app} =this.props
    return (
      <div>
        <Navbar history={history} app={app}/>
        <ConfirmDialog 
              confirmDialog={this.state.confirmDialog}
        />
        <Header
          title={`${this.state.page}`}
          subtitle=""
        />
        <div>
          <Button
              className="addMaze"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<AddCircleIcon/>}
              onClick={()=>{this.createMaze()}}
              >
              Add Round
          </Button>

          <Button
              className="addMaze"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<DeleteForeverIcon/>}
              onClick={()=>{
                  this.setState({confirmDialog:{
                    isOpen:true,
                    title: 'Are you sure to remove the last round?',
                    subTitle: "This is an irreversible operation. The last round will be removed!",
                    onConfirm:()=>{this.removeMaze(); this.setState({confirmDialog: {isOpen:false}})},
                    onCancle:()=>{this.setState({confirmDialog: {isOpen:false}})},
                }}) 
              }}
              >
              Remove Round
          </Button>
        </div>
        <MazeList
          mazePage={this}
          history={history}
        />
      </div>
    );
  }
}
export default withRouter(Maze);