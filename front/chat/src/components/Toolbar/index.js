import React from 'react';
// import './Toolbar.css';

export default function Toolbar(props) {
    const {title, leftItems, rightItems} = props;
    return (
        <>
            <div className="toolbar">
                <div className="left-items">{leftItems}</div>
                <h1 className="toolbar-title">{title}</h1>
                <div className="right-items">{rightItems}</div>
            </div>
            <style jsx>
                {`
                .toolbar {
  display: flex;
  align-items: center;

  background-color: #effbf5;
  font-weight: 500;
  border-bottom: 1px solid #eeeef1;

  position: sticky;
  top: 0px;
}

@supports (backdrop-filter: blur(20px)) {
  .toolbar {
    border: none;
    background-color: rgba(239, 251, 245, 0.8);
    backdrop-filter: blur(20px);
  }
}

.toolbar-title {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.left-items, .right-items {
  flex: 1;
  padding: 10px;
  display: flex;
}

.right-items {
  flex-direction: row-reverse;
}

.left-items .toolbar-button {
  margin-right: 20px;
}

.right-items .toolbar-button {
  margin-left: 20px;
}

.left-items .toolbar-button:last-child,
.right-items .toolbar-button:last-child {
  margin: 0;
}
                `}
            </style>
        </>
    );
}