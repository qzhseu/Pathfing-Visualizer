import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Paper } from '@material-ui/core';
import Header from "../../../components/Header/index"
import WorkPanel from "../../../components/WorkPanel/index";
import GridBoard from "../../../components/GridBoard/index";
import Navbar from '../../../components/SideBar/Navbar'
import {saveMaze, clearBoard, loadMazeFromDb} from '../../../action/editMaze.js'
import {START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW,FINISH_NODE_COL, getInitialGrid, ClearGrid, getNewGridWithSelectStartNode, getNewGridWithSelectEndNode, getNewGridWithWallToggled } from "../../../components/GridBoard/index";

class EditMaze extends Component {
    constructor(props) {
        super(props);
        const round = this.props.match.params.id;
        this.props.history.push(`/admin/editmaze/${round}`);
        loadMazeFromDb(this, round);
    }

    state={
        round: this.props.match.params.id,
        savedGrid : [],
        grid: [],
        startNode:[START_NODE_ROW, START_NODE_COL],
        endNode:[FINISH_NODE_ROW, FINISH_NODE_COL],
        curStatus:"",
        mouseIsPressed: false,
        encodedMaze:""
    }

    componentDidMount() {
        //Init Grid
        const grid = getInitialGrid(this.state.startNode, this.state.endNode);
        //Update Grid
        this.setState({ grid }); 
        this.windowSizeChange();
        window.addEventListener("resize", this.windowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.windowSizeChange);
    }

    windowSizeChange =()=>{
        const documentWidth= document.body.clientWidth;
        const gridCollection=document.getElementsByName('gb');
        if(gridCollection){
            const gridWidth=documentWidth-200;
            const nodeWidth=gridWidth/50;
            const gridRowHeight= nodeWidth*1.12;
            const nodeCollections = gridCollection[0].getElementsByClassName('node')
            const nodeRowCollections = gridCollection[0].getElementsByClassName('grid_row')
            for (const node of nodeCollections) {
                node.style.width = `${nodeWidth}px`;
                node.style.height = `${nodeWidth}px`; 
            }
            for (const nodeRow of nodeRowCollections) {
                nodeRow.style.height = `${gridRowHeight}px`; 
            }
        }
    }

    handleMouseDown(row, col, pfPractice ) { 
        //when mouse press
        if( pfPractice.state.grid[row][col].isStart){
            pfPractice.setState({mouseIsPressed: true, curStatus: "StartNode"})
        }else if( pfPractice.state.grid[row][col].isFinish){
            pfPractice.setState({mouseIsPressed: true, curStatus: "FinishNode"})
        }else{
            const newGrid = getNewGridWithWallToggled( pfPractice.state.grid, row, col);
            pfPractice.setState({ grid: newGrid, mouseIsPressed: true , curStatus: "NormalNode"});
        }
    }

    handleMouseEnter(row, col,  pfPractice) {  
        //Create or eliminate walls,start node or end node
        if (! pfPractice.state.mouseIsPressed) return;
        var newGrid="";
        if( pfPractice.state.curStatus==='StartNode'){
            newGrid = getNewGridWithSelectStartNode( pfPractice.state.grid,  pfPractice.state.startNode, row, col);
        }else if( pfPractice.state.curStatus==='FinishNode'){
            newGrid = getNewGridWithSelectEndNode( pfPractice.state.grid,  pfPractice.state.endNode, row, col);
        }else{
            newGrid = getNewGridWithWallToggled( pfPractice.state.grid, row, col);
        }
        pfPractice.setState({ grid: newGrid });
    }

    handleMouseUp( pfPractice) {  
        //When mouse up not create walls
        pfPractice.setState({ mouseIsPressed: false , curStatus: ""});
    }

    exit(){
        this.props.history.push("/admin/updatemaze");
    }
  
    render() {
        //const { app, round } = this.props
        const { grid, mouseIsPressed } = this.state;
        const {history, app} =this.props
        return (
            <>
                <Navbar history={history} app={app}/>
                <Header
                    title="Edit Maze"
                    subtitle={`Round ${this.state.round}`}
                />
                <Paper className="workPanel">
                    <WorkPanel 
                        mode="admin"
                        save={()=>{saveMaze(this)}}
                        reload={()=>{loadMazeFromDb(this, this.state.round)}}
                        clear={()=>{clearBoard(this)}}
                        exit={()=>{this.exit()}}
                        availableNode={['start','end','wall']}
                    />
                </Paper>
                <GridBoard 
                    grid={grid} 
                    pfPage={this}
                    mouseIsPressed={mouseIsPressed} 
                    handleMouseDown={this.handleMouseDown}
                    handleMouseEnter={this.handleMouseEnter}
                    handleMouseUp={this.handleMouseUp}>
                </GridBoard>
            </> 
        )
    }
  }
   
  export default withRouter(EditMaze);