import './style.css';
import { isCompleted, isDone } from './status';

const storage = window.localStorage;

const task = [
  {
    description: 'Hello',
    completed: false,
    index: 1,
  },
  {
    description: 'Everyone',
    completed: false,
    index: 2,
  },
  {
    description: 'Welcome',
    completed: false,
    index: 3,
  },
];

function render(taskStorage) {
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
  const taskStorage = JSON.parse(storage.getItem('stored'));
  if (taskStorage === null) {
    storage.setItem('stored', JSON.stringify(task));
  }
  return taskStorage;
}

render(checkStorage());
