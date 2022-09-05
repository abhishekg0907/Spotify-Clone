var imageAddress = "images/";
var songAddress = "songs/";
var imageExtension = ".jpg";
var songExtension = ".mp3";
var a = ["Bhool_Bhulaiyaa_2","Aage_Chal","Naachne_Ka_Shaunq","Gallan_Tipsiyaan","Machayenge","High_Heels"];
var i = 0;
audioElement = new Audio(songAddress + a[i] + songExtension);
var previous = document.getElementById('previous');
var play = document.getElementById('play');
var next = document.getElementById('next');
var progress = document.getElementById('song_progress'); 
run();
function run(){
    audioElement.addEventListener('timeupdate', ()=>{
        progress.value = parseInt((audioElement.currentTime / audioElement.duration)*500);

        var currentTime = changeIntoMinutesandSeconds(audioElement.currentTime);
        var totalTime = changeIntoMinutesandSeconds(audioElement.duration);
        document.getElementById("remainingDuration").innerHTML = currentTime + "/" + totalTime;
        if(currentTime == totalTime)
            next.click();
    });
}

progress.addEventListener('change',() => {
    audioElement.currentTime = parseInt((progress.value /500)* audioElement.duration);
});

function func()
{
    audioElement.pause();
    document.getElementById("wall").src = imageAddress + a[i] + imageExtension;
    document.getElementById("wall").alt = a[i];
    audioElement = new Audio(songAddress + a[i] + songExtension);
    play.click();
    run();
}
previous.addEventListener('click', ()=>{
    i = (i-1)%a.length;
    if(i<0)
        i = a.length-1;
    func();
});

play.addEventListener('click',() => {
    
    if(audioElement.paused||audioElement.currentTime==0)
    {
        audioElement.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    }
    else
    {
        audioElement.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

next.addEventListener('click',() => {
    i = (i+1)%a.length;
    func();
});

function changeIntoMinutesandSeconds(a){
    var minutes = Math.floor(a / 60);
    var seconds = Math.floor(a - minutes * 60);
    if(seconds<10)
        seconds = '0'+ seconds;
    if(minutes<10)
        minutes = '0'+ minutes;
    return minutes + ':' + seconds;
}