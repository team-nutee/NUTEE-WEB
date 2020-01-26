import React from 'react';
// import './Compose.css';

export default function Compose(props) {
    return (
        <>
            <div className="compose">
                <input
                    type="text"
                    className="compose-input"
                    placeholder="Type a message, @name"
                />
                {props.rightItems}
            </div>
            <style jsx>
                {`
                    .compose {
  padding: 10px;
  display: flex;
  align-items: center;
  background: #effbf5;
  border-top: 1px solid #eeeef1;
  position: fixed;
  width: calc(100% - 20px);
  bottom: 0px;
}

@supports (backdrop-filter: blur(20px)) {
  .compose {
    border: none;
    background-color: rgba(239, 251, 245, 0.8);
    backdrop-filter: blur(20px);
  }
}

.compose-input {
  flex: 1;
  border: none;
  font-size: 14px;
  height: 40px;
  background: none;
}

.compose-input::placeholder {
  opacity: 0.3;
}

.compose .toolbar-button {
  color: #bbbbbf;
  margin-left: 15px;
}

.compose .toolbar-button:hover {
  color: #99999c;
}
                `}
            </style>
        </>
    );
}