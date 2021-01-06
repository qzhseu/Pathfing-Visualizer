let bfsSearched=false;
const searchDirections=[[1,0],[0,1],[0,-1],[-1,0]];

//Dijkstra Algorithm
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const nextClosest = unvisitedNodes.shift(); 
        if (nextClosest.isWall) continue;
        if (nextClosest.distance === Infinity) return visitedNodesOrder;
        nextClosest.isVisited = true;
        visitedNodesOrder.push(nextClosest);
        if (nextClosest === finishNode) return visitedNodesOrder;

        //Update unvisited neighbour nodes
        const unvisitedNeighbors = getUnvisitedNeighbors(nextClosest, grid);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = nextClosest.distance + 1;
            neighbor.previousNode = nextClosest;
        }
    }
}


//A star Algorithm
export function AStar(grid, startNode, finishNode){
    console.log("AStar")
    const visitedNodersOrder=[];
    startNode.distance =0;
    startNode.fScore= getFscore(startNode, finishNode);
    const openSet=[];
    openSet.push(startNode);
    while(!!openSet.length){
        sortNodesByFscore(openSet);
        const nextClosest= openSet.shift();
        if(nextClosest.isWall) continue;
        if(nextClosest.distance === Infinity) return visitedNodersOrder;
        nextClosest.isVisited=true;
        visitedNodersOrder.push(nextClosest);
        if(nextClosest===finishNode) return visitedNodersOrder;

        //Update unvisited neighbour nodes
        const unvisitedNeighbors = getUnvisitedNeighbors(nextClosest, grid);
        for(const neighbor of unvisitedNeighbors){
            if(openSet.includes(neighbor)){
                if(neighbor.distance>nextClosest.distance+1){
                    neighbor.distance=nextClosest.distance+1;
                    neighbor.previousNode = nextClosest;
                    neighbor.fScore=neighbor.distance+ getFscore(neighbor, finishNode);
                }
            }else{
                neighbor.distance=nextClosest.distance+1;
                neighbor.previousNode = nextClosest;
                neighbor.fScore=neighbor.distance+ getFscore(neighbor, finishNode);
                openSet.push(neighbor);
            }
        }
    }
    return visitedNodersOrder;
}

//DFS Algorithm
export function dfsSearch(grid, startNode, finishNode){
    const visitedNodersOrder=[];
    startNode.distance=0;
    dfs(grid, startNode, finishNode, visitedNodersOrder);
    bfsSearched=false;
    return visitedNodersOrder;
}

function dfs(grid, startNode, finishNode, visitedNodersOrder){
    if(startNode.isWall) return false;
    if(bfsSearched) return true;
    const startCol=startNode.col;
    const startRow=startNode.row;
    const finishCol=finishNode.col;
    const finishRow=finishNode.row;
    if(startCol===finishCol && startRow === finishRow){
        bfsSearched=true;
        return true;
    } 
    visitedNodersOrder.push(startNode);
    startNode.isVisited=true;
    //Get available next nodes
    const unvisitedNeighbors = getUnvisitedNeighbors(startNode, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = startNode.distance + 1;
        neighbor.previousNode = startNode;
        dfs(grid, neighbor, finishNode, visitedNodersOrder);
    }
    return true;
}

//BFS Algorithm
export function bfsSearch(grid, startNode, finishNode){
    const visitedNodersOrder=[];
    const queue=[];
    var bfsSearch=false;

    startNode.distance=0;
    queue.push(startNode);

    while(queue!=0 && !bfsSearch){
        var queueLen=queue.length;
        for(var i=0; i<queueLen; i++){
            const curNode=queue.shift();
            if (curNode.isWall) continue;
            curNode.isVisited=true;
            visitedNodersOrder.push(curNode);
            if(curNode === finishNode) {
                bfsSearch=true;
                break;
            }
            const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
            for(const neighbor of unvisitedNeighbors){
                neighbor.distance = curNode.distance + 1;
                neighbor.previousNode = curNode;
                neighbor.isVisited=true;
                queue.push(neighbor);
            }
        }
    }
    return visitedNodersOrder;
}


//Get shorestest path
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        currentNode.inShorestPath=true;
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

function getFscore(node, finishNode){
    return Math.abs(node.col-finishNode.col)+ Math.abs(node.row-finishNode.row);
}


function sortNodesByFscore(openSet){
    openSet.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore);
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}


function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    for(const dir of searchDirections){
        var nextRow=row+dir[0];
        var nextCol=col+dir[1];
        if(nextRow>=0 && nextCol>=0 && nextRow<grid.length  && nextCol<grid[0].length){
            neighbors.push(grid[nextRow][nextCol]);
        }
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}



