const log= console.log;
export const InitRoundScore = (round)=>{
    const url= "/api/game/initRoundScore";
    const initRoundScore={
        round: round,
        bestScore: -1,
        bestTime: -1,
        times: 0,
        totalTime:0,
    }

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(initRoundScore),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res){
            if(res.status!==200){
                res.json()
            }
        })
        .then(json=>{
            log(json)
        })
        .catch(error=>{
            log(error);
        })
}

export const updateRoundScore= (score)=>{
    return new Promise((resolve, reject)=>{
        const url= "/api/game/updateRoundScore";
        const request =new Request(url,{
            method: "PATCH",
            body: JSON.stringify(score),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        fetch(request)
            .then(function (res){
                if(res.status!==200){
                    res.json()
                }else{
                    return resolve("Update Success")
                }
            })
            .then(json=>{
                log("Update score error:",json)
                return reject(json);
            })
            .catch(error=>{
                log(error)
            })
    })
}

export const getPassedRoundScore =(passedRoundScore)=>{
    const url="/api/roundScores";
    fetch(url)
        .then(res=>{
            if(res.status===200){
                return res.json();
            }
        })
        .then(json=>{
            const roundScores = json.roundScores;
            roundScores.sort((r1,r2)=>{
                return r1.round-r2.round;
            })
            const ret=[]
            roundScores.map(roundScore=>{
                ret.push({round: roundScore.round, bestScore: roundScore.bestScore});
            })
            passedRoundScore.setState({ scores: ret})
        })
        .catch(error=>{
            console.log(error)
        })
}

export const getPassedRoundScoreforAdmin =()=>{
    const url="/api/roundScores";
    fetch(url)
        .then(res=>{
            if(res.status===200){
                return res.json();
            }
        })
        .then(json=>{
            const roundScores = json.roundScores;
            roundScores.sort((r1,r2)=>{
                return r1.round-r2.round;
            })
            const ret=[]
            const spendTimeOnGame= 0;
            roundScores.map(roundScore=>{
                spendTimeOnGame+=roundScore.totalTime;
                ret.push({
                    round: roundScore.round,
                    bestScore: roundScore.bestScore, 
                    bestTime: roundScore.bestTime,
                });
            })
            return ret;
        })
        .catch(error=>{
            console.log(error)
        })
}