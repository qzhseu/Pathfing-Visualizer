import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    render() {
        const {
            name,
            className
        } = this.props;
        return (
            <div
                id={`node-${name}`} //given id name
                className={className}  //given class name
            ></div>
        );
    }
}
