// src/lib/utils.ts or src/lib/utils.js
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
