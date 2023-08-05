import { startRecording, stopRecording } from '../controllers/listeners/microphone'
import { play, stop } from '../controllers/listeners/mp3Init'

const sockAudioEl = document.getElementById('sock-audio-el') as HTMLAudioElement
const randomAudioEl = document.getElementById('random-audio-el') as HTMLAudioElement
const playPauseBtn = document.getElementById('play-pause-btn')
const sockBtn = document.getElementById('sock-btn')
const stereoBtn = document.getElementById('stereo-btn')
const imgEl = document.querySelector('#start-btn > img') as HTMLImageElement

enum Player {
    idle = '',
    mic = 'mic',
    socks = 'socks',
    random = 'random',
}

const stereo: {
    playing: Player
    reset: () => void
} = {
    playing: Player.idle,
    reset() {
        stereo.playing = Player.idle
        // knee socks reset
        stop()
        sockAudioEl.pause()
        // mic reset
        stopRecording()
        imgEl.setAttribute('src', '/calm.png')
        imgEl.classList.remove('dance')
    },
}

playPauseBtn?.addEventListener('click', () => {
    if (stereo.playing == Player.mic) return
    stereo.playing = Player.mic
    stereo.reset()
    startRecording()
    imgEl.setAttribute('src', '/dancing.png')
    imgEl.classList.add('dance')
})

sockBtn?.addEventListener('click', async () => {
    console.log()

    if (stereo.playing == Player.socks) return
    stereo.playing = Player.socks
    stereo.reset()
    await play('/knee-socks.mp3')
    sockAudioEl.play()
})

stereoBtn?.addEventListener('click', async () => {
    if (stereo.playing == Player.random) return
    stereo.playing = Player.random
    stereo.reset()
    await play('/2.mp3')
    randomAudioEl.src = '/2.mp3'
    randomAudioEl.play()
})
