import React from 'react';
// import './ToolbarButton.css';

export default function ToolbarButton(props) {
    const {icon} = props;
    return (
        <>
            <i style={{margin:'0px 10px'}} className={`toolbar-button ${icon}`}/>
            <style jsx>
                {`
                .toolbar-button {
  color: #13C276;
  font-size: 28px;
  transition: all 0.1s;
}

.toolbar-button:hover {
  cursor: pointer;
  color: #0B6121;
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