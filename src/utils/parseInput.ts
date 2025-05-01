const aliases = {
  eight: '8',
  nine: '9',
  income_tax_return_document: 'itrd',
}

export function parseInput(input: string): string {
  let cleanInput = input
    .toLowerCase()
    .trim()
    .replace(/[^A-Za-z0-9]/i, '_')

  for (const [alias, normalized] of Object.entries(aliases)) {
    cleanInput = cleanInput.replace(alias, normalized)
  }

  return cleanInput
}
