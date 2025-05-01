const images = import.meta.glob('@/assets/objects/*.webp', { eager: true, import: 'default' })

const imageMap: Record<string, string> = {}

for (const path in images) {
  const fileName = path.split('/').pop()!.replace('.webp', '')
  imageMap[fileName.toLowerCase()] = images[path] as string
}

export function parseInput(input: string): string | null {
  let cleanInput = input
    .toLowerCase()
    .trim()
    .replace(/[^A-Za-z0-9]/i, '_')

  // edge cases
  cleanInput = cleanInput.replace('eight', '8').replace('nine', '9')

  return imageMap[cleanInput] ?? null
}
