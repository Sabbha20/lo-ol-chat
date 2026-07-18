import { useState } from 'react';
import type { Message, Session } from './types/chat';
import ChatView from './components/ChatView';


function App() {

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  function handleNewChat() {
    const newSession: Session = {
      id: crypto.randomUUID(),
      title: 'New chat',
      messages: [],
    }
    setSessions((prev) => [...prev, newSession])
    setActiveSessionId(newSession.id)
  }
async function handleSend() {
  if (!input.trim() || isLoading || !activeSessionId) return

  setIsLoading(true)
  try {
    const userMsg: Message = { role: 'user', content: input }
    const newMessages = [
      ...messages,
      userMsg,
      { role: 'assistant' as const, content: '' },
    ]
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title: s.title === 'New chat' ? input.slice(0, 30) : s.title,
              messages: newMessages,
            }
          : s
      )
    )
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
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id !== activeSessionId) return s
            const updated = [...s.messages]
            const last = updated[updated.length - 1]
            updated[updated.length - 1] = { ...last, content: last.content + token }
            return { ...s, messages: updated }
          })
        )
      }
    }
  } finally {
    setIsLoading(false)
  }
}

const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null
const messages = activeSession?.messages ?? []

  return (
    <div className="app">
      <aside className="sidebar">
        <button onClick={handleNewChat}>+ New chat</button>
        <div>
          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => setActiveSessionId(s.id)}
              style={{
                fontWeight: s.id === activeSessionId ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
            >
              {s.title}
            </div>
          ))}
        </div>
      </aside>

      <main className="main">
        {activeSession ? (
          <ChatView
            messages={messages}
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            isLoading={isLoading}
          />
        ) : (
          <div className="empty-state">
            <h2>No chat selected</h2>
            <p>Click "+ New chat" to start a conversation.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App