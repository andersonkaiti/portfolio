import { CheckIcon, DatabaseIcon, LockIcon } from '@components/iso/step-icons'
import { Reveal } from '@components/ui/reveal'
import { SectionContainer, SectionTitle } from '@components/ui/section'
import { StepsStepper } from '@components/ui/steps-stepper'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'
import { StepNumber } from './step-number'

const STEPS = [
  { key: 's1', icon: LockIcon },
  { key: 's2', icon: DatabaseIcon },
  { key: 's3', icon: CheckIcon },
] as const

export async function StepsSection() {
  const t = await getTranslations('steps')

  return (
    <SectionContainer className="pt-8 pb-14 md:pb-20">
      <Reveal>
        <SectionTitle className="md:text-center">{t('title')}</SectionTitle>
      </Reveal>

      <StepsStepper className="ak-steps mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14 md:mt-4 md:gap-x-16">
        {STEPS.map(({ key, icon: Icon }, index) => (
          <Reveal
            key={key}
            data-step
            delay={index * 120}
            className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-8 md:flex md:flex-col md:items-center md:gap-8 md:text-center"
          >
            <div className="col-start-2 row-start-1 flex items-center justify-end md:col-auto md:row-auto md:items-end md:justify-center">
              <span className="flex md:hidden">
                <Icon compact />
              </span>
              <span className="hidden md:block">
                <Icon />
              </span>
            </div>

            <div className="relative col-start-1 row-start-1 flex items-center gap-5 md:col-auto md:row-auto md:w-full md:justify-center">
              <span className="relative z-10 font-display text-[56px] leading-[0.9] font-bold tracking-[-0.04em] text-primary md:bg-background md:px-5 md:text-[72px]">
                <StepNumber value={String(index + 1).padStart(2, '0')} />
              </span>
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -mt-px hidden h-0.5 w-[calc(100%+4rem)] overflow-hidden bg-border md:block"
                >
                  <span
                    data-step-fill
                    className="ak-step-fill absolute inset-0 bg-primary"
                  />
                </span>
              )}
            </div>

            <div className="col-span-2 row-start-2 md:col-auto md:row-auto">
              <p
                className={cn(
                  'mb-4 text-[15px] uppercase tracking-[0.06em] text-primary',
                  jetBrainsMono.className,
                )}
              >
                {t(`${key}.tag`)}
              </p>
              <h3 className="text-2xl leading-[1.05] md:text-[30px] font-bold tracking-[-0.02em]">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-3 max-w-[28em] text-[17px] text-body md:max-w-none md:text-[19px]">
                {t(`${key}.desc`)}
              </p>
            </div>
          </Reveal>
        ))}
      </StepsStepper>
    </SectionContainer>
  )
}
