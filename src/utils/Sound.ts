window.AudioContext = window.AudioContext

const context = new AudioContext()

export class Sound {
  url = ''
  buffer: AudioBuffer | null = null

  constructor(url: string) {
    this.url = url
  }

  async load(): Promise<void> {
    if (!this.url) throw new Error('Missing sound URL')
    if (this.buffer) return

    const response = await fetch(this.url)
    const arrayBuffer = await response.arrayBuffer()
    this.buffer = await context.decodeAudioData(arrayBuffer)
  }

  play(): void {
    if (!this.buffer) {
      console.warn('Sound not loaded')
      return
    }

    const source = context.createBufferSource()
    source.buffer = this.buffer
    source.connect(context.destination)
    source.start(0)
  }
}
