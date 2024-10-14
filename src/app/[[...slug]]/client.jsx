'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../Root'), { ssr: false })

export const ClientOnly = () => {
  return <App />
}
