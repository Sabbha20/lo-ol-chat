import type { Message } from '../types/chat'
import MessageList from './MessageList'
import Composer from './Composer'

type ChatViewProps = {
  messages: Message[]
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
}

function ChatView({ messages, input, onInputChange, onSend }: ChatViewProps) {
  return (
    <div>
      <MessageList messages={messages} />
      <Composer input={input} onInputChange={onInputChange} onSend={onSend} />
    </div>
  )
}

export default ChatView