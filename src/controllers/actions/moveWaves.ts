import { assignLoop } from '../listeners/microphone'
import { Wave } from '../../entities/wave'

export const wave = new Wave()

const updateAudio = (event: any) => {
    const inputBuffer = event.inputBuffer
    wave.inputData = inputBuffer.getChannelData(0)
}

assignLoop(updateAudio)
