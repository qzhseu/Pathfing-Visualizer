import React from 'react'
import { Button, ButtonGroup} from '@material-ui/core';
import NodeMeaning from "./NodeMeaning"
import Grid from '@material-ui/core/Grid';
import "./styles.css";

export default function WorkPanel(props) {
    const { FinalRound, Visualize, replay, next, clearBoard, clearPath, submit , isSubmitted, save, reload, exit, mode, algorithm} = props;
    var buttongroup,nodegroup, notice;
    
    switch(algorithm) {
        case 'Dijkstra':
            notice=<h3 className="algorithmNotice">Dijkstra's Algorithm guarantees the shortest path!</h3>
            break;
        case 'DFS':
            notice=<h3 className="algorithmNotice">Depth-first Search does not guarantee the shortest path!</h3>
            break;
        case 'BFS':
            notice=<h3 className="algorithmNotice">Breath-first Search guarantees the shortest path!</h3>
            break;
        case 'AStar':
            notice=<h3 className="algorithmNotice">A* Search guarantees the shortest path!</h3>
            break;
        default:
            break;
    }
    //Builde button Group
    if (isSubmitted || mode!=='game') {
        buttongroup = <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            {Visualize ? <Button onClick={Visualize}>Visualize</Button> : <></>}
                            {replay ? <Button onClick={replay}>Replay</Button> : <></>}
                            {FinalRound ? <Button onClick={next}>Next</Button>:<></>}
                            {save ? <Button onClick={save}>Save</Button>: <></>}
                            {reload ? <Button onClick={reload}>Reload</Button>: <></>}
                            {clearBoard ? <Button onClick={clearBoard}>Clear Board</Button> : <></> }
                            {clearPath ? <Button onClick={clearPath}>Clear Path</Button> : <></> }
                            {exit ? <Button onClick={exit}>Exit</Button> : <></> }
                      </ButtonGroup>;
    } else {
        buttongroup = <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            {clearBoard ? <Button onClick={clearBoard}>Clear Board</Button> : <></> }
                            {clearPath ? <Button onClick={clearPath}>Clear Path</Button> : <></> }
                            {submit ? <Button onClick={submit}>Submit</Button>: <></>}
                      </ButtonGroup>;
    }

    //Build Node meaning Group
    if(mode==='admin'){
        nodegroup = <Grid container item xs={12}>
                        <Grid item md={4} s={3} xs={4}> 
                            <NodeMeaning Name="Start Node" ClassName='node node-start'/>
                        </Grid> 

                        <Grid item md={4} s={3} xs={4}> 
                            <NodeMeaning Name="Target Node" ClassName='node node-finish'/>
                        </Grid> 

                        <Grid item md={4} s={3} xs={4}> 
                            <NodeMeaning Name="Wall Node" ClassName='node node-wall'/>
                        </Grid> 
                    </Grid>
    }else if(mode==='practice'){
        nodegroup =  <Grid container item xs={12}>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Start Node"
                                ClassName='node node-start'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Target Node"
                                ClassName='node node-finish'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Wall Node"
                                ClassName='node node-wall'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Unvisited Node"
                                ClassName='node'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Visited Node"
                                ClassName='node node-visited'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Shortest-path Node"
                                ClassName='node node-shortest-path'
                            />
                        </Grid>
                    </Grid> 
    }else{
        nodegroup =  <Grid container item xs={12}>
                        <Grid item md={1} s={3} xs={4}>
                            <NodeMeaning
                                Name="Start Node"
                                ClassName='node node-start'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Target Node"
                                ClassName='node node-finish'
                            />
                        </Grid>
                        <Grid item md={1} s={3} xs={4}>
                            <NodeMeaning
                                Name="Wall Node"
                                ClassName='node node-wall'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Unvisited Node"
                                ClassName='node'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Visited Node"
                                ClassName='node node-visited'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Shortest-path Node"
                                ClassName='node node-shortest-path'
                            />
                        </Grid>
                        <Grid item md={2} s={3} xs={4}>
                            <NodeMeaning
                                Name="Selected-path Node"
                                ClassName='node node-userselected-path'
                            />
                        </Grid>
                    </Grid> 
    }
    

    return (
        <div className="workPanel">
            <Grid container spacing={3}>
                {nodegroup}
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        {buttongroup}
                    </Grid>
                </Grid>
                {notice}
            </Grid>
        </div>
    )
}
