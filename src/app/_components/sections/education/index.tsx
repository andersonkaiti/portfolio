import { Badge } from '@components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { GraduationCap, Languages } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export async function EducationSection() {
  const t = await getTranslations('education')

  return (
    <SectionContainer id="education">
      <SectionHeader>
        <SectionLabel>{t('label')}</SectionLabel>

        <SectionTitle>{t('title')}</SectionTitle>

        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card
          className="border-none bg-transparent shadow-none"
          data-aos="fade-up"
          data-aos-delay={200}
          style={{ transitionDelay: '200ms' }}
        >
          <CardHeader className="relative flex justify-center gap-2">
            <Badge className="border-emerald-500/20 bg-emerald-500/10 p-2">
              <GraduationCap className="size-10 text-emerald-500" />
            </Badge>
            <div>
              <CardTitle
                className={`font-semibold text-xl tracking-tight ${jetBrainsMono.className}`}
              >
                {t('degree.type')}
              </CardTitle>
              <h4
                className={`font-semibold text-base text-muted-foreground tracking-tight ${jetBrainsMono.className}`}
              >
                {t('degree.institution')}
              </h4>
            </div>

            <div className="absolute inset-0 top-2 size-full rounded-xl bg-linear-to-b from-background/0 to-background/80" />
          </CardHeader>

          <CardContent className="relative z-1 space-y-1">
            <CardTitle className="text-center text-base">
              {t('degree.title')}
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              {t('degree.description')}
            </p>
          </CardContent>

          <CardFooter className="z-1">
            <Badge className="mx-auto rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              {t('degree.badge')}
            </Badge>
          </CardFooter>
        </Card>

        <Card
          className="border-none bg-transparent shadow-none"
          data-aos="fade-up"
          data-aos-delay={400}
          style={{ transitionDelay: '400ms' }}
        >
          <CardHeader className="relative flex justify-center gap-2">
            <Badge className="border-emerald-500/20 bg-emerald-500/10 p-2">
              <Languages className="size-10 text-emerald-500" />
            </Badge>
            <div>
              <CardTitle
                className={`font-semibold text-xl tracking-tight ${jetBrainsMono.className}`}
              >
                {t('languages.type')}
              </CardTitle>
              <h4
                className={`font-semibold text-base text-muted-foreground tracking-tight ${jetBrainsMono.className}`}
              >
                {t('languages.institution')}
              </h4>
            </div>

            <div className="absolute inset-0 top-2 size-full rounded-xl bg-linear-to-b from-background/0 to-background/80" />
          </CardHeader>

          <CardContent className="z-1 space-y-1">
            <CardTitle className="text-center text-base">
              {t('languages.title')}
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              {t('languages.description')}
            </p>
          </CardContent>

          <CardFooter className="z-1 h-full">
            <Badge className="mx-auto mt-auto rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              {t('languages.badge')}
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  )
}
