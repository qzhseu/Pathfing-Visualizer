 import {getInitialGrid, ClearGrid} from '../components/GridBoard/index'
 import {START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW,FINISH_NODE_COL} from "../components/GridBoard/index";
 //Create maze
 const log= console.log;
 export const createMaze =(round, startNode, endNode, mazePage)=>{
     
    const url= `/api/admit/editMaze/create/${round}`;
    const encodedMaze="Init";

    const initMaze={
        encodedMaze : encodedMaze,
        startNode : startNode,
        endNode : endNode
    }

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(initMaze),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res){
            if(res.status === 200){
                return res.json()
            }
        })
        .then(json=>{
            const newMazeLists = mazePage.state.mazes;
            const numOfRound=mazePage.state.NumOfRound+1;
            newMazeLists.push(json);

            mazePage.setState({
                mazes: newMazeLists,
                NumOfRound: numOfRound
            })
            return json;
        })
        .catch(error=>{
            log(error);
        })
 }

 //Get All mazes
 export const getAllMazes=(editMazePage)=>{
     return new Promise(function(resolve, reject){
        const url='/api/admit/editMaze/getAllMazes';
        fetch(url)
           .then(res=>{
               if(res.status===200){
                   return res.json();
               }
           })
           .then(json=>{
               //console.log("Get all maze length", json.maze, json.maze.length)
               if(json.maze.length>0){
                   json.maze.sort((m1,m2)=>{return  m1.round-m2.round;})
                   editMazePage.setState({
                       mazes: json.maze,
                       NumOfRound: json.maze.length,
                       maxRound: json.maze[json.maze.length-1].round,
                   },()=>resolve(json.maze));
               }
           })
           .catch(error=>{
               console.log("Get all mazes error: ",error)
               reject(error);
           })
     })
     
 }

 //Init a maze
export const stringToMaze=(encodedMaze, startNode, endNode, clear)=>{
     //Draw a maze
     const newgrid = getInitialGrid(startNode, endNode);
     if(clear) ClearGrid(newgrid, startNode, endNode);
     if(encodedMaze!=='Init'){
         const rows=newgrid.length; //20
         const cols=newgrid[0].length; //50
         for (var row = 0; row < rows; row++) {
             for (var col = 0; col < cols; col++) {
                 var index=row*cols + col;
                 if(index>encodedMaze.length) break;
                 if(encodedMaze[index]==="1"){
                     newgrid[row][col].isWall=true;
                 }else{
                    newgrid[row][col].isWall=false;
                    newgrid[row][col].isWall=false;
                 }
             }
         }
     }
     return newgrid;
}

export const loadMazeFromDb=(editMazePage, round)=>{
    const url= `/api/admit/editMaze/get/${round}`;
    fetch(url)
        .then(res=>{
            if(res.status===200){
                return res.json();
            }
        })
        .then(json=>{
            const encodedMaze = json.maze[0].encodedMaze;
            const savedStartNode= json.maze[0].startNode;
            const savedEndNode= json.maze[0].endNode;

            const newgrid= stringToMaze(encodedMaze, savedStartNode, savedEndNode, false)
            
            //Setstate
            editMazePage.setState({
                grid: newgrid,
                startNode: savedStartNode,
                encodedMaze: encodedMaze,
                endNode: savedEndNode,
            });
        })
        .catch(error=>{
            console.log(`Load round ${round} error: `,error)
        })
}

 //Save maze
 export const saveMaze=(editMazePage)=>{
    console.log("SaveMaze")
    const round=editMazePage.state.round;
    const url= `/api/admit/editMaze/update/${round}`;
    var mazeToString="";
    var startNode, endNode;
    const grid=editMazePage.state.grid;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if(grid[row][col].isStart) startNode=[row, col];
            else if(grid[row][col].isFinish) endNode=[row, col];
            mazeToString += grid[row][col].isWall ? "1" : "0";
        }
    }

    //Create req body
    const updateMaze={
        encodedMaze:mazeToString,
        startNode:startNode,
        endNode: endNode
    }
    
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updateMaze),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res){
            if(res.status!==200){
                return res.json()
            }
        })
        .then(json=>{
            log(`Update round ${round} error: `,json)
        })
        .catch(error=>{
            log(error);
        })

}

//Clear Grid
export const clearBoard=(editMazePage)=>{
    console.log("Clear")
    const grid = getInitialGrid(editMazePage.state.startNode, editMazePage.state.endNode);
    ClearGrid(grid, editMazePage.state.startNode, editMazePage.state.endNode);
    editMazePage.setState({ grid: grid });  //update grid
}

export const resetScore=(round)=>{
    const url= `/api/roundScores/reset/${round}`;
    fetch(url)
        .then(res=>{
            if(res.status!==200){
                return res.json();
            }
        })
        .then(json=>{
            console.log("Reset score error:", json)
        })
        .catch(error=>{
            console.log("Reset score error: ",error)
        })
}


export const clearMaze=(editMazePage, round)=>{
    const url=`/api/admit/editMaze/clear/${round}`

    const resetMaze={
        encodedMaze : "Inite",
        startNode : [START_NODE_ROW, START_NODE_COL],
        endNode : [FINISH_NODE_ROW, FINISH_NODE_COL]
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(resetMaze),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res=>{
          if (res.status === 200) {
            editMazePage.state.mazes[round-1].encodedMaze='Init';
            editMazePage.state.mazes[round-1].startNode=[START_NODE_ROW, START_NODE_COL];
            editMazePage.state.mazes[round-1].endNode=[FINISH_NODE_ROW,FINISH_NODE_COL];
            resetScore(round);
            return editMazePage.state.mazes;
          }
        })
        .then(filteredmazes=>{
            editMazePage.setState({
                mazes: filteredmazes
            });
        })
        .catch(error => {
          console.log("Clear Maze Error: ",error);
        });
}

//Delete a maze
export const removeMaze=(editMazePage, round)=>{
    const url=`/api/admit/editMaze/delete/${round}`
    fetch( url, {
      method: 'delete'
    })
      .then(res=>{
        if (res.status === 200) {
          // filters out the user 
          const filteredmazes = editMazePage.state.mazes.filter(s => {
            return s.round !== round;
          });
          //return reorderMaze(filteredmazes, round-1);
          resetScore(round);
          return filteredmazes;
        }
      })
      .then(filteredmazes=>{
          const NumOfRound=Math.max(editMazePage.state.NumOfRound-1,0);
          editMazePage.setState({
              mazes: filteredmazes,
              NumOfRound: NumOfRound,
          });
      })
      .catch(error => {
        console.log("Delete Maze Error: ",error);
      });
}

