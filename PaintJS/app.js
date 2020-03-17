const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const brush = document.getElementById("jsBrush");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 500;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

brush.classList.add("selectedBtn");
Array.from(colors)[0].classList.add("selectedColor");

function onMouseMove(event){
	const x = event.offsetX;
	const y = event.offsetY;
	if(!painting){
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function startPainting(event){
	painting = true;
}
function stopPainting(event){
	painting = false;
}

function changeColor(event){
	ctx.strokeStyle = event.target.style.backgroundColor;
	ctx.fillStyle = event.target.style.backgroundColor;
	Array.from(colors).forEach(color => 
		color.classList.remove("selectedColor"));
	event.target.classList.add("selectedColor");
}

function handleCanvasClick(){
	if(filling)
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(event){
	event.preventDefault();
}

if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => 
	color.addEventListener("click", changeColor));

function handleRangeChange(event){
	ctx.lineWidth = event.target.value;
}

if(range){
	range.addEventListener("input", handleRangeChange);
}

function handleModeClick(){
	filling = true;
	ctx.fillStyle = ctx.strokeStyle;
	range.classList.add("hide");

	mode.classList.add("selectedBtn");
	brush.classList.remove("selectedBtn");

}
if(mode){
	mode.addEventListener("click", handleModeClick);
}

function handleBrushClick(){
	filling = false;
	console.log(filling);
	range.classList.remove("hide");

	brush.classList.add("selectedBtn");
	mode.classList.remove("selectedBtn");
}
if(brush){
	brush.addEventListener("click", handleBrushClick);
}

function handleSave(){
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS";
	link.click();
}
if(saveBtn){
	saveBtn.addEventListener("click", handleSave);
}