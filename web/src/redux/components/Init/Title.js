import React from 'react';
import ReactDOM from 'react-dom';

export default function Title({title, intro}) {
    return (
        <div className="title">
            <h4>{title}&nbsp;&nbsp;&nbsp;&nbsp;<span>{intro}</span></h4>
        </div>
    );
}
