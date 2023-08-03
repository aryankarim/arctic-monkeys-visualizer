import { startRecording, stopRecording } from '../controllers/listeners/microphone'
import { play, stop } from '../controllers/listeners/mp3Init'

let isOff = true

const audioEl = document.getElementById('audioEl') as HTMLAudioElement
const startBtnEl = document.getElementById('startBtn')
const mp3Btn = document.getElementById('audioBtn')
const imgEl = document.createElement('img')
imgEl.setAttribute('src', '/calm.svg')
startBtnEl?.appendChild(imgEl)

startBtnEl?.addEventListener('click', () => {
    if (isOff) {
        startRecording()
        imgEl.setAttribute('src', '/dancing.svg')
        imgEl.classList.toggle('dance')
        isOff = false
    } else {
        stopRecording()
        imgEl.setAttribute('src', '/calm.svg')
        imgEl.classList.toggle('dance')
        isOff = true
    }
})

let playing = false

mp3Btn?.addEventListener('click', async () => {
    stopRecording()
    imgEl.setAttribute('src', '/calm.svg')
    isOff = true
    if (!playing) {
        playing = true
        await play('/knee-socks.mp3')
        audioEl.play()
    } else {
        playing = false
        stop()
        audioEl.pause()
    }
})
