import * as React from 'react'

import { cn } from '@/lib/utils'

const H3 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h3'>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn('scroll-m-20 text-xl font-semibold tracking-tight md:text-2xl', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
H3.displayName = 'H3'

const H4 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h4'>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn('scroll-m-20 text-lg font-semibold tracking-tight md:text-xl', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
H3.displayName = 'H4'

const P = React.forwardRef<HTMLParagraphElement, React.ComponentProps<'p'>>(
  ({ className, ...props }, ref) => {
    return <p className={cn('text-sm md:text-base md:leading-6', className)} ref={ref} {...props} />
  },
)
P.displayName = 'P'

export { H3, H4, P }
