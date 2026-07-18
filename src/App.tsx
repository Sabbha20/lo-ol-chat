
type Message = {
  role: 'user' | 'assistant'
  content: string
}

function App() {

  const messages: Message[] = [
    { role: 'user', content: 'Hello, local model!' },
    { role: 'assistant', content: 'Hi! How can I help?' },
  ]

  return (
    <>
      <h1>Ollama Chat</h1>
      {messages.map((msg, i) => (
        <p key={i}>
          <strong>{msg.role}:</strong> {msg.content}
        </p>
      ))}
    </>
  )
}

export default App