type ComposerProps = {
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
}

function Composer({ input, onInputChange, onSend }: ComposerProps) {
  return (
    <div>
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={onSend}>Send</button>
    </div>
  )
}

export default Composer