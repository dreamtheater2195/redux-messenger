import React from 'react';
const Message = ({ owner: { name }, text }) => (
    <div>
        <b>{name}</b>: {text}
    </div>
)

export default Message;