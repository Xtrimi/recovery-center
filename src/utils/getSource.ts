const images = import.meta.glob('@/assets/objects/*.webp', { eager: true, import: 'default' })

const imageMap: Record<string, string> = {}

for (const path in images) {
  const fileName = path.split('/').pop()!.replace('.webp', '')
  const parsedFileName = fileName.toLowerCase().replace('_', '')

  imageMap[parsedFileName] = images[path] as string
}

export function getSource(input: string): string | null {
  return imageMap[input] ?? null
}
