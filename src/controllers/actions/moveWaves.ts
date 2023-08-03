import { assignLoop as assignStreamLoop } from '../listeners/microphone'
import { assignLoop as assignMp3Loop } from '../listeners/mp3Init'
import { Wave } from '../../entities/wave'

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

assignStreamLoop(updateStreamAudio)
assignMp3Loop(updateMp3Audio)
