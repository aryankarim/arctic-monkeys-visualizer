import { mic, mp3Buffer } from '../controllers/actions/moveWaves'

// RADIO
const radioAudioEl = document.getElementById('radio-audio-el') as HTMLAudioElement

// BUTTONS
const micBtn = document.getElementById('mic-btn') as HTMLButtonElement
const playPauseBtn = document.getElementById('play-pause-btn') as HTMLButtonElement
const shuffleBtn = document.getElementById('shuffle-btn') as HTMLButtonElement

// IMAGES
const micImg = document.querySelector('#mic-btn > img') as HTMLImageElement
const playOrPauseImg = document.querySelector('#play-pause-btn > img') as HTMLImageElement

enum Player {
    mic = 'mic',
    random = 'random',
    play = 'play',
    pause = 'pause',
}

const stereo: {
    mode: Player
    playMp3: (cb: () => Promise<void>) => void
    playMic: (cb: () => Promise<void>) => void
    pauseMp3: () => void
    pauseMic: () => void
    pausedMode: Player
} = {
    mode: Player.pause,
    playMp3: (cb: () => Promise<void>) => {
        cb().then(() => {
            stereo.mode = Player.random
            playOrPauseImg.setAttribute('src', '/pause.png')
            shuffleBtn.disabled = true
            micBtn.disabled = true
        })
    },
    playMic: (cb: () => Promise<void>) => {
        cb().then(() => {
            stereo.mode = Player.mic
            stereo.pausedMode = Player.mic
            micImg.setAttribute('src', '/dance.png')
            playOrPauseImg.setAttribute('src', '/pause.png')
            shuffleBtn.disabled = true
            micBtn.disabled = true
        })
    },
    pauseMp3: () => {
        stereo.mode = Player.pause
        mp3Buffer.stop()
        radioAudioEl.pause()
        shuffleBtn.disabled = false
        micBtn.disabled = false
        playOrPauseImg.setAttribute('src', '/play.png')
    },
    pauseMic: () => {
        stereo.mode = Player.pause
        mic.stopRecording()
        shuffleBtn.disabled = false
        micBtn.disabled = false
        micImg.classList.remove('dance')
        micImg.setAttribute('src', '/calm.png')
    },
    pausedMode: Player.pause,
}

// MICROPHONE
const pressMic = () => {
    return new Promise<void>((resolve, reject) => {
        if (stereo.mode == Player.mic || stereo.mode == Player.random) reject()
        mic.startRecording()
        resolve()
    })
}

// SHUFFLE
const pressShuffle = () => {
    return new Promise<void>(async (resolve, reject) => {
        if (stereo.mode == Player.random || stereo.mode == Player.mic) reject()
        await mp3Buffer.play('/2.mp3')
        radioAudioEl.setAttribute('src', '/2.mp3')
        radioAudioEl.play()
        resolve()
    })
}

// PLAY OR PAUSE
const pressPlayOrPause = () => {
    console.log(stereo.mode, stereo.pausedMode)

    if (stereo.mode == Player.mic) {
        stereo.pauseMic()
        return
    }
    if (stereo.mode == Player.random) {
        stereo.pauseMp3()
        return
    }
    if (stereo.mode == Player.pause && stereo.pausedMode == Player.random) {
        pressShuffle()
    }
    if (stereo.mode == Player.pause && stereo.pausedMode == Player.mic) {
        pressMic()
    }
}

micBtn?.addEventListener('click', () => stereo.playMic(pressMic))
shuffleBtn?.addEventListener('click', () => stereo.playMp3(pressShuffle))
playPauseBtn?.addEventListener('click', pressPlayOrPause)
