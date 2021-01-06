
let time1;
let time2;
let time3;
let currentRound=1;
let animateFinish=false;
let state="";

export function stopAnimation(round){
    currentRound=round;
    clearTimeout(time1)
    clearTimeout(time2)
    clearTimeout(time3)
    return;
}

export function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, selectedPath, round, speed, setState) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            time2=setTimeout(() => {
                if(round!==currentRound){
                    visitedNodesInOrder=[];
                    nodesInShortestPathOrder=[];
                    setState({animationFinish: true})
                    return;
                }else{
                    animatePath(nodesInShortestPathOrder, selectedPath,round, setState);
                }
            }, 10 *speed * i);
            return;
        }
        time1=setTimeout(() => {
            if(round!==currentRound){
                visitedNodesInOrder=[];
                nodesInShortestPathOrder=[];
                setState({animationFinish: true})
                return;
            }else{
                if(i<visitedNodesInOrder.length){
                    const node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className ='node node-visited';
                }
            }
        }, 10 * speed * i);
    }
}

export function animatePath(nodesInShortestPathOrder, nodeInUserSelectedOrder,round, setState) {
    const len= Math.max(nodesInShortestPathOrder.length, nodeInUserSelectedOrder.length);
    for (let i = 0; i < len; i++) {
        time3=setTimeout(() => {
            if(round===currentRound){
                if(i===len-1) {
                    animateFinish=true;
                    setState({animationFinish: true})
                }
                if(i<nodesInShortestPathOrder.length){
                    const nodeInShortestPath = nodesInShortestPathOrder[i];
                    document.getElementById(`node-${nodeInShortestPath.row}-${nodeInShortestPath.col}`).className =
                    'node node-shortest-path';
                }
                if(i<nodeInUserSelectedOrder.length && nodeInUserSelectedOrder.length>1){
                    const nodeInUserSelected =nodeInUserSelectedOrder[i];
                    var idx=nodesInShortestPathOrder.indexOf(nodeInUserSelected);
                    if(idx>-1){
                        var curRow=nodeInUserSelected.row;
                        var nextRow= idx===0 ?  nodeInUserSelectedOrder[i+1].row : nodeInUserSelectedOrder[i-1].row;
                        document.getElementById(`node-${nodeInUserSelected.row}-${nodeInUserSelected.col}`).className =
                            nextRow===curRow ? 'node node-common-path-horizontal':'node node-common-path-vertical';
                    }else{
                        document.getElementById(`node-${nodeInUserSelected.row}-${nodeInUserSelected.col}`).className =
                            'node node-userselected-path';
                    }  
                }
            }else{
                setState({animationFinish: true})
            }
        }, 100 * i);
    }
}


export function selectPath(node, shortestPath, selectedPath, animation){
    if(!animation) return;
    const element=document.getElementById(`node-${node.row}-${node.col}`)
    if(element.className.includes("node-shortest-path")){
        if(state!=="ShorestPath" && animateFinish){
            state="ShorestPath";
            shortestPath.map((node)=>{
                document.getElementById(`node-${node.row}-${node.col}`).className="node";
                setTimeout( ()=>{
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-shortest-path';
                },1)
            })
        }
    }else if(element.className.includes("node-userselected-path")){
        if(state!=="UserSelectedPath" && animateFinish){
            state="UserSelectedPath";
            //console.log(state)
            selectedPath.map((node)=>{
                document.getElementById(`node-${node.row}-${node.col}`).className="node";
                setTimeout( ()=>{
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-userselected-path';
                },1)
            })
        }
    }else{
        if(state!=="Normal" && animateFinish){
            state="Normal";
            shortestPath.map((node)=>{
                var idx=selectedPath.indexOf(node);
                if(idx>-1 && selectedPath.length>1){
                    var curRow=selectedPath[idx].row;
                    var nextRow= idx===0 ?  selectedPath[idx+1].row : selectedPath[idx-1].row;
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                          nextRow===curRow ? 'node node-common-path-horizontal-hover':'node node-common-path-vertical-hover';
                }
            })
        }
    }
}