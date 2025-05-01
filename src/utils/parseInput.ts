const images = import.meta.glob('@/assets/objects/*.webp', { eager: true, import: 'default' })

const aliases = {
  eight: '8',
  nine: '9',
  income_tax_return_document: 'itrd',
}

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

  for (const [alias, normalized] of Object.entries(aliases)) {
    cleanInput = cleanInput.replace(alias, normalized)
  }

  return imageMap[cleanInput] ?? null
}
