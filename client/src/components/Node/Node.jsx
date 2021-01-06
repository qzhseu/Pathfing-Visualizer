import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    render() {
        const {
            col,
            row,
            isFinish,
            isStart,
            isWall,
            isRoad,
            onMouseDown,
            onMouseEnter,
            onMouseOver,
            onMouseUp,
        } = this.props;
        const ClassName = isFinish
            ? 'node node-finish'
            : isStart
                ? 'node node-start'
                : isWall 
                    ? 'node-wall'
                    :isRoad
                        ? 'node-road'
                            : '';

        return (
            <div
                id={`node-${row}-${col}`} //given id name
                className={`node ${ClassName}`}  //given class name
                onMouseDown={() => onMouseDown(row, col)}
                onMouseOver={()=>onMouseOver(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}></div>
        );
    }
}
