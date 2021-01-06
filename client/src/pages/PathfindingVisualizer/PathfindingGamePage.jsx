import React, { Component } from 'react';
import { dijkstra, dfsSearch, bfsSearch, AStar, getNodesInShortestPathOrder } from '../../algorithms/pathfindingAl';
import './PathfindingVisualizer.css';
import { withRouter } from 'react-router-dom'
import {Paper } from '@material-ui/core';
import { updateRoundScore, getPassedRoundScore } from "../../action/roundScore";
import {stringToMaze} from "../../action/editMaze";
import ConfirmDialog, {GameTutorial,ShowResultDialog, AlertDialog} from "../../components/ConfirmDialog";
import WorkPanel from "../../components/WorkPanel";
import {checkAnswer} from "../../algorithms/checkAnswer";
import {selectPath, animateAlgorithm, stopAnimation} from "./Visualizer/visualizer";
import { getNewGridWithRoadToggled } from "../../components/GridBoard/index";
import NavBarGame from  "../../components/NavigationBar"
import GridBoard from "../../components/GridBoard/index";
import {ClearGridSaveSelectedPath} from "../../components/GridBoard/index";

class PathfindingGamePage extends Component {
    
    constructor(props) {
        super(props); //can use this
        const {app}= this.props;
        const curRound= this.props.location.state.round ? this.props.location.state.round : 0;
        this.state = {
            round: curRound,
            maxRound: app.state.maxRound, // The last round
            NumOfRound: app.state.NumOfRound,//Number of Round
            mazes: app.state.mazes,
            currentMaze:app.state.mazes[curRound-1],
            grid: [],  //Node grid
            selectedPathGrid:[],
            mouseIsPressed: false, //Flag for selecting own path
            speed: 1, //Visualization Speed
            isHovering: false,
            algorithm:"Dijkstra", //Selected Algorithm
            animationFinish:true,
            isSubmitted: false, //Flag for judging whether or not the user submit their result.
            seconds: 0, //Time
            selectedPath:[], //Selected path by user
            shortestPath:[], //Shorest path getted by pathfinding algorithm 
            gameTutorial: { isOpen: false, title: '', subTitle: '' },
            confirmDialog:{ isOpen:false, title:'', subTitle: ''}, //Confirm dialog before starting the game
            showResultDialog:{isOpen:false, title:'', subTitle: ''}, //Result dialog to tell user their score. 
            alertDialog:{isOpen:false, title:'', subTitle: ''},
            workPanel:{isSubmitted: false},
        };
        this.handleMouseHover = this.handleMouseHover.bind(this);
        getPassedRoundScore(this.props.app);
    }

    componentDidMount() {
        const { gameTutorial, currentMaze} = this.state;
        this.setState({
            gameTutorial: {
                ...gameTutorial,
                isOpen: true,
                onConfirm: () => { this.competitorTimer() },
                onCancle: () => {
                    this.setState({
                        gameTutorial: {
                            ...gameTutorial,
                            isOpen: false
                        }
                    });
                    this.props.history.push("/dashboard/practice")
                    return;
                }
            }
        });
        const grid = stringToMaze(currentMaze.encodedMaze, currentMaze.startNode, currentMaze.endNode, false);
        this.setState({ grid });  //update grid
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


    handleMouseOver(row, col, pfGame){
        const node =pfGame.state.grid[row][col];
        selectPath(node, pfGame.state.shortestPath, pfGame.state.selectedPath, pfGame.state.animationFinish);
    }

    handleMouseDown(row, col, pfGame) { //when mouse pressed
        const newGrid = getNewGridWithRoadToggled(pfGame.state.grid, row, col);
        pfGame.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col, pfGame) {  //enter wall or elinimate wall
        if (!pfGame.state.mouseIsPressed) return;
        const newGrid = getNewGridWithRoadToggled(pfGame.state.grid, row, col);
        pfGame.setState({ grid: newGrid });
    }

    handleMouseUp(pfGame) {  //when mouse up don't create wall
        pfGame.setState({ mouseIsPressed: false });
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    tick() {
        this.setState({
            seconds: this.state.seconds + 1
        });
    }

    competitorTimer() {
        const { confirmDialog, gameTutorial } = this.state;
        this.Timer = setInterval(() => this.tick(), 1000);
        this.setState({
            gameTutorial: {
                ...gameTutorial,
                isOpen: false
            },
            confirmDialog: {
                ...confirmDialog,
                isOpen: false
            }
        });
    }

    clearTimer(){
        clearInterval(this.Timer);
        this.setState({
            seconds: 0
        });
        
    }

    recordCompetitorTimer() {
        const competitorRecord = this.state.seconds;
        clearInterval(this.Timer);
        return competitorRecord;
    }

    visualizeAlgorithm() {
        const {currentMaze, algorithm, grid ,round, alertDialog} = this.state;
        this.clearPath();
        if(algorithm!==""){
            const startNode = grid[currentMaze.startNode[0]][currentMaze.startNode[1]];
            const finishNode = grid[currentMaze.endNode[0]][currentMaze.endNode[1]];
            const [pass, userSelectedPath] = checkAnswer(grid, startNode);

            var visitedNodesInOrder=[];
            switch(algorithm) {
                case 'Dijkstra':
                    visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                    break;
                case 'DFS':
                    visitedNodesInOrder = dfsSearch(grid, startNode, finishNode);
                    break;
                case 'BFS':
                    visitedNodesInOrder = bfsSearch(grid, startNode, finishNode);
                    break;
                case 'AStar':
                    visitedNodesInOrder = AStar(grid, startNode, finishNode);
                    break;
                default:
                    visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                    break;
            }

            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.setState({
                animationFinish:false,
                shortestPath: nodesInShortestPathOrder,
                selectedPath: userSelectedPath
            })
            animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, userSelectedPath, round, this.state.speed, this.setState.bind(this));
        }else{
            
            this.setState({
                alertDialog:{
                    isOpen:true,
                    title:"Select an algorithm, please.",
                    subTitle:"You can select an algorithm from navigation bar.",
                    onCancle: ()=>{
                        this.setState({
                            alertDialog: {
                                ...alertDialog,
                                isOpen:false
                            }
                        });
                    }
                }
            })
        }
    }
    

    checkResult(app){
        const {currentMaze, grid, showResultDialog} = this.state;
        this.setState({
            selectedPathGrid: grid
        })
        const start = grid[currentMaze.startNode[0]][currentMaze.startNode[1]];
        //Calculate Time
        const seconds = this.recordCompetitorTimer();
        const minutes=Math.floor(seconds / 60);
        const second=seconds % 60;

        //Calculate Score
        const [pass, checkOrder]=checkAnswer(grid, start);
        dijkstra(grid, grid[currentMaze.startNode[0]][currentMaze.startNode[1]], grid[currentMaze.endNode[0]][currentMaze.endNode[1]]);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[currentMaze.endNode[0]][currentMaze.endNode[1]]);
        const selectedLen=checkOrder.length;
        const shortestLen=nodesInShortestPathOrder.length;
        const commonNodeLen = nodesInShortestPathOrder.filter(v => checkOrder.includes(v)).length
        const score =(pass && shortestLen===selectedLen) ? 100 : Math.floor(100*(commonNodeLen/shortestLen)*(shortestLen/selectedLen)); 

        //Update Score to database
        const result={
            round: this.state.round,
            currentScore: score,
            pass: pass,
            time: seconds,
        }

        updateRoundScore(result).then(()=>{
            //Update Round Scores
            getPassedRoundScore(app);
        });

        //Set state
        this.setState({
            isSubmitted:true,
            workPanel:{isSubmitted:true},
            showResultDialog:{
                pass: pass,
                finalRound: this.state.round<this.state.maxRound,
                isOpen: true,
                round: this.state.round,
                title: pass? "Round Complete!": "Try Again!",
                score: pass? `Score: ${score}  ` : "",
                subtitle: pass? `Complete Time: ${minutes} minutes ${second} seconds. ` : "",
                notice: pass?  "Click 'Visualize' button to help you get out of the maze faster. The default pathfinding algorithm is Dijkstra." : "Click 'Visualize' button to help you get out of the maze. The default pathfinding algorithm is Dijkstra.",
                Replay:()=>{
                    this.setState({
                        showResultDialog: {
                            ...showResultDialog,
                            isOpen:false,
                            isSubmitted:false
                        }
                    });
                    this.goRound(this.state.round);
                },
                Next:()=>{
                    this.setState({
                        showResultDialog: {
                            ...showResultDialog,
                            isOpen:false,
                            isSubmitted:false
                        }
                    });
                    if(this.state.round<this.state.maxRound){
                        this.goRound(this.state.round+1);
                    }
                },
                Visualize:()=>{
                    this.setState({
                        showResultDialog: {
                            ...showResultDialog,
                            isOpen:false,
                            isSubmitted:false
                        }
                    });
                    this.visualizeAlgorithm("Dijkstra")
                },
                onCancle: ()=>{
                    this.setState({
                        showResultDialog: {
                            ...showResultDialog,
                            isOpen:false
                        }
                    });
                }
            }
        })
    }

    changeVisualizationSpeed =(s)=>{
        this.setState({
            speed: s
        })
    }

    clearPath=()=>{
        const {currentMaze, grid, selectedPathGrid} = this.state;
        const encoded = currentMaze.encodedMaze;
        ClearGridSaveSelectedPath(grid, currentMaze.startNode, currentMaze.endNode)
        //const grid=stringToMaze(currentMaze.encodedMaze, currentMaze.startNode, currentMaze.endNode, true)    
    }


    goRound = (round) => {
        const { confirmDialog , mazes} = this.state;
        stopAnimation(round);
        const curMaze=mazes[round-1];
        const curgrid=stringToMaze(curMaze.encodedMaze, curMaze.startNode, curMaze.endNode, true)
        this.setState({
            isSubmitted:false,
            animationFinish:true,
            round: round,
            grid: curgrid,
            currentMaze: curMaze,
            algorithm:"Dijkstra",
            confirmDialog: {
                isOpen: true,
                title: 'Are you sure to start game?',
                subTitle: "",
                onConfirm: () => { 
                    this.competitorTimer();
                    //InitRoundScore(round);
                },
                onCancle: () => {
                    this.setState({
                        confirmDialog: {
                            ...confirmDialog,
                            isOpen: false,
                            isSubmitted:false
                        }
                    });
                    this.props.history.push("/dashboard/practice")
                    return;
                }
            }
        });
        this.clearTimer();
    }


    render() {
        const { grid, mouseIsPressed } = this.state;
        const { app, history } = this.props;

        return (

            <>
                <GameTutorial gameTutorial={this.state.gameTutorial} />
                <ConfirmDialog confirmDialog={this.state.confirmDialog}/>
                <AlertDialog AlertDialog={this.state.alertDialog}/>
                <ShowResultDialog resultDialog={this.state.showResultDialog}/>
                <NavBarGame page={this} app={app} history={history}/>

                <div>
                    <ul className="timer">
                        <li className="timeContent">
                            {Math.floor(this.state.seconds / 60)} minutes {" "}{this.state.seconds % 60} seconds
                        </li> 
                    </ul>
                </div>

                <Paper className="workPanel">
                    <WorkPanel
                        algorithm={this.state.algorithm}
                        FinalRound={this.state.round<this.state.maxRound}
                        Visualize={()=>{if(this.state.animationFinish){this.visualizeAlgorithm()}}}
                        replay={()=>{if(this.state.animationFinish){this.goRound(this.state.round)}}}
                        next={()=>{if(this.state.animationFinish){this.goRound(this.state.round+1);}}}
                        clearBoard={()=>{if(this.state.animationFinish){this.clearPath()}}}
                        submit={()=>{if(this.state.animationFinish){this.checkResult(app)}}}
                        isSubmitted={this.state.isSubmitted}
                        mode="game"
                    />
                </Paper>

                <GridBoard 
                    grid={grid} 
                    pfPage={this}
                    mouseIsPressed={mouseIsPressed} 
                    handleMouseOver={this.handleMouseOver}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseEnter={this.handleMouseEnter}
                    handleMouseUp={this.handleMouseUp}>
                </GridBoard>

            </>
        );
    }
}

export default withRouter(PathfindingGamePage)


