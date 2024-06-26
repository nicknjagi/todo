  'use client'

import {NextUIProvider} from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({children}) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextUIProvider>
  )
} 