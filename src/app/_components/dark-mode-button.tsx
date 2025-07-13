import { Button } from '@components/ui/button'
import { useMounted } from '@hooks/mounted.hook'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function DarkModeButton() {
  const { theme, setTheme } = useTheme()

  const { mounted } = useMounted()

  function toggleTheme() {
    setTheme(() => (theme === 'dark' ? 'light' : 'dark'))
  }

  if (mounted) {
    return (
      <Button className="z-50 ml-auto" onClick={toggleTheme} variant="ghost">
        {theme === 'dark' ? <Moon /> : <Sun />}
      </Button>
    )
  }
}
