import React, { Component } from 'react';

import './styles.css';

export default class Node extends Component {
    render() {
        const {
            col,
            row,
            isFinish,
            isStart,
            isWall,
            isRoad,
        } = this.props;
        const ClassName = isFinish
            ? 'smnode smnode-finish'
            : isStart
                ? 'smnode smnode-start'
                : isWall 
                    ? 'smnode-wall'
                        : '';

        return (
            <div
                id={`smnode-${row}-${col}`} //given id name
                className={`smnode ${ClassName}`}  //given class name
            ></div>
        );
    }
}
