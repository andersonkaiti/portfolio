import { Button } from '@components/ui/button'
import { useMounted } from '@hooks/mounted.hook'
import { cn } from '@lib/utils'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

export function DarkModeButton() {
  const { theme, setTheme } = useTheme()
  const [rotationDeg, setRotationDeg] = useState(0)
  const { mounted } = useMounted()

  function toggleTheme() {
    setRotationDeg((prev) => theme === "dark" ? prev + 45 : prev - 45)
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }, 100)
  }

  if (mounted) {
    return (
      <Button
        className="z-50 ml-auto size-9"
        onClick={toggleTheme}
        variant="ghost"
      >
        <span
          className={cn(
            'transition-transform duration-300 ease-in-out',
          )}
          style={{ transform: `rotate(${rotationDeg}deg)` }}
        >
          {theme === 'dark' ? <Moon /> : <Sun />}
        </span>
      </Button>
    )
  }
}
