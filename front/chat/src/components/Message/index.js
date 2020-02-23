import React from 'react';
import moment from 'moment';
// import './Message.css';

export default function Message(props) {
    const {
        data,
        isMine,
        startsSequence,
        endsSequence,
        showTimestamp
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
        <>
            <div className={[
                'message',
                `${isMine ? 'mine' : ''}`,
                `${startsSequence ? 'start' : ''}`,
                `${endsSequence ? 'end' : ''}`
            ].join(' ')}>
                {
                    showTimestamp &&
                    <div className="timestamp">
                        {friendlyTimestamp}
                    </div>
                }

                <div className="bubble-container">
                    <div className="bubble" title={friendlyTimestamp}>
                        {data.message}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                .message {
  display: flex;
  flex-direction: column;
}

.message .timestamp {
  display: flex;
  justify-content: center;
  color: #999;
  font-weight: 600;
  font-size: 12px;
  margin: 10px 0px;
  text-transform: uppercase;
}

.message .bubble-container {
  font-size: 14px;
  display: flex;
}

.message.mine .bubble-container {
  justify-content: flex-end;
}

.message.start .bubble-container .bubble {
  /* margin-top: 10px; */
  border-top-left-radius: 20px;
}

.message.end .bubble-container .bubble {
  border-bottom-left-radius: 20px;
  /* margin-bottom: 10px; */
}

.message.mine.start .bubble-container .bubble {
  margin-top: 10px;
  border-top-right-radius: 20px;
}

.message.mine.end .bubble-container .bubble {
  border-bottom-right-radius: 20px;
  margin-bottom: 10px;
}

.message .bubble-container .bubble {
  margin: 1px 0px;
  background: #d5f8dd;
  padding: 10px 15px;
  max-width: 75%;
  border-radius: 2px 20px 20px 2px;
}

.message.mine .bubble-container .bubble {
  background: #13C276;
  color: white;
  border-radius: 20px 2px 2px 20px;
}
                `}
            </style>
        </>
    );
}