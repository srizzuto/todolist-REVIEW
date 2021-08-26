import _ from 'lodash';
import './style.css';

let description = document.getElementById('description');

const task = [
  {
    description: 'Hello',
    completed: false,
    index: 1
  },
  {
    description: 'Everyone',
    completed: true,
    index: 2
  },
  {
    description: 'Welcome',
    completed: false,
    index: 3
  }
]

function render() {
  task.forEach(tsk => {
    const { description, completed, index } = tsk;
    let taskList = document.getElementById('task-list');
    let newLi = document.createElement('li');
    let pContainer = document.createElement('div');
    let icon = document.createElement('i');
    let newP = document.createElement('p');
    let checkbox = document.createElement('input');

    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    icon.className = "fas fa-ellipsis-v p5";
    newLi.className = "border-bottom just-between";

    newP.innerHTML = description;


    pContainer.appendChild(checkbox);
    pContainer.appendChild(newP);
    newLi.appendChild(pContainer);
    newLi.appendChild(icon);
    taskList.appendChild(newLi);
  })
}

render();
