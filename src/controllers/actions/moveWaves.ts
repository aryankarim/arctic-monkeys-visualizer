import { assignLoop } from '../listeners/microphone'
import { Wave } from '../../entities/wave'

export const wave = new Wave(0)
export const wave2 = new Wave(100)

const updateAudio = (event: any) => {
    const inputBuffer = event.inputBuffer
    wave.inputData = inputBuffer.getChannelData(0)
    wave2.inputData = inputBuffer.getChannelData(0)
}

assignLoop(updateAudio)
