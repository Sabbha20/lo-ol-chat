type ComposerProps = {
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
  isLoading: boolean
}

function Composer({ input, onInputChange, onSend, isLoading }: ComposerProps) {
  return (
    <div>
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type a message"
        disabled={isLoading}
      />
      <button onClick={onSend} disabled={isLoading}>
        {isLoading ? 'Sending…' : 'Send'}
      </button>
    
    </div>
  )
}

export default Composer