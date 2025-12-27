import { AnimatedThemeToggler } from '@components/ui/animated-theme-toggler'
import { Button } from '@components/ui/button'

export function DarkModeButton() {
  return (
    <Button asChild className="z-50 ml-auto size-9" variant="ghost">
      <AnimatedThemeToggler />
    </Button>
  )
}
