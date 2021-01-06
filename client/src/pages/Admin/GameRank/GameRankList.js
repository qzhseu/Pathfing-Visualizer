import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core';

import GameRankItem from './GameRankItem';
import {rankSorting} from '../../../algorithms/rankSorting'

export function SortGameRankItem(props){
    const {ranks, idx}=props;
    const curGameRank=ranks[idx];
    if(curGameRank.curUserList){
        const userList=curGameRank.curUserList;
        rankSorting(userList)
        curGameRank.curUserList=userList;
    }
    return (
        <React.Fragment>
            {
                <Grid item xs={12}>
                    <GameRankItem 
                        key={curGameRank.round}
                        GameRankItem={curGameRank}
                    />
                </Grid>
            }
        </React.Fragment>
      );
}

export default function GameRankList(props) {
    const {ranks}=props;
    const showRank=[];
    for(let i=0; i<ranks.length; i+=2){
        showRank.push(
            <Grid  container item xs={12} spacing={5}>
                <GameRankRow
                    ranks={ranks}
                    index={ i+1<ranks.length ? [i,i+1]: [i] }
                />
            </Grid>
        )
    }

    function GameRankRow(props) {
        const {ranks, index}=props;
        ranks.sort((r1,r2)=>{return r1.round-r2.round})
        //console.log("All ranks",ranks);

        const curGameRanks=index.map((i)=>ranks[i]);
        //console.log("curGameRanks", curGameRanks)
        if(curGameRanks){
            curGameRanks.map(curGameRank=>{
                if(curGameRank && curGameRank.curUserList){
                    const userList=curGameRank.curUserList;
                    rankSorting(userList)
                    curGameRank.curUserList=userList
                }
            })
        }
        return (
          <React.Fragment>
              {
                  curGameRanks.map(curGameRank=>(
                    <Grid item xs={6}>
                        <GameRankItem 
                            key={curGameRank.round}
                            GameRankItem={curGameRank}
                        />
                    </Grid>
                  ))
              }
          </React.Fragment>
        );
    }

    return (
        <Paper className="paper_ranks">
            <Grid className="Grid_allEle_container" container spacing={5}>
                {showRank}
            </Grid>
        </Paper>
    )
}
