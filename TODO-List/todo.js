const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = 'toDos';
let toDos = [];

function paintToDo(text, check){
	const newId = toDos.length + 1;
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	delBtn.innerText = "X";
	delBtn.addEventListener("click", deleteToDo);
	const span = document.createElement("span");
	span.innerText = text;
	const checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.addEventListener("click", checked);
	li.appendChild(checkBox);
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id = newId;
	if(check === "true"){
		checkBox.checked = true;
		li.classList.add("checked");
	}
	toDoList.appendChild(li);
	const toDoObj = {
		text: text,
		id: newId,
		checked: check
	}
	toDos.push(toDoObj);
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue, false);
	toDoInput.value = "";
}

function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos !== null){
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function(toDo){
			paintToDo(toDo.text, toDo.checked);
		})
	}
}

function deleteToDo(event){
	const li = event.target.parentNode;
	toDoList.removeChild(li);
	toDos = toDos.filter(function(toDo){return toDo.id !== parseInt(li.id)});
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function checked(event){
	const li = event.target.parentNode;
	const box = li.querySelector("input");
	const parsedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
	if(box.checked === true){
		li.classList.add("checked");
		parsedToDos.forEach(function(toDo){
			if(toDo.id === parseInt(li.id)){
				toDo.checked = "true";
			}
		})
	} else {
		li.classList.remove('checked');
		parsedToDos.forEach(function(toDo){
			if(toDo.id === parseInt(li.id)){
				toDo.checked = "false";
			}
		})
	}
	toDos = parsedToDos;
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));

}

function init(){
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();