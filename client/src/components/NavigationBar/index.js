import React from 'react';
import { NavLink } from 'react-router-dom';
import {stopAnimation} from "../../pages/PathfindingVisualizer/Visualizer/visualizer";
import LogoutButton from '../Button/index';
import UserProfile from '../UserProfile/index';
//../Button/index
import './styles.css';


export default function NavBarGame(props){
    const {app, page, history}=props;

    const roundList= [];
    for(let i=1;i<=page.state.NumOfRound; i++){
        roundList.push(
           <a href="#" onClick={() => page.goRound(i)}>{`Round ${i}`}</a>
        )
    }

    return(
        <div className="navbarPathFinding">
            <a>
                <UserProfile app={app}/>
            </a>
            <a>
                
                <NavLink to="#" onClick={()=>{
                        stopAnimation(page.state.maxRound+1);
                        setTimeout(() => {
                            page.props.history.push("/dashboard/practice")
                        }, 1); 
                    }}>Practice</NavLink>
            </a>
            <a>
                <NavLink to="/dashboard/game">
                    <div className="dropdownPathFinding">Round  { page.state.round}
                        <div className="dropdownPathFinding-content">
                            {roundList}
                        </div>
                    </div>
                </NavLink>
            </a>

            <a>
                <div id="PathFinding-Navigation" className="dropdownPathFinding">
                    <button className="dropbtnPathFinding">Algorithm { page.state.algorithm === "" ? "" : ": " + page.state.algorithm}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdownPathFinding-content">
                        <a href="#" onClick={() => page.setState({algorithm:"Dijkstra"})}>Dijkstra</a>
                        <a href="#" onClick={() => page.setState({algorithm:"AStar"})}>A* Search</a>
                        <a href="#" onClick={() => page.setState({algorithm:"DFS"})}>Depth-first Search</a>
                        <a href="#" onClick={() => page.setState({algorithm:"BFS"})}>Breath-first Search</a>
                    </div>
                </div>
            </a>

            <a>
                <div className="dropdownPathFinding">
                    <button className="dropbtnPathFinding">Speed: { page.state.speed === 1 ? "Fast" :  page.state.speed === 7 ? "Average" : "Slow"}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdownPathFinding-content">
                        <a href="#" onClick={() =>  page.changeVisualizationSpeed(12)}>Slow</a>
                        <a href="#" onClick={() =>  page.changeVisualizationSpeed(7)}>Average</a>
                        <a href="#" onClick={() =>  page.changeVisualizationSpeed(1)}>Fast</a>
                    </div>
                </div>
            </a>
        
            <LogoutButton history={history} app={app}/>
                
        </div>
         
    );
}

export function NavBarPractice(props){
    const {app, page, history}=props;

    return(
        <div className="navbarPathFinding">
            <a>
                <UserProfile app={app}/>
            </a>
                
            <a>
                <NavLink to="/dashboard/practice">
                    <div className="dropdownPathFinding">Practicing</div>
                </NavLink>
            </a>

            <a>
                <NavLink to="#" onClick={()=>{
                        page.setState({
                            selectRoundDialog:{
                                isOpen: true,
                                title: 'Select a round you want to go!',
                                onCancle: () => {
                                    page.setState({
                                        selectRoundDialog: {
                                            ...page.state.selectRoundDialog,
                                            isOpen: false,
                                            isSubmitted:false
                                        }
                                    });
                                    return;
                                },
                                goRound:(round)=>{
                                    console.log(page.state.mazes)
                                    page.setState({stopAnimation:true})
                                    setTimeout(() => {
                                        page.props.history.push({
                                            pathname: "/dashboard/game",
                                            state: { round: round }
                                        })
                                    }, 1); 
                                }
                            }
                        })
                    }}>Game</NavLink>
            </a>

            <a>
                <div id="PathFinding-Navigation" className="dropdownPathFinding">
                    <button className="dropbtnPathFinding">Algorithm { page.state.algorithm === "" ? "" : ": " + page.state.algorithm}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdownPathFinding-content">
                        <a href="#" onClick={() => page.setState({algorithm:"Dijkstra"})}>Dijkstra</a>
                        <a href="#" onClick={() => page.setState({algorithm:"AStar"})}>A* Search</a>
                        <a href="#" onClick={() => page.setState({algorithm:"DFS"})}>Depth-first Search</a>
                        <a href="#" onClick={() => page.setState({algorithm:"BFS"})}>Breath-first Search</a>
                    </div>
                </div>
            </a>

            <a>
                <div className="dropdownPathFinding">
                    <button className="dropbtnPathFinding">Speed: { page.state.speed === 1 ? "Fast" :  page.state.speed === 7 ? "Average" : "Slow"}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdownPathFinding-content">
                        <a href="#" onClick={() =>  page.changeVisualizationSpeed(12)}>Slow</a>
                        <a href="#" onClick={() =>  page.changeVisualizationSpeed(7)}>Average</a>
                        <a href="#" onClick={() =>  page.changeVisualizationSpeed(1)}>Fast</a>
                    </div>
                </div>
            </a>

            <LogoutButton history={history} app={app}/>
            
        </div>
    );
}


