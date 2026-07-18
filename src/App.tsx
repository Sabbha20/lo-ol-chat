
type Message = {
  role: 'user' | 'assistant'
  content: string
}

function App() {

  const firstMsg: Message = {
    role: 'user',
    content: "Hello, Ollama!"
  }

  return (
    <>
      <h1>Ollama Chat</h1>
      <h3>{firstMsg.role}</h3>
      <p>{firstMsg.content}</p>
    </>
  )
}

export default App