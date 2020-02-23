import React from 'react';
// import './ToolbarButton.css';

export default function ToolbarButton(props) {
    const {icon} = props;
    return (
        <>
            <i className={`toolbar-button ${icon}`}/>
            <style jsx>
                {`
                .toolbar-button {
  color: #007aff;
  font-size: 28px;
  transition: all 0.1s;
}

.toolbar-button:hover {
  cursor: pointer;
  color: #0063ce;
}

.toolbar-button:active {
  color: #007aff;
  opacity: 0.25;
}
                `}
            </style>
        </>
    );
}