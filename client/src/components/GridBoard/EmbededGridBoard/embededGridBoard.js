
import Node from './embededNode';
import "./styles.css";

export default function EmbededGridBoard(props){
    const { grid }=props;
    
    return (
            <div className="smgrid" name="smgb">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className="smgrid_row">
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
                                        row={row}>
                                    </Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
    )
}