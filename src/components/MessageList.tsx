import type { Message } from '../types/chat'

type MessageListProps = {
  messages: Message[]
}

function MessageList({ messages }: MessageListProps) {
  return (
    <div>
      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.role}:</strong> {msg.content}
        </p>
      ))}
    </div>
  )
}

export default MessageList