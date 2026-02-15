import { Github, Linkedin, Mail } from 'lucide-react'
import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from './ui/section'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/andersonkaiti',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anderson-kaiti-67906126a/',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:anderkaiti@gmail.com',
    icon: Mail,
  },
]

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export function Footer() {
  return (
    <div className="mx-auto max-w-7xl px-2 py-10 md:px-20 md:py-30">
      <SectionContainer id="contact" data-aos="fade-down">
        <SectionHeader>
          <SectionLabel>Contact</SectionLabel>

          <SectionTitle>Let's Work Together</SectionTitle>

          <SectionSubtitle>
            I'm always open to new opportunities and collaborations
          </SectionSubtitle>
        </SectionHeader>

        <Button asChild>
          <Link href="mailto:anderkaiti@gmail.com">
            <Mail className="size-4" />
            <span className={jetbrainsMono.className}>Get in touch</span>
          </Link>
        </Button>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm tracking-wider text-primary">
              AK
            </span>
            <p className="text-xs text-muted-foreground">
              Crafted by Anderson Kaiti
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Button asChild key={link.label} variant="ghost" size="icon">
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
