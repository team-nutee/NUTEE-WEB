import React from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
// import './Messenger.css';
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";

export default function Messenger(props) {
    return (
        <>
            <div className="messenger">
                <div className="scrollable sidebar">
                    <ConversationList/>
                </div>

                <div className="scrollable content">
                    <MessageList/>
                </div>
            </div>
            <style jsx>
                {`
                .messenger {
  display: grid;
  width: 100%;
  height: 94vh;
  background: #effbf5;

  grid-template-columns: 350px auto;
  grid-template-rows: 60px auto 60px;
  grid-column-gap: 1px;
  grid-row-gap: 1px;
}

.container {
  padding: 10px;
}

.scrollable {
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.sidebar {
  background: #effbf5;
  grid-row-start: 1;
  grid-row-end: span 3;
}

.content {
  background: #effbf5;
  grid-row-start: 1;
  grid-row-end: span 3;
}

.footer {
  grid-column-start: 2;
  background: #effbf5;
}
                `}
            </style>
        </>
    );
}