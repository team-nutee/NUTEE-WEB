import React, {useEffect} from 'react';
import shave from 'shave';

// import './ConversationListItem.css';

export default function ConversationListItem(props) {
    useEffect(() => {
        shave('.conversation-snippet', 30);
    });

    const {photo, name, text} = props.data;

    return (
        <>
            <div className="conversation-list-item">
                <img className="conversation-photo" src={photo} alt="conversation"/>
                <div className="conversation-info">
                    <h1 className="conversation-title">{name}</h1>
                    <p className="conversation-snippet">{text}</p>
                </div>
            </div>
            <style jsx>
                {`
                .conversation-list-item {
  display: flex;
  align-items: center;
  padding: 10px;
}

.conversation-list-item:hover {
  background: #eeeef1;
  cursor: pointer;
}

.conversation-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.conversation-title {
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0;
}

.conversation-snippet {
  font-size: 14px;
  color: #888;
  margin: 0;
}
                `}
            </style>
        </>
    );
}