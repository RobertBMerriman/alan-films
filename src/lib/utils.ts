import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function partition<T>(
  array: T[],
  callback: (element: T, index: number, array: T[]) => boolean,
) {
  return array.reduce<T[][]>(
    (result, element, i) => {
      if (callback(element, i, array)) {
        result[0].push(element)
      } else {
        result[1].push(element)
      }

      return result
    },
    [[], []],
  )
}
