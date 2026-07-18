import { useState } from 'react';


type Message = {
  role: 'user' | 'assistant'
  content: string
}

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
      stream: false,
    }),
  })

  const data = await res.json()
  const reply: Message = { role: 'assistant', content: data.message.content }
  setMessages([...newMessages, reply])
}


  return (
    <>
      <h1>Ollama Chat</h1>
      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.role}:</strong> {msg.content}
        </p>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </>
  )
}

export default App