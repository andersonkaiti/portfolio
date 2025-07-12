import { Header } from './_components/header/header'
import { Technologies } from './_components/technologies/technologies'

export default function Home() {
  return (
    <main className="mx-auto flex min-h-100vh max-w-7xl flex-col items-center justify-center gap-8 px-2 py-10 md:gap-20 md:px-20 md:py-30">
      <Header />

      <Technologies />
    </main>
  )
}
