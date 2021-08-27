import './style.css';
import { isCompleted, isDone } from './status';
import {
  add, edit, remove, removeChecked,
} from './addremove';

const storage = window.localStorage;
const tasks = [];
const form = document.getElementById('form');
const addbtn = document.getElementById('addbtn');
const clear = document.getElementById('clear');

function render(taskStorage) {
  taskStorage.forEach((task) => {
    const { description } = task;
    const taskList = document.getElementById('task-list');
    const newLi = document.createElement('li');
    const pContainer = document.createElement('div');
    const iconRemove = document.createElement('i');
    const newP = document.createElement('p');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox';
    checkbox.checked = isDone(task);
    iconRemove.className = 'far fa-trash-alt p5';
    iconRemove.id = 'removebtn';
    newLi.className = 'border-bottom just-between';
    newP.innerHTML = description;

    pContainer.appendChild(checkbox);
    pContainer.appendChild(newP);
    newLi.appendChild(pContainer);
    newLi.appendChild(iconRemove);
    taskList.appendChild(newLi);

    iconRemove.addEventListener('click', () => {
      remove(taskStorage, task);
      window.location.reload();
    });

    checkbox.addEventListener('click', () => {
      isCompleted(checkbox.checked, task);
      storage.setItem('stored', JSON.stringify(taskStorage));
    });

    newP.addEventListener('click', () => {
      newP.setAttribute('contenteditable', 'true');
    });

    newP.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        edit(task, newP.innerText);
        window.location.reload();
      }
    });
  });
}

function checkStorage() {
  const taskStorage = JSON.parse(storage.getItem('stored'));
  if (taskStorage === null) {
    storage.setItem('stored', JSON.stringify(tasks));
    return JSON.parse(storage.getItem('stored'));
  }
  return taskStorage;
}

addbtn.addEventListener('click', (e) => {
  e.preventDefault();
  add(checkStorage(), document.getElementById('description').value);
  form.reset();
  window.location.reload();
});

clear.addEventListener('click', () => {
  removeChecked(checkStorage());
  window.location.reload();
});

render(checkStorage());
