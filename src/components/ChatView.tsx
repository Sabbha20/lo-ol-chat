import type { Message, Session } from '../types/chat'
import MessageList from './MessageList'
import Composer from './Composer'

type ChatViewProps = {
  messages: Message[]
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
  isLoading: boolean
}

function ChatView({ messages, input, onInputChange, onSend, isLoading }: ChatViewProps) {
  return (
    <>
        <div className="chat-header">
        <span>Chatting with llama3.2:1b</span>
        </div>
        <MessageList messages={messages} />
        <Composer
        input={input}
        onInputChange={onInputChange}
        onSend={onSend}
        isLoading={isLoading}
        />
    </>
    )
}

export default ChatView