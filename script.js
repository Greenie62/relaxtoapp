var timerBtns=document.querySelectorAll(".timer-container button")
var choiceBtns=document.querySelectorAll('.choice_container button');
var timer=document.querySelector(".timer");
var play=document.querySelector('.play');
var replay=document.querySelector('.replay');
var song=document.querySelector('.song');
var video=document.querySelector(".video-container video");
var outline=document.querySelector(".moving_outline circle");

var totalLength=outline.getTotalLength();

var fakeDuration=60;
outline.style.strokeDasharray=totalLength;
outline.style.strokeDashoffset=totalLength

timer.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`


play.addEventListener("click",()=>{
    console.log("Play button fired");
    checkPlaying(song)
});

replay.addEventListener("click",()=>{
    console.log("Replay button clicked");
    replaySong(song)
})

function checkPlaying(song){
    if(song.paused){
        song.play()
        video.play()
        play.src="./pics/pause.svg"
    }
    else{
        song.pause()
        video.pause()
        play.src="./pics/play.svg"

    }
}

function replaySong(song){
    song.currentTime=0;
    console.log("replay")
}

choiceBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        video.src=e.target.parentElement.attributes.getNamedItem("data-video").value;
        song.src=e.target.parentElement.attributes.getNamedItem("data-sound").value;

                
    })
})

timerBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        fakeDuration=e.target.attributes.getNamedItem("data-timer").value;
        console.log(fakeDuration)
    })
})

song.ontimeupdate=function(){
    var currentTime=song.currentTime;
    console.log(song.currentTime)
    var elapsed=fakeDuration-currentTime;
    var minutes=Math.floor(elapsed/60)
    var seconds=Math.floor(elapsed%60)
    timer.textContent=`${minutes}:${seconds}`
    let progress=totalLength-(currentTime/fakeDuration) * totalLength
    outline.style.strokeDashoffset=progress
    

    if(currentTime >= fakeDuration){
        currentTime=0;
        song.pause()
        video.pause()
        play.src="./pics/play.svg"
    }
}

console.log(totalLength)