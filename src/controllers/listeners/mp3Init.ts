let audioContext: any

let scriptNode: any

let processAudio: Function

function loadAudio(url: string, callback: Function) {
    audioContext = new AudioContext()
    const request = new XMLHttpRequest()

    audioContext.resume()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    request.onload = function () {
        audioContext.decodeAudioData(
            request.response,
            function (buffer) {
                callback(buffer)
            },
            function (error) {
                console.error('Error decoding audio data', error)
            }
        )
    }

    request.send()
}

function playAudio(buffer: any) {
    audioContext = new AudioContext()

    const source = audioContext.createBufferSource()
    source.buffer = buffer

    scriptNode = audioContext.createScriptProcessor(256, 1, 1)
    scriptNode.onaudioprocess = processAudio

    source.connect(scriptNode)
    scriptNode.connect(audioContext.destination)

    source.start()
}

export const play = async (audioUrl: string) => {
    return new Promise((resolve) => {
        loadAudio(audioUrl, function (buffer: any) {
            playAudio(buffer)
            resolve(1)
        })
    })
}

export function stop() {
    if (audioContext) {
        scriptNode.disconnect(audioContext.destination)

        audioContext.close()
    }
}

export function assignLoop(loop: Function) {
    processAudio = loop
}
