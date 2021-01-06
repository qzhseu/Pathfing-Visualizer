import React from 'react'
import NodeIcon from "../Node/NodeIcon"

import "./styles.css"

export default function NodeMeaning(props) {
    const { Name, ClassName} = props;
    return (
        <span className="nodemeaning_item">
             <NodeIcon
                name={Name}
                className={ClassName}
                key={"Icon"+ Name}
            ></NodeIcon>
            <div className="NodeMeaning_Name">{Name}</div>
        </span>
    )
}