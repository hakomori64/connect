import React from 'react';

const Message = ({message, index}) => (
    <li key={index}>
        <span>
            {message.left_by}:
        </span>
        {message.content}
        <small>
            {message.timestamp.toString()}
        </small>
    </li>
)

export default Message;