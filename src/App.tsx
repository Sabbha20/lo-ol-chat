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

function handleAdd() {
  if (!input.trim()) return
  setMessages([...messages, { role: 'user', content: input }])
  setInput('')
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
      <button onClick={handleAdd}>Add message</button>
    </>
  )
}

export default App