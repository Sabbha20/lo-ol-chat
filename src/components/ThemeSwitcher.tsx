type ThemeSwitcherProps = {
  theme: string
  onThemeChange: (theme: string) => void
}

const THEMES = [
  { id: 'cozy', label: '🔥 Cozy' },
  { id: 'terminal', label: '💻 Terminal' },
  { id: 'minimal', label: '⬜ Minimal' },
  { id: 'playful', label: '🎨 Playful' },
]

function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <select
      className="theme-select"
      value={theme}
      onChange={(e) => onThemeChange(e.target.value)}
    >
      {THEMES.map((t) => (
        <option key={t.id} value={t.id}>{t.label}</option>
      ))}
    </select>
  )
}

export default ThemeSwitcher