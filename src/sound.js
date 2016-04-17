import howler from 'howler';

export default class Sound {
    constructor() {
        this.sounds = {
            add : new Howl({ urls: ['./sound/add.mp3'] }),
            subtract : new Howl({ urls: ['./sound/subtract.mp3'] }),
            change : new Howl({ urls: ['./sound/change.mp3'] }),
            fail : new Howl({ urls: ['./sound/fail.mp3'] }),
            success : new Howl({ urls: ['./sound/success.mp3'] }),

        }
    }

    play(soundName) {
        this.sounds[soundName].play();
    }
}
