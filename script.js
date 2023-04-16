console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
gif.style.opacity = 0;

let songs = [
    { songName: "Bilji", songd: "02:54", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Firecracker", songd: "02:38", filePath: "songs/2.mp3", coverPath: "covers/2.webp" },
    { songName: "Hawayein", songd: "04:50", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Kahani", songd: "02:01", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Kesariya", songd: "04:28", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Space", songd: "02:28", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Unstoppable", songd: "04:06", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
]
end.innerText = songs[songIndex].songd;
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            const a = document.getElementById(songIndex).classList;
            a.remove('fa-play-circle');
            a.add('fa-pause-circle');
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            makeAllPlays();
        }
    })
    // Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    if ((audioElement.currentTime < 10) && (audioElement.currentTime != 10))
        start.innerText = "00:" + "0" + Math.floor(audioElement.currentTime);
    else if (audioElement.currentTime == 10)
        start.innerText = "00:" + Math.round(audioElement.currentTime);
    else if ((audioElement.currentTime <= 60) && (audioElement.currentTime > 10)) start.innerText = "00:" + Math.round(audioElement.currentTime);

    if (audioElement.currentTime > 60) {
        x = Math.floor(audioElement.currentTime / 60);
        if (Math.round(audioElement.currentTime % (60 * x)) < 10)
            start.innerText = "0" + x + ": 0" + Math.round(audioElement.currentTime % (60 * x));
        else
            start.innerText = "0" + x + ":" + Math.round(audioElement.currentTime % (60 * x));
    }
    if (progress == 100) {
        if (songIndex >= 6) {
            songIndex = 0
        } else {
            songIndex += 1;
        }
        makeAllPlays();
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        end.innerText = songs[songIndex].songd;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        const a = document.getElementById(songIndex).classList;
        a.remove('fa-play-circle');
        a.add('fa-pause-circle');
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
x = 0;
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            end.innerText = songs[songIndex].songd;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            x++;
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    end.innerText = songs[songIndex].songd;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    const a = document.getElementById(songIndex).classList;
    a.remove('fa-play-circle');
    a.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6
    } else {
        songIndex -= 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    end.innerText = songs[songIndex].songd;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    const a = document.getElementById(songIndex).classList;
    a.remove('fa-play-circle');
    a.add('fa-pause-circle');
})