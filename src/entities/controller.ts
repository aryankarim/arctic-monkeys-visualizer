import { startRecording, stopRecording } from '../controllers/listeners/microphone'

let isOff = true

const startBtnEl = document.getElementById('startBtn')

startBtnEl?.addEventListener('click', () => {
    if (isOff) {
        startRecording()
        startBtnEl.innerText = 'Stop'
        isOff = false
    } else {
        stopRecording()
        startBtnEl.innerText = 'Start'
        isOff = true
    }
})
