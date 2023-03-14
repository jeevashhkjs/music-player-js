
let audios = [
    {
        id: 0,
        Movie: "Guru",
        artist: "AR Rahman",
        web: "./jhhhhhh/Aaruyire.mp3",
        name: "Aaruyire",
        img: "url('https://en.janbharattimes.com/wp-content/uploads/2018/12/Aishwarya-rai-bachchan-with-Abhishek-bachchan-hot-photoshoot.jpg')"
    },
    
    {
        id: 1,
        Movie: "I",
        artist: "Sid Sriram",
        web: "./jhhhhhh/Ennodu_Nee_Irundhal_(Reprise)-StarMusiQ.Com.mp3",
        name: "Ennodu Nee Irundhal",
        img: "url('https://www.tamil2lyrics.com/wp-content/uploads/2017/09/ennodu.png')"
    },

]

let buttons = document.querySelectorAll("i")
let audi = document.querySelector("audio")

let movie = document.querySelector("#movie")
let singer = document.querySelector("#singer")
let names = document.querySelector("#name")

let volumeranbtn = document.querySelector("#volrange")
let CurrentSongRange = document.querySelector("#songRange")
let currentTime = document.querySelector("#currentTime")
let FullTimeSong = document.querySelector("#FullTime")

let playList = document.querySelector("#playlists")
let RecMusic = document.querySelector(".recentLists")


let RecentList = document.querySelector(".recentLists")

let recentMusic = [];

let listBtn = document.querySelector("#lists")
let recentMusicBtn = document.querySelector("#recMusBtn")

playList.style.display = "none"
listBtn.addEventListener("mouseover",()=>{
        playList.style.display = "block"

        playList.addEventListener("mouseover",()=>{
            playList.style.display = "block"
        })
        playList.addEventListener("mouseout",()=>{
            playList.style.display = "none"
        })
})
listBtn.addEventListener("mouseout",()=>{
        playList.style.display = "none" 
})




RecMusic.style.display = "none"
recMusBtn.addEventListener("mouseover",()=>{
        RecMusic.style.display = "block"

        RecMusic.addEventListener("mouseover",()=>{
            RecMusic.style.display = "block"
        })
        RecMusic.addEventListener("mouseout",()=>{
            RecMusic.style.display = "none"
        })
})
recMusBtn.addEventListener("mouseout",()=>{
        RecMusic.style.display = "none" 
})

window.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < audios.length; i++) {
        let createList = document.createElement("li")
        createList.setAttribute("id", i)
        createList.innerText = audios[i].name
        playList.append(createList)

        createList.addEventListener("click", (e) => {
            for (let j = 0; j < audios.length; j++) {
                if (e.target.id == audios[j].id) {
                    let targetId = e.target.id
                    playsong(targetId)
                    audi.src = audios[j].web
                    audi.play()
                }
            }
        })
    }
})

function playsong(ids) {
    movie.innerText = audios[ids].Movie
    singer.innerText = audios[ids].artist
    names.innerText = audios[ids].name
    audi.src = audios[ids].web
    image.style.backgroundImage = audios[ids].img
    calculate()
    playBtn.style.display = "none"
    pauseBtn.style.display = "block"
    let musicName = names.innerText
    filterRecentMusics(musicName) 
    console.log(recentMusic)
}

audi.onloadedmetadata = function () {
    CurrentSongRange.max = audi.duration
}

let pauseBtn = document.querySelector(".pause")
let playBtn = document.querySelector(".play")
let image = document.querySelector(".img")
let order = document.querySelector(".orderby")
let shuffle = document.querySelector(".shuffle")

let showText = document.querySelector("#onboard")

order.classList.add("active")

order.addEventListener("click", () => {
    order.classList.add("active")
    shuffle.classList.remove("active")
    OnBoard("You have switch order mode")
})
shuffle.addEventListener("click", () => {
    order.classList.remove("active")
    shuffle.classList.add("active")
    OnBoard("You have switch shuffle mode")
})

playBtn.style.display = "block"


movie.innerText = audios[0].Movie
singer.innerText = audios[0].artist
names.innerText = audios[0].name
audi.src = audios[0].web
image.style.backgroundImage = audios[0].img

volumesranges = 5;
count = 0;
for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", () => {

        if (buttons[i].classList.contains("play")) {
            playAudio()
            let musicName = names.innerText
            filterRecentMusics(musicName) 
        }
        else if (buttons[i].classList.contains("pause")) {
            audi.pause()
            pauseBtn.style.display = "none"
            playBtn.style.display = "block"
        }
        else if (buttons[i].classList.contains("previous")) {
            count--
            if (count == -1) {
                count = audios.length - 1
            }
            ranOrOrder(count)
            audi.play()
            playAudio()
            let musicName = names.innerText
            filterRecentMusics(musicName)

        }
        else if (buttons[i].classList.contains("next")) {
            playNext()
            playAudio()
            let musicName = names.innerText
            filterRecentMusics(musicName)
        }
        else if (buttons[i].classList.contains("volumeincre")) {
            volumesranges++
            if (volumesranges >= 10) {
                volumesranges = 10
            }
            let filterVolume = volumesranges / 10
            audi.volume = filterVolume
            volumes(filterVolume)
        }
        else if (buttons[i].classList.contains("volumedecre")) {
            volumesranges--
            if (volumesranges <= 0) {
                volumesranges = 0
            }
            let filterVolume = volumesranges / 10
            volumes(filterVolume)
        }

    })
}

function filterRecentMusics(msc){

        if(recentMusic.includes(msc) == false){
            recentMusic.push(msc)
            recentPlay()
        }

}

function ranOrOrder(count) {
    if (shuffle.classList.contains("active")) {
        randomSong()
    }
    else {
        AudioPlayer(count)
    }
}

function playAudio() {
    audi.play()
    let songDuration = audi.duration;
    SongRangesFunction(songDuration)
    playBtn.style.display = "none"
    pauseBtn.style.display = "block"
    calculate()
}

function playNext() {
    count++
    if (count >= audios.length) {
        count = 0
    }
    ranOrOrder(count)
    audi.play()
}

function randomSong() {
    let randomNumber = Math.floor(Math.random() * audios.length)
    movie.innerText = audios[randomNumber].Movie
    singer.innerText = audios[randomNumber].artist
    names.innerText = audios[randomNumber].name
    audi.src = audios[randomNumber].web
    image.style.backgroundImage = audios[randomNumber].img
}

function AudioPlayer(counts) {
    movie.innerText = audios[counts].Movie
    singer.innerText = audios[counts].artist
    names.innerText = audios[counts].name
    audi.src = audios[counts].web
    image.style.backgroundImage = audios[counts].img
}

function volumes(volum) {
    audi.volume = volum
    volumeranbtn.value = volum
}

CurrentSongRange.addEventListener("input", () => {
    audi.currentTime = CurrentSongRange.value
    audi.play()
    calculate()
    playBtn.style.display = "none"
    pauseBtn.style.display = "block"
})

volumeranbtn.addEventListener("input", () => {
    audi.volume = volumeranbtn.value
    volumesranges = volumeranbtn.value * 10
})

function SongRangesFunction(duraitonsong) {

    fulltime = Math.round(duraitonsong)
    setInterval(() => {
        CurrentSongRange.value = audi.currentTime
    }, 1000)
}

cnt = 0
function recentPlay(){
        let createRecentLi = document.createElement("li")
        let name = recentMusic.length
        createRecentLi.innerText = recentMusic[name-1]
        RecentList.appendChild(createRecentLi)
        createRecentLi.addEventListener("click",(e)=>{
            for(let i=0;i<audios.length;i++){
                if(e.target.innerText == audios[i].name){
                    movie.innerText = audios[i].Movie
                    singer.innerText = audios[i].artist
                    names.innerText = audios[i].name
                    audi.src = audios[i].web
                    image.style.backgroundImage = audios[i].img
                    calculate()
                    audi.play()
                    playBtn.style.display = "none"
                    pauseBtn.style.display = "block"
                }
            }
        })
}


function calculate() {
    setInterval(() => {
        showTime()
    }, 1000)
}

function showTime() {

    if (audi.currentTime === audi.duration) {
        playNext()
    }

    CurrenntMin = Math.floor(audi.currentTime / 60)
    curretSec = Math.floor(audi.currentTime - (CurrenntMin * 60))

    durationMin = Math.floor(audi.duration / 60)
    durationSec = Math.floor(audi.duration - (durationMin * 60))

    if (curretSec < 10) {
        curretSec = "0" + curretSec
    }
    if (CurrenntMin < 10) {
        CurrenntMin = "0" + CurrenntMin
    }
    if (durationMin < 10) {
        durationMin = "0" + durationMin
    }
    if (durationSec < 10) {
        durationSec = "0" + durationSec
    }

    currentTime.innerText = `${CurrenntMin}:${curretSec}`
    FullTimeSong.innerText = `${durationMin}:${durationSec}`

}

function OnBoard(mssg) {
    showText.innerText = mssg
    showText.style.opacity = 1
    setTimeout(() => {
        showText.style.opacity = 0
    }, 1500)
}

