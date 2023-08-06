//__________________________________ AUDIO _________________________________________

let audioContext: any
let mediaStream: any
let audioSource: any
let scriptNode: any

let processAudio: Function

export function startRecording() {
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
            audioContext = new AudioContext()
            mediaStream = stream

            audioSource = audioContext.createMediaStreamSource(stream)

            scriptNode = audioContext.createScriptProcessor(256, 1, 1)

            scriptNode.onaudioprocess = processAudio

            audioSource.connect(scriptNode)
            scriptNode.connect(audioContext.destination)
        })
        .catch(function (err) {
            console.error('Error accessing microphone:', err)
        })
}

export function stopRecording() {
    if (audioContext) {
        audioContext.suspend()
    }
}

export function assignLoop(loop: Function) {
    processAudio = loop
}
