const minEle = document.querySelector('#minutes'),
    secEle = document.querySelector('#seconds'),
    setting = document.querySelector('#setting'),
    startstop = document.querySelector('#start_stop'),
    timer = document.querySelector('.timer'),
    progressBar = document.querySelector('.outer_ring'),
    error_msg = document.querySelector('.error-msg')

let minutes = minEle.innerHTML,
    seconds = secEle.innerHTML,
    progress = null,
    progressStart = 0,
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
    speed = 1000,
    degTravel = 360 / progressEnd,
    toggleSettings = false,
    secRem = 0,
    minRem = 0

const audio = new Audio('./assets/audio/timer-bg-audio.mp3')
const timeEnd = new Audio('./assets/audio/time-end.mp3')

function progressTrack() {
    progressStart++

    secRem = Math.floor((progressEnd - progressStart) % 60)
    minRem = Math.floor((progressEnd - progressStart) / 60)

    secEle.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`
    minEle.innerHTML = minRem.toString.length == 3 ? minRem : `0${minRem}`

    progressBar.style.background = `conic-gradient(
        #9d0000 ${progressStart * degTravel}deg,
        #17171a ${progressStart * degTravel}deg
        )`

    audio.loop = true
    audio.play()
    // console.log(audio.currentTime)


    if (progressStart == progressEnd) {
        progressBar.style.background = `conic-gradient(
            #00aa51 360deg,
            #00aa51 360deg`
        clearInterval(progress)
        startstop.innerHTML = "START"

        audio.pause()
        audio.currentTime = 0

        startstop.disabled = true
        setTimeout(() => startstop.disabled = false, 8500)

        timeEnd.play()
        timeEnd.loop = true
        setTimeout(() => timeEnd.pause(), 8000)
        timeEnd.currentTime = 0

        setTimeout(resetValues, 8500)
    }
}


function startStopProgress() {
    if (!progress) {
        progress = setInterval(progressTrack, speed)
        setting.disabled = true
    } else {
        clearInterval(progress)
        audio.pause()
        progress = null
        setting.disabled = true
        progressBar.style.background = `conic-gradient(
                #f9966b  ${progressStart * degTravel}deg,
                #17171a  ${progressStart * degTravel}deg
          )`
    }
}

function resetValues() {
    if (progress) {
        clearInterval(progress)
    }
    minutes = minEle.innerHTML
    seconds = secEle.innerHTML
    setting.disabled = false
    toggleSettings = false
    minEle.contentEditable = false
    minEle.style.borderBottom = `none`
    secEle.contentEditable = false
    secEle.style.borderBottom = `none`
    progress = null
    progressStart = 0
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds)
    degTravel = 360 / progressEnd
    progressBar.style.background = null
}

let pattern = /[0-9]/gi
startstop.addEventListener('click', () => {
    if (startstop.innerHTML == "START") {
        if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
            startstop.innerHTML = "STOP"
            startStopProgress()
        } else {
            alert("Please enter a time in Timer!")
        }
    }
    else {
        startstop.innerHTML = "START"
        startStopProgress()
    }
})

setting.onclick = function () {
    if (!toggleSettings) {
        toggleSettings = true
        minEle.contentEditable = true
        minEle.style.borderBottom = `1px dashed #ffffff50`
        secEle.contentEditable = true
        secEle.style.borderBottom = `1px dashed #ffffff50`
    } else {
        resetValues()
    }

}

minEle.onblur = function () {
    resetValues()
}

secEle.onblur = function () {
    resetValues()
}

// Theme change button
document.querySelector('#nav_theme').addEventListener('click', () => {
    document.body.classList.toggle('darkTheme')
})

// Enter key would not register
function noEnter(event) {
    let key = event.keyCode
    
    // if(key === 13){
        //     event.preventDefault();
        
        //     minEle.blur();
        //     secEle.blur();
        //     startstop.click();
        // }
    if (key === 13) {
        event.preventDefault()
        console.log('Enter key will not take any effect')
        return key !== 13
    }
}

