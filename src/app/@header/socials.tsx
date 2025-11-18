import { FileUser, Github, Linkedin, MessageCircle } from 'lucide-react'

export const links = [
  {
    id: 1,
    ariaLabel: "Visit Anderson Kaiti's GitHub profile",
    href: 'https://github.com/andersonkaiti',
    icon: Github,
    tooltip: (
      <>
        Explore my open-source projects on{' '}
        <span className="font-semibold">GitHub</span>
      </>
    ),
  },
  {
    id: 2,
    ariaLabel: 'Connect with Anderson Kaiti on LinkedIn',
    href: 'https://www.linkedin.com/in/anderson-kaiti-67906126a',
    icon: Linkedin,
    tooltip: (
      <>
        Connect with me professionally on{' '}
        <span className="font-semibold">LinkedIn</span>
      </>
    ),
  },
  {
    id: 3,
    ariaLabel: 'Start a WhatsApp chat with Anderson Kaiti',
    href: 'https://wa.me/14998053657',
    icon: MessageCircle,
    tooltip: (
      <>
        Start a conversation with me on{' '}
        <span className="font-semibold">WhatsApp</span>
      </>
    ),
  },
  {
    id: 4,
    ariaLabel: "Download Anderson Kaiti's résumé",
    href: '/anderson-kaiti-curriculo.pdf',
    icon: FileUser,
    tooltip: (
      <>
        View or download my <span className="font-semibold">Resume</span> (PDF)
      </>
    ),
  },
]
