const context = new AudioContext()

export class Sound {
  src = ''
  buffer: AudioBuffer | null = null

  constructor(src: string) {
    this.src = src
    this.load()
  }

  async load(): Promise<void> {
    if (!this.src) throw new Error('missing sound src')
    if (this.buffer) return

    const response = await fetch(this.src)
    const arrayBuffer = await response.arrayBuffer()
    this.buffer = await context.decodeAudioData(arrayBuffer)
  }

  play(): void {
    if (!this.buffer) {
      console.warn('sound not loaded')
      return
    }

    const source = context.createBufferSource()
    source.buffer = this.buffer
    source.connect(context.destination)
    source.start(0)
  }
}
