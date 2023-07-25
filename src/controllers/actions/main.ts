import { checkForResize, controls } from '../listeners/window'
import { wave } from './moveWaves'

export const actions = () => {
    wave.moveWaves()
    checkForResize()
    controls.update()
}
