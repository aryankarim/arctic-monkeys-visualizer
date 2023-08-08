export class Microphone {
    audioContext: any
    mediaStream: any
    audioSource: any
    scriptNode: any
    processAudio: any

    async startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

        this.audioContext = new AudioContext()
        this.mediaStream = stream
        this.audioSource = this.audioContext.createMediaStreamSource(stream)
        this.scriptNode = this.audioContext.createScriptProcessor(256, 1, 1)
        this.scriptNode.onaudioprocess = this.processAudio
        this.audioSource.connect(this.scriptNode)
        this.scriptNode.connect(this.audioContext.destination)
    }

    stopRecording() {
        if (this.audioContext) this.audioContext.suspend()
    }

    assignLoop(loop: Function) {
        this.processAudio = loop
    }
}
