'use client'

import { env } from '@config/env'
import ClarityClient from '@microsoft/clarity'
import { useEffect } from 'react'

export function Clarity() {
  useEffect(() => {
    const projectId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID

    if (process.env.NODE_ENV !== 'production' || !projectId) {
      return
    }

    ClarityClient.init(projectId)
  }, [])

  return null
}
