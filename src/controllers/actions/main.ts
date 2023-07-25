import { checkForResize, controls } from '../listeners/window'
import { wave, wave2 } from './moveWaves'

export const actions = () => {
    wave.moveWaves()
    wave2.moveWaves()
    checkForResize()
    controls.update()
}
