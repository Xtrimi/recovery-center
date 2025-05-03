const aliases = {
  eight: '8',
  nine: '9',
  incometaxreturndocument: 'itrd',
}

export function parseInput(input: string): string {
  let cleanInput = input
    .toLowerCase()
    .trim()
    .replace(/[^A-Za-z0-9]/i, '')

  for (const [alias, normalized] of Object.entries(aliases)) {
    cleanInput = cleanInput.replace(alias, normalized)
  }

  return cleanInput
}
