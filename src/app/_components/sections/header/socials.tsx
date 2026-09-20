import { Github, Linkedin, MessageCircle } from 'lucide-react'

export type SocialAriaLabelKey =
  | 'social.github'
  | 'social.linkedin'
  | 'social.whatsapp'

export const links = [
  {
    id: 1,
    ariaLabelKey: 'social.github' as SocialAriaLabelKey,
    href: 'https://github.com/andersonkaiti',
    icon: Github,
  },
  {
    id: 2,
    ariaLabelKey: 'social.linkedin' as SocialAriaLabelKey,
    href: 'https://www.linkedin.com/in/andersonkaiti/',
    icon: Linkedin,
  },
  {
    id: 3,
    ariaLabelKey: 'social.whatsapp' as SocialAriaLabelKey,
    href: 'https://wa.me/14998053657',
    icon: MessageCircle,
  },
]
