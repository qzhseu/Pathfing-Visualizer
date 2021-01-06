
import { Paper } from '@material-ui/core';
import Node from '../Node/Node';
import "./styles.css";

export const START_NODE_ROW = 10;
export const START_NODE_COL = 15;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 35;

export const getInitialGrid = (startNode, endNode) => {   
    // 50*20 grid
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row, startNode, endNode));
        }
        grid.push(currentRow);
    }
    return grid;
};


export const ClearGrid=(grid , startNode, endNode)=>{
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            var classname=document.getElementById(`node-${row}-${col}`).className;
            if(classname.includes("visited") || classname.includes("shortest") || classname.includes("userselected") || classname.includes("common")){
                document.getElementById(`node-${row}-${col}`).className="node";
                grid[row][col].isVisited=false;
            }
        }
    }
    document.getElementById(`node-${startNode[0]}-${startNode[1]}`).className="node node-start";
    document.getElementById(`node-${endNode[0]}-${endNode[1]}`).className="node node-finish";
}

export const ClearGridSaveSelectedPath=(grid, startNode, endNode)=>{
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            grid[row][col].isVisited=false;
            var classname=document.getElementById(`node-${row}-${col}`).className;
            if(classname.includes("visited") || classname.includes("shortest")){
                document.getElementById(`node-${row}-${col}`).className="node";
            }
            if(classname.includes("userselected") || classname.includes("common")){
                document.getElementById(`node-${row}-${col}`).className="node node-road";
                grid[row][col].isRoad=true;
            }
        }
    }
    document.getElementById(`node-${startNode[0]}-${startNode[1]}`).className="node node-start";
    document.getElementById(`node-${endNode[0]}-${endNode[1]}`).className="node node-finish";
}


export const createNode = (col, row, startNode, endNode) => {
    return {
        col,
        row,
        isStart: row === startNode[0] && col === startNode[1],
        isFinish: row === endNode[0] && col === endNode[1],
        distance: Infinity,
        isVisited: false,
        inShorestPath: false,
        isWall: false,
        isRoad: false,
        previousNode: null,
    };
};


export const getNewGridWithSelectStartNode =(grid, StartNode, row, col) =>{
    //Elimate Start Node
    const preRow=StartNode[0];
    const preCol=StartNode[1];
    grid[preRow][preCol].isStart=false;
    //Update a new node grid
    const newGrid=grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node, 
        isStart: !node.isStart
    };
    newGrid[row][col] = newNode;
    //Update a new Start node
    StartNode[0]=row;
    StartNode[1]=col;
    return newGrid;
}

export const getNewGridWithSelectEndNode =(grid, EndNode, row, col) =>{
    //Elimate End node
    const preRow=EndNode[0];
    const preCol=EndNode[1];
    grid[preRow][preCol].isFinish=false;
    //Update a new node grid
    const newGrid=grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,  
        isFinish: !node.isFinish
    };
    newGrid[row][col] = newNode;
    //Update a new End node
    EndNode[0]=row;
    EndNode[1]=col;
    return newGrid;
}

export const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice(); //copy all grid
    const node = newGrid[row][col];
    const newNode = {
        ...node,  
        isWall: !node.isWall, //isWall = True
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

export const getNewGridWithRoadToggled = (grid, row, col) => {
    const newGrid = grid.slice(); 
    //copy grid
    const node = newGrid[row][col];
    const newNode = {
        ...node, 
        isRoad: !node.isRoad, //isRoad = True
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

export default function GridBoard(props){
    const { grid,  pfPage, mouseIsPressed, handleMouseDown, handleMouseEnter, handleMouseUp, handleMouseOver}=props;  
    return (
        <Paper className="gridBoard">
            <div className="grid" name="gb">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className="grid_row">
                            {row.map((node, nodeIdx) => {
                                const { row, col, isFinish, isStart, isWall, isRoad } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        isRoad={isRoad}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseOver= {handleMouseOver ? (row, col) => handleMouseOver(row, col,  pfPage) : ()=>{}}
                                        onMouseDown={handleMouseDown ? (row, col) => handleMouseDown(row, col,  pfPage) : ()=>{}}
                                        onMouseEnter={handleMouseEnter ? (row, col) => handleMouseEnter(row, col,  pfPage) : ()=>{}}
                                        onMouseUp={handleMouseUp ? () => handleMouseUp( pfPage ) : ()=>{}}
                                        row={row}>
                                    </Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </Paper>
    )
}