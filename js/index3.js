'use strict';

//  MODEL
class TodoElement {
	content;
	isDone;
	id;

	constructor(content, isDone) {
		this.id = Math.random() * 100000000;
		this.content = content;
		this.isDone = isDone;
	}
}

class TodoListElement {
	todos;
	constructor() {
		this.todos = [];
		let oldList = localStorage.getItem('todos');
		if (oldList) {
			this.todos = JSON.parse(oldList);
			render(this.todos);
		}
	}

	removeElement(id) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}

	addElement(todo) {
		this.todos.push(todo);
	}
}

let list = new TodoListElement();

setInterval(() => {
	localStorage.setItem('todos', JSON.stringify(list.todos));
}, 1000);

//  VIEW
function buildTodoElement(todoObject) {
	const li = document.createElement('li');
	li.addEventListener('click', (event) => {
		todoObject.isDone = !todoObject.isDone;
		li.classList.toggle('done');
	});

	if (todoObject.isDone) {
		li.classList.add('done');
	}

	li.appendChild(document.createTextNode(todoObject.content));

	const dBtn = document.createElement('button');
	dBtn.addEventListener('click', (event) => {
		list.removeElement(todoObject.id);
		render(list);
	});

	dBtn.appendChild(document.createTextNode('X'));
	li.appendChild(dBtn);
	return li;
}

function addTodoElement(todoObject) {
	const todo = buildTodoElement(todoObject);
	const ul = document.querySelector('#todos-list');
	ul.appendChild(todo);
}

function render(todosList) {
	const ul = document.querySelector('#todos-list');
	ul.innerHTML = '';
	todosList.forEach((todo) => {
		addTodoElement(todo);
	});
}

// CONTROLLER
function eventAddTodo() {
	const userInput = document.querySelector('#userInput');
	if (userInput.value === '') {
		return;
	} else {
		list.addElement(new TodoElement(userInput.value, false));
		userInput.value = '';
		render(list.todos);
	}
}

document.querySelector('#enter').addEventListener('click', eventAddTodo);
document.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		eventAddTodo();
	}
});
