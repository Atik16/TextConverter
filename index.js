console.log('Welcome to Spotify');
// Initialize audio variables
let songIndex=0;
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let audioElement = new Audio('1.mp3');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Love Me Like You Do" , filePath:"songs/1.mp3" , coverPath:"covers/1.jpg"},
    {songName:"Shape of you" , filePath:"songs/2.mp3" , coverPath:"covers/2.jpg"},
    {songName:"Despacito" , filePath:"songs/3.mp3" , coverPath:"covers/3.jpg"},
    {songName:"Baby" , filePath:"songs/4.mp3" , coverPath:"covers/4.jpg"},
    {songName:"Fairy tale" , filePath:"songs/5.mp3" , coverPath:"covers/5.jpg"},
    {songName:"Night Changes" , filePath:"songs/6.mp3" , coverPath:"covers/6.jpg"},
]
songItems.forEach((element, i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})
//audioElement.play();

// Handle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{

        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressbar.value=progress;
})
myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressbar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        //masterSongName.InnerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
