export function rankSorting(curRoundUserList){
    curRoundUserList.sort((u1,u2)=>{
        if(u1.time<u2.time){
            return -1;
        }else if(u1.time>u2.time){
            return 1;
        }else{
            return u2.score-u1.score;
        }
    })
}