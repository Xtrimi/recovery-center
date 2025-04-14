window.AudioContext = window.AudioContext || window.webkitAudioContext
//todo: revise this
//https://stackoverflow.com/questions/61453760/how-to-rapidly-play-multiple-copies-of-a-soundfile-in-javascript
export class Sound {
  private context = new AudioContext()
  private buffer: AudioBuffer | null = null

  constructor(private url: string) {}

  async load(): Promise<void> {
    if (!this.url) throw new Error('Missing sound URL')
    if (this.buffer) return

    const response = await fetch(this.url)
    const arrayBuffer = await response.arrayBuffer()
    this.buffer = await this.context.decodeAudioData(arrayBuffer)
  }

  play(): void {
    if (!this.buffer) {
      console.warn('Sound not loaded')
      return
    }

    const source = this.context.createBufferSource()
    source.buffer = this.buffer
    source.connect(this.context.destination)
    source.start(0)
  }
}
