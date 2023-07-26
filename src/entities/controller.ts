import { startRecording, stopRecording } from '../controllers/listeners/microphone'

let isOff = true

const startBtnEl = document.getElementById('startBtn')
const imgEl = document.createElement('img')
imgEl.setAttribute('src', '/public/calm.svg')
startBtnEl?.appendChild(imgEl)

startBtnEl?.addEventListener('click', () => {
    if (isOff) {
        startRecording()
        imgEl.setAttribute('src', '/public/dancing.svg')
        imgEl.classList.toggle('dance')
        isOff = false
    } else {
        stopRecording()
        imgEl.setAttribute('src', '/public/calm.svg')
        imgEl.classList.toggle('dance')
        isOff = true
    }
})
