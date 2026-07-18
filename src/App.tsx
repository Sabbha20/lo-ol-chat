import { useState } from 'react';
import type { Message } from './types/chat';
import ChatView from './components/ChatView';


function App() {

  const [input, setInput] = useState('')

  const [messages, setMessages] = useState<Message[]>([
  { role: 'user', content: 'Hello, local model!' },
  { role: 'assistant', content: 'Hi! How can I help?' },
])

async function handleSend() {
  if (!input.trim()) return

  const userMsg: Message = { role: 'user', content: input }
  const newMessages = [...messages, userMsg]
  setMessages(newMessages)
  setInput('')

  const res = await fetch('/ollama/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2:1b',
      messages: newMessages,
      stream: true,
    }),
  })

  // Add an empty assistant message we'll fill in as tokens arrive
  setMessages([...newMessages, { role: 'assistant', content: '' }])

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n').filter((line) => line.trim())

    for (const line of lines) {
      const data = JSON.parse(line)
      const token = data.message?.content ?? ''

      setMessages((prev) => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        updated[updated.length - 1] = {
          ...last,
          content: last.content + token,
        }
        return updated
      })
    }
  }
}

  return (
    <>
      <h1>lo-ol Chat</h1>
      <ChatView
        messages={messages}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
      />
    </>
  )
}

export default App