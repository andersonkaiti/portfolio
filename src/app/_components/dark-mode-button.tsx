import { AnimatedThemeToggler } from '@components/magicui/animated-theme-toggler'
import { Button } from '@components/ui/button'
import { useTheme } from 'next-themes'

export function DarkModeButton() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      asChild
      className="z-50 ml-auto size-9"
      onClick={toggleTheme}
      variant="ghost"
    >
      <AnimatedThemeToggler />
    </Button>
  )
}
