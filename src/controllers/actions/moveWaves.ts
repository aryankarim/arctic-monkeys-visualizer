import { assignLoop } from '../listeners/microphone'
import { Wave } from '../../entities/wave'

new Wave(-12.5)
export const wave = new Wave()
export const wave2 = new Wave(12.5)
new Wave(25)

const updateAudio = (event: any) => {
    const inputBuffer = event.inputBuffer
    wave.inputData = inputBuffer.getChannelData(0)
    wave2.inputData = inputBuffer.getChannelData(0)
}

assignLoop(updateAudio)
