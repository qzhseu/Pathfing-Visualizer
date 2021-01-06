//Get all ranks
export const getAllRanks = (gameRankPage)=>{
    const mazes=gameRankPage.state.mazes;
    const ranks=[];
    var itemsProcessed = 0;
    mazes.forEach((maze, index, array)=>{
        const round=maze.round;
        const url=`/api/roundScores/${round}`;
        fetch(url)
            .then(res=>{
                if(res.status===200){
                    return res.json();
                }
            })
            .then(json=>{
                const curRank={
                    round: round,
                    curUserList:json
                }
                ranks.push(curRank);
                itemsProcessed++;
                if(itemsProcessed === array.length){
                    //Set state
                    if(ranks.length>0) ranks.sort((r1,r2)=>{return r1.round-r2.round});
                    console.log("ALL Ranks:", ranks);
                    gameRankPage.setState({ranks: ranks});
                }
            })
            .catch(error=>{
                console.log("Get all round scores error: ", error)
            }) 
    })
   
}