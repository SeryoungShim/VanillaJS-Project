const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1"),
  dateTitle = clockContainer.querySelector("h4");

function getTime(){
	const date = new Date();
	const seconds = date.getSeconds();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	clockTitle.innerText = `${hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`
	dateTitle.innerText = date.getFullYear() + ' / ' + str(date.getMonth()+1) + ' / ' + date.getDate() + '\t' + date.toDateString().substr(0,3);
}
 
function init(){
	getTime();
	setInterval(getTime,1000);
}

init();
