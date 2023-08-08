import { Wave } from '../../entities/wave'
import { Microphone } from '../listeners/microphone'
import { Mp3Buffer } from '../listeners/mp3Init'

export const mic = new Microphone()
export const mp3Buffer = new Mp3Buffer()

new Wave(-12.5)
export const wave = new Wave()
export const wave2 = new Wave(12.5)
new Wave(25)

const updateStreamAudio = (event: any) => {
    const inputBuffer = event.inputBuffer
    wave.inputData = inputBuffer.getChannelData(0)
    wave2.inputData = inputBuffer.getChannelData(0)
}

const updateMp3Audio = (event: any) => {
    const inputBuffer = event.inputBuffer
    wave.inputData = inputBuffer.getChannelData(0)
    wave2.inputData = inputBuffer.getChannelData(0)
}

mic.assignLoop(updateStreamAudio)
mp3Buffer.assignLoop(updateMp3Audio)
