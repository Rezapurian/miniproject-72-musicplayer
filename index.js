let musics = [
    {
        name: "Set Fire To The Rain",
        cover: "image/set-fire.jpg",
        audio: new Audio("./musics/Ghomayshi.mp3")
    },
    {
        name: "Lose yourself",
        cover: "image/lose-yourself.jpg",
        audio: new Audio("./musics/Ghomeyshi-gh.mp3")
    },
    {
        name: "Ready for it",
        cover: "image/ready-for-it.jpg",
        audio: new Audio("./musics/Farhad.mp3")
    }
]

let range = document.querySelector(".music-timer input");
let playBtn = document.querySelector("#play");
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let repeatBtn = document.querySelector("#repeat");
let musicCover = document.querySelector(".music-cover img");
let musicName = document.querySelector(".music-name h2");
let currentTime = document.querySelector("#current-time");
let totalTime = document.querySelector("#total-time");

let currentMusic = 0;
let audio = musics[currentMusic].audio;
musicCover.src = musics[currentMusic].cover;
musicName.textContent = musics[currentMusic].name; 

audio.addEventListener("canplay", e => {
    range.max = audio.duration;
});

function timeupdate() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    currentTime.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, 0)}`;
    totalTime.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, 0)}`;
}

setInterval(timeupdate);

audio.addEventListener("timeupdate", e => {
    range.value = audio.currentTime;
    timeupdate();
});

range.addEventListener("input", e => {
    audio.currentTime = range.value;
    if (range.value.length) {
        playBtn.classList.replace("fa-play", "fa-pause");
    }
});

playBtn.addEventListener("click", e => {
    if (audio.paused) {
        audio.play();
        musicCover.style.animationPlayState = "running";
        playBtn.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        musicCover.style.animationPlayState = "paused";
        playBtn.classList.replace("fa-pause", "fa-play");
    }
});

function changeMusic(state) {
    audio.pause();
    range.value = 0;
    playBtn.classList.replace("fa-pause", "fa-play");
    musicCover.style.animationPlayState = "paused";
    audio.currentTime = 0;
    if (state == "next") {
        if (currentMusic == musics.length - 1) {
            currentMusic = 0;
        } else currentMusic += 1;
    } else {
        if (currentMusic == 0) {
            currentMusic = musics.length - 1;
        } else currentMusic -= 1;
    }

    audio = musics[currentMusic].audio;
    musicCover.src = musics[currentMusic].cover;
    musicName.textContent = musics[currentMusic].name;
}

nextBtn.addEventListener("click", () => {
    changeMusic("next");
});

prevBtn.addEventListener("click", () => {
    changeMusic("prev");
});

repeatBtn.addEventListener("click", () => {
    range.value = 0;
    audio.currentTime = 0;
});