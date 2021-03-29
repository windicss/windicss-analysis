export function uniq<T>(data: T[]): T[] {
  return Array.from(new Set(data))
}

export function countElement<T>(arr: T[], element: T): number {
  let num = 0
  arr.forEach((i) => {
    if (i === element)
      num += 1
  })
  return num
}
