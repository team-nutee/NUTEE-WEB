import React from 'react';
// import './ConversationSearch.css';

export default function ConversationSearch() {
    return (
        <>
            <div className="conversation-search">
                <input
                    type="search"
                    className="conversation-search-input"
                    placeholder="Search Messages"
                />
            </div>
            <style jsx>
                {`
                .conversation-search {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.conversation-search-input {
  background: #f4f4f8;
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
}

.conversation-search-input::placeholder {
  text-align: center;
}

.conversation-search-input:focus::placeholder {
  text-align: left;
}
                `}
            </style>
        </>
    );
}