const timeContainer = document.querySelector(".js-stopwatch"),
  timeTitle = timeContainer.querySelector("h1");
const reset = document.getElementById("reset");
const start = document.getElementById("start");
const pause = document.getElementById("pause");

var current_second = 0;
var second = 0, minute = 0, hour = 0;
var myTimer;

function getTime(){
	current_second += 1;
	second = current_second % 60;
	minute = parseInt(current_second/60);
	hour = parseInt(current_second/360);
	timeTitle.innerText = `${hour < 10 ? `0${hour}` : hour} : ${minute < 10 ? `0${minute}` : minute} : ${second < 10 ? `0${second}` : second}`
}

function handleResetClick(){
	pause.disabled = true;
	timeTitle.innerText = `00 : 00 : 00`;
	current_second = 0;
	clearInterval(myTimer);
}
if(reset){
	reset.addEventListener("click", handleResetClick);
}

function handleStartClick(){
	pause.disabled = false;
	myTimer = setInterval(getTime,1000);
}
if(start){
	start.addEventListener("click", handleStartClick);
}

function handlePauseClick(){
	pause.classList.remove("disabled");
	clearInterval(myTimer);
}
if(pause){
	pause.addEventListener("click", handlePauseClick);
}



function init(){
	timeTitle.innerText = `00 : 00 : 00`;
}

init();