'use strict';
//  <li>Test<button>X</button></li>

function buildTodo(strValue) {
	const li = document.createElement('li');
	li.addEventListener('click', (event) => {
		event.target.classList.toggle('done');
	});

	li.appendChild(document.createTextNode(strValue));

	const dBtn = document.createElement('button');
	dBtn.addEventListener('click', (event) => {
		li.remove();
	});

	dBtn.appendChild(document.createTextNode('X'));
	li.appendChild(dBtn);
	return li;
}

function addTodo(strValue) {
	const todo = buildTodo(strValue);
	const ul = document.querySelector('#todos-list');
	ul.appendChild(todo);
}

function eventAddTodo() {
	console.log('Run event');
	const userInput = document.querySelector('#userInput');
	if (userInput.value === '') {
		return;
	} else {
		addTodo(userInput.value);
		userInput.value = '';
	}
}

document.querySelector('#enter').addEventListener('click', eventAddTodo);
document.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		eventAddTodo();
	}
});
