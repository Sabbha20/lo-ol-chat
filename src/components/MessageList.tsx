import type { Message } from '../types/chat'

type MessageListProps = {
  messages: Message[]
}

function MessageList({ messages }: MessageListProps) {
  return (
    <div className="messages">
        {messages.map((msg, i) => (
        <div key={i} className={`msg msg-${msg.role}`}>
            {msg.role === 'assistant' && (
            <div className="avatar">
                <span className="eyes"><i></i><i></i></span>
            </div>
            )}
            <div className="bubble">{msg.content}</div>
        </div>
        ))}
    </div>
    )
}

export default MessageList