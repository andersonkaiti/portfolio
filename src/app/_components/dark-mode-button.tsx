import { Button } from '@components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function DarkModeButton() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      className="z-50 ml-auto size-9"
      onClick={toggleTheme}
      variant="ghost"
    >
      <Moon className="hidden dark:flex" />
      <Sun className="flex dark:hidden" />
    </Button>
  )
}
