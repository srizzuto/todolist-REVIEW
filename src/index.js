import './style.css';
import { isCompleted, isDone } from './status';

const task = [
  {
    description: 'Hello',
    completed: false,
    index: 1,
  },
  {
    description: 'Everyone',
    completed: true,
    index: 2,
  },
  {
    description: 'Welcome',
    completed: false,
    index: 3,
  },
];

const storage = window.localStorage;
const newTaskStorage = storage.setItem('stored', JSON.stringify(task));
const taskStorage = JSON.parse(storage.getItem('stored'));

function render() {
  taskStorage.forEach((tsk) => {
    const { description } = tsk;
    const taskList = document.getElementById('task-list');
    const newLi = document.createElement('li');
    const pContainer = document.createElement('div');
    const icon = document.createElement('i');
    const newP = document.createElement('p');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox';
    checkbox.checked = isDone(tsk);
    icon.className = 'fas fa-ellipsis-v p5';
    newLi.className = 'border-bottom just-between';

    newP.innerHTML = description;

    pContainer.appendChild(checkbox);
    pContainer.appendChild(newP);
    newLi.appendChild(pContainer);
    newLi.appendChild(icon);
    taskList.appendChild(newLi);

    checkbox.addEventListener('click', () => {
      isCompleted(checkbox.checked, tsk);
      storage.setItem('stored', JSON.stringify(taskStorage));
    });
  });
}

function checkStorage() {
  if (taskStorage === null) {
    return newTaskStorage;
  }
  return taskStorage;
}

checkStorage();
render();
