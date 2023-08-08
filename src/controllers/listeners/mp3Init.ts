export class Mp3Buffer {
    audioContext: any
    scriptNode: any
    processAudio: any

    loadAudio(url: string, callback: Function) {
        this.audioContext = new AudioContext()
        const request = new XMLHttpRequest()

        this.audioContext.resume()
        request.open('GET', url, true)
        request.responseType = 'arraybuffer'

        request.onload = () => {
            this.audioContext.decodeAudioData(
                request.response,
                function (buffer: any) {
                    callback(buffer)
                },
                function (error: any) {
                    console.error('Error decoding audio data', error)
                }
            )
        }

        request.send()
    }

    playAudio(buffer: any) {
        const source = this.audioContext.createBufferSource()
        source.buffer = buffer

        this.scriptNode = this.audioContext.createScriptProcessor(256, 1, 1)
        this.scriptNode.onaudioprocess = this.processAudio

        source.connect(this.scriptNode)
        this.scriptNode.connect(this.audioContext.destination)

        source.start()
    }

    play(audioUrl: string) {
        return new Promise((resolve) => {
            this.loadAudio(audioUrl, (buffer: any) => {
                this.playAudio(buffer)
                resolve(1)
            })
        })
    }

    stop() {
        if (this.audioContext) this.audioContext.suspend()
    }

    assignLoop(loop: Function) {
        this.processAudio = loop
    }
}
