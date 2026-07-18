import { useState } from 'react';


type Message = {
  role: 'user' | 'assistant'
  content: string
}

function App() {

  const [messages, setMessages] = useState<Message[]>([
  { role: 'user', content: 'Hello, local model!' },
  { role: 'assistant', content: 'Hi! How can I help?' },
])

function handleAdd() {
  setMessages([...messages, { role: 'user', content: 'Another message' }])
}

  return (
    <>
      <h1>Ollama Chat</h1>
      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.role}:</strong> {msg.content}
        </p>
      ))}

      <button onClick={handleAdd}>Add message</button>
    </>
  )
}

export default App