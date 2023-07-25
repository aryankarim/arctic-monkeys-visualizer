import { assignLoop } from '../listeners/microphone'
import { Wave } from '../../entities/wave'

new Wave(-12.5)

export const wave = new Wave()
new Wave(12.5)

const updateAudio = (event: any) => {
    const inputBuffer = event.inputBuffer
    wave.inputData = inputBuffer.getChannelData(0)
}

assignLoop(updateAudio)
