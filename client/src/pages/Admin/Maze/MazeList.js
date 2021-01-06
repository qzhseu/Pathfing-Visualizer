import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core';

import MazeItem from './MazeItem';
import "./styles.css";

export default function MazeList(props) {
    const {mazePage, history}=props;
    const mazes=mazePage.state.mazes;
    const NumOfRound=mazePage.state.NumOfRound;
    const showMaze=[];
    for(let i=0; i<NumOfRound; i+=2){

        showMaze.push(
            <Grid  container item xs={12} spacing={5}>
                <MazeRow
                    mazes={mazes}
                    index={ i+1<NumOfRound ? [i,i+1]: [i] }
                />
            </Grid>)
    }

    function MazeRow(props) {
        const {mazes, index}=props;
        const curMazes=index.map((i)=>mazes[i]);
        return (
          <React.Fragment>
              {
                  curMazes.map(curMaze=>(
                    <Grid item xs={6}>
                        <MazeItem 
                            key={curMaze.round}
                            mazeItem={curMaze}
                            mazePage={mazePage}
                            history={history}
                        />
                    </Grid>
                  ))
              }
          </React.Fragment>
        );
    }

    return (
        
        <Paper className="paper_mazes">
            <Grid className="Grid_allEle_container" container spacing={5}>
                { showMaze }
            </Grid>
        </Paper>
    )
}
