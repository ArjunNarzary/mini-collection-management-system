import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFirstTwoChars = (str: string | undefined) => {
  if (!str) return "0"
  return (str[0] || "" + str[1] || "").toUpperCase()
}
