import React, { Component } from 'react';
import { dijkstra, dfsSearch, bfsSearch, AStar, getNodesInShortestPathOrder } from '../../algorithms/pathfindingAl';
import { withRouter } from 'react-router-dom'
import './PathfindingVisualizer.css';
import { Paper } from '@material-ui/core';
import WorkPanel from "../../components/WorkPanel";
import {NavBarPractice} from  "../../components/NavigationBar/index"
import { getPassedRoundScore } from "../../action/roundScore";
import GridBoard from "../../components/GridBoard/index";
import Tutorial from "../../components/Tutorial/index";
import {SelectRoundDialog} from "../../components/ConfirmDialog/index";
import {START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW,FINISH_NODE_COL, getInitialGrid, ClearGrid,  getNewGridWithSelectStartNode, getNewGridWithSelectEndNode, getNewGridWithWallToggled } from "../../components/GridBoard/index";

class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            grid: [],
            mazes: this.props.app.state.mazes,
            speed: 1, //Visualization Speed
            algorithm:"Dijkstra", //Selected Algorithm
            stopAnimation: false,
            startNode:[START_NODE_ROW, START_NODE_COL],
            endNode:[FINISH_NODE_ROW, FINISH_NODE_COL],
            selectRoundDialog:{ isOpen:false, title:'', subTitle: ''}, //Confirm dialog before starting the game
            tutorial: { isOpen: false, title: '', subTitle: '' },
            curStatus:"",
            mouseIsPressed: false,
            open: false,
        };

        this.props.history.push("/dashboard/practice");
        this.gb = React.createRef();
        getPassedRoundScore(this.props.app);
    }

    componentDidMount() {
        const { tutorial } = this.state;
        this.setState({
            tutorial: {
                ...tutorial,
                isOpen: true,
                onCancle: () => {
                    this.setState({
                        tutorial: {
                            ...tutorial,
                            isOpen: false
                        }
                    });
                    this.props.history.push("/dashboard/practice")
                    return;
                }     
            }
        });
        //Init Grid
        const grid = getInitialGrid(this.state.startNode, this.state.endNode);
        //Update Grid
        this.setState({ grid }); 
        //Listen for window size change
        this.windowSizeChange();
        window.addEventListener("resize", this.windowSizeChange);
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


    componentWillUnmount() {
        window.removeEventListener("resize", this.windowSizeChange);
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

    changeVisualizationSpeed =(s)=>{
        this.setState({
            speed: s
        })
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, speed) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    if(!this.state.stopAnimation){
                        this.animateShortestPath(nodesInShortestPathOrder, speed);
                    }
                }, 10 *speed * i);
                return;
            }
            setTimeout(() => {
                if(!this.state.stopAnimation){
                    //console.log(this.state)
                    const node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
                }
            }, 10 *speed * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder, speed) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                if(!this.state.stopAnimation){
                    const node = nodesInShortestPathOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
                }
            }, 10 * speed * i);
        }
    }

    visualizeDijkstra() {
        this.clearPath();
        const { grid , startNode, endNode} = this.state;
        const start = grid[startNode[0]][startNode[1]];
        const finish = grid[endNode[0]][endNode[1]];
        var visitedNodesInOrder=[];
        switch(this.state.algorithm) {
            case 'Dijkstra':
                visitedNodesInOrder = dijkstra(grid, start, finish);
                break;
            case 'DFS':
                visitedNodesInOrder = dfsSearch(grid, start, finish);
                break;
            case 'BFS':
                visitedNodesInOrder = bfsSearch(grid, start, finish);
                break;
            case 'AStar':
                visitedNodesInOrder = AStar(grid, start, finish);
                break;
            default:
                // visitedNodesInOrder = dijkstra(grid, start, finish);
        }
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
        //console.log(visitedNodesInOrder)
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, this.state.speed);
    }

    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };

    clearBoard=()=>{
        const grid = getInitialGrid(this.state.startNode, this.state.endNode);
        ClearGrid(grid, this.state.startNode, this.state.endNode);
        this.setState({ grid: grid });  //update grid
    }

    clearPath=()=>{
        ClearGrid(this.state.grid, this.state.startNode, this.state.endNode);
    }

    

    render() {
        const { grid, mouseIsPressed } = this.state;
        const { app, history } = this.props;
        return (
            <>
                <NavBarPractice page={this} app={app} history={history} />
                <SelectRoundDialog 
                    mazes={this.state.mazes}
                    selectRoundDialog={this.state.selectRoundDialog}
                />
                <Tutorial tutorial={this.state.tutorial}/>
                <Paper className="workPanel">
                    <WorkPanel mode="practice"
                        algorithm={this.state.algorithm}
                        Visualize={()=>(this.visualizeDijkstra())}
                        clearBoard={()=>{this.clearBoard()}}
                        clearPath={()=>{this.clearPath()}}
                    />
                
                </Paper>
                <GridBoard 
                    name="GridBoard"
                    ref={elem => this.gb = elem}
                    grid={grid} 
                    pfPage={this}
                    mouseIsPressed={mouseIsPressed} 
                    handleMouseDown={this.handleMouseDown}
                    handleMouseEnter={this.handleMouseEnter}
                    handleMouseUp={this.handleMouseUp}>
                </GridBoard>
            </>
        );
    }
}

export default withRouter(PathfindingVisualizer)




