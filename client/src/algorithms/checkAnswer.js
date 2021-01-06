export function checkAnswer(grid, startNode){
    const rows=grid.length;
    const cols=grid[0].length;
    const visited = new Array(rows);
    const checkOrder=[];
    for(let i=0; i<rows; i++){
        visited[i]=new Array(cols);
    }
    if(dfs(startNode.row, startNode.col, grid, visited, checkOrder)) return [true,checkOrder];
    return [false,checkOrder];
}

export function getSelectedNodes(grid){
    var selectedPath = getAllNodes(grid);
    selectedPath=selectedPath.filter(node=>node.isRoad);
    return selectedPath;
}

function dfs(row, col, grid, visited, checkOrder){
    if(row<0 || row>=grid.length || col<0 || col>=grid[0].length || grid[row][col].isWall){
        return false;
    }
    if(grid[row][col].isFinish){
        checkOrder.push(grid[row][col]);
        return true;
    }
    if(visited[row][col] || (!grid[row][col].isRoad && !grid[row][col].isStart)){
        return false;
    }
    visited[row][col]=true;
    checkOrder.push(grid[row][col])
    const canFind =
        dfs(row + 1, col, grid, visited,checkOrder) ||
        dfs(row - 1, col, grid, visited,checkOrder) ||
        dfs(row, col + 1, grid, visited,checkOrder) ||
        dfs(row, col - 1, grid, visited,checkOrder); 

    if(canFind) return true;
    visited[row][col] = false; 
    return false;
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


