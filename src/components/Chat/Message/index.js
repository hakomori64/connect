import React from 'react';
import styled from 'styled-components';


const Img = styled.img`
    height: 50px;
    width: 50px;
`

const Message = ({icon_url, message, index}) => (
    <li key={index}>
        <Img src={icon_url} alt={message.left_by} />
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