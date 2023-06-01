let tasksListEl = [];
let taskList = document.querySelector('.tasks-list');
let curOptEl = 0;

// localStorage.clear();
let userId = localStorage.getItem("userId");
console.log(userId);

if (userId === null) {
  console.log('user not authorized');
  window.location.href = 'http://localhost:8080/signInPage.html';
}

addTasksToTaskList();

async function showTaskList() {
  taskList.innerHTML = '';
  tasksListEl.forEach((el) => {
    addTaskElement(el.priority, el.name);
  })
}

window.addEventListener('scroll', async function() {
  let bodyHeight = document.querySelector('.container').offsetHeight;
  let sidebar = this.document.querySelector('.sidebar');
  sidebar.style.height = String(bodyHeight) + 'px';
});

document.addEventListener("click", function(event) {
  hideAllMenus();
});

function hideAllMenus() {
  var menus = document.querySelectorAll(".task-list__options-menu");
  menus.forEach(function(menu) {
    if (menu.classList.contains('active')) {
      menu.classList.toggle('active');
    }
  });
}

async function getOneTaskGroup(taskGroupId) {
  let taskGroupObject = [];
  let result = await fetch(`http://localhost:8080/taskGroup/${taskGroupId}`,  {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',

  }).then(res => {
    return res.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => console.log(error))
  
  taskGroupObject = await result;
  console.log(taskGroupObject);
  return taskGroupObject;
}

const createNewTaskElement = async (priorityArg, taskTextArg, isCompletedArg, isFavoriteArg, result, userIdArg) => {
  // console.log(`PriorityArg ${priorityArg}`);
  // console.log(`TaskTextArg ${taskTextArg}`);
  let priority = priorityArg === null || priorityArg === undefined || typeof priorityArg !== typeof Number() ? 0: priorityArg;
  let taskText = taskTextArg === null || taskTextArg === undefined || typeof taskTextArg !== typeof String() ? '' : taskTextArg;
  let isCompleted = isCompletedArg === null || isCompletedArg === undefined || typeof isCompletedArg !== typeof Boolean() ? false : isCompletedArg;
  let isFavorite = isFavoriteArg === null || isFavoriteArg === undefined || typeof isFavoriteArg !== typeof Boolean() ? false : isFavoriteArg;
  // let taskGroupId = taskGroupIdArg === null || taskGroupIdArg === undefined || typeof taskGroupIdArg !== typeof Number() ? 0: taskGroupIdArg;
  let userId = userIdArg === null || userIdArg === undefined || typeof userIdArg !== typeof Number() ? 0: userIdArg;

  let taskListElement = document.createElement("div")
  taskListElement.className = "task-list__element";

  let taskListRectangle = document.createElement("div")
  taskListRectangle.className = "task-list__rectangle";

  let taskListRectangleInner = document.createElement("div");
  taskListRectangleInner.className = "task-list__rectangle-inner";

  let taskListElementInput = document.createElement("input");
  taskListElementInput.className = "task-list__name"
  taskListElementInput.placeholder = "Please enter task name";
  taskListElementInput.value = taskText;

  let taskListCircle = document.createElement("label");
  taskListCircle.className = "checkbox";

  let taskListCircleInput = document.createElement("input");
  taskListCircleInput.type = "checkbox";
  if (isCompleted === true) {
    taskListCircleInput.checked = true;
  }
 
  let taskListCircleCheck = document.createElement("span");

  if (priority == 0) {
    taskListCircleCheck.className = "check";
  } else if (priority == 1) {
    taskListCircleCheck.classList.add("check", "low-priority");
  } else if (priority == 2) {
    taskListCircleCheck.classList.add("check", "medium-priority");
  } else if (priority == 3) {
    taskListCircleCheck.classList.add("check", "high-priority");
  }

  let taskRectangles = document.querySelectorAll('.task-list__element')

  taskListInput = document.createElement("input");
  taskListInput.className = "task-list__name";

  taskListOptions = document.createElement("img");
  taskListOptions.className = `task-list__options options`;
  taskListOptions.src = "./img/options-icon.png";
  taskListOptions.classList.add(`options-${taskRectangles.length}`)

  taskListOptionsMenu = document.createElement("ul");
  taskListOptionsMenu.className = "task-list__options-menu";

  taskListOptionsElUpdate = document.createElement("li");
  taskListOptionsElUpdate.className = "task-list__options-menu-element-update";
  taskListOptionsElUpdate.textContent = "Update";

  taskListOptionsElDelete = document.createElement("li");
  taskListOptionsElDelete.className = "task-list__options-menu-element-delete";
  taskListOptionsElDelete.textContent = "Delete";

  taskListOptionsElFavorite = document.createElement("li");
  taskListOptionsElFavorite.className = `task-list__options-menu-element-favorite favorite-${taskRectangles.length}`; 
  taskListOptionsElFavorite.textContent = "Favorite";

  taskListOptionsElLowPriority = document.createElement("li");
  taskListOptionsElLowPriority.className = "task-list__options-menu-element-low-priority";
  taskListOptionsElLowPriority.textContent = "Low priority";

  taskListOptionsElMediumPriority = document.createElement("li");
  taskListOptionsElMediumPriority.className = "task-list__options-menu-element-medium-priority";
  taskListOptionsElMediumPriority.textContent = "Medium priority";

  taskListOptionsElHighPriority = document.createElement("li");
  taskListOptionsElHighPriority.className = "task-list__options-menu-element-high-priority";
  taskListOptionsElHighPriority.textContent = "High priority";

  taskListOptionsElUpdate.addEventListener("click", () => {
    let nameValue = '';
    let nameInputs = document.querySelectorAll('.task-list__name');
    for (let i = 0; i < nameInputs.length; i++) {
      if (i === curOptEl) {
        nameValue = nameInputs[i].value;
      }
    }
    tasksListEl[curOptEl].name = nameValue;
    let taskData = tasksListEl[curOptEl];
    // let taskData = {
    //   name: "defaultName",
    //   priority: 1,
    //   is_favorite: false,
    //   is_completed: false,
    //   task_group_id: 1,
    //   creation_date: "2023-05-12",
    //   completion_date: "2023-05-27"
    // }
    updateTask(taskData, taskData.id);
    // let priorityValue = tasks;
    // let isFavoriteValue = false;  
    // let isCompleted = false;
    // let taskGroupIdValue = 1;
    // const now = new Date();
    // const options = { month: '2-digit' };
    // let year = `${now.getFullYear()}`;
    // let month = `${now.toLocaleString('en-US', options)}`;
    // let date = `${now.getDate()}`;
    // let today = `${year}-${month}-${date}`;
    // let creationDate = today;
    // let completionDate = '0000-00-00';
    hideAllMenus();
  }, false);

  taskListOptionsElDelete.addEventListener("click", () => {
    tasksListEl.splice(curOptEl, 1);
    showTaskList();
    hideAllMenus();
  }, false); 

  taskListOptionsElFavorite.addEventListener("click", () => {
    console.log(event.target.classList);
    console.log(tasksListEl[curOptEl]);
    let favEls = document.querySelectorAll('.task-list__fav');
    if (tasksListEl[curOptEl].is_favorite === true) {
      tasksListEl[curOptEl].is_favorite = false;
    } else {
      tasksListEl[curOptEl].is_favorite = true;
    }
    favEls[curOptEl].classList.toggle('active');
    console.log(tasksListEl[curOptEl]); 
    hideAllMenus();
  }, false);

  taskListOptionsElLowPriority.addEventListener("click", () => {
    tasksListEl[curOptEl].priority = 1;
    let checkboxes = document.querySelectorAll('.checkbox span');
    if (checkboxes[curOptEl].classList.contains('medium-priority')) {
      checkboxes[curOptEl].classList.remove('medium-priority');
      checkboxes[curOptEl].classList.add('low-priority');
    } else if (checkboxes[curOptEl].classList.contains('high-priority')) {
      checkboxes[curOptEl].classList.remove('high-priority');
      checkboxes[curOptEl].classList.add('low-priority');
    } else if (checkboxes[curOptEl].classList.contains('low-priority') != true) {
      checkboxes[curOptEl].classList.add('low-priority');
    }
    hideAllMenus();
  }, false);

  taskListOptionsElMediumPriority.addEventListener("click", () => {
    tasksListEl[curOptEl].priority = 2;
    let checkboxes = document.querySelectorAll('.checkbox span');
    if (checkboxes[curOptEl].classList.contains('high-priority')) {
      checkboxes[curOptEl].classList.remove('high-priority');
      checkboxes[curOptEl].classList.add('medium-priority');
    } else if (checkboxes[curOptEl].classList.contains('low-priority')) {
      checkboxes[curOptEl].classList.remove('low-priority');
      checkboxes[curOptEl].classList.add('medium-priority');
    } 
    else if (checkboxes[curOptEl].classList.contains('medium-priority') != true) {
      checkboxes[curOptEl].classList.add('medium-priority');
    }

    hideAllMenus();
  }, false);

  taskListOptionsElHighPriority.addEventListener("click", () => {
    tasksListEl[curOptEl].priority = 3;
    let checkboxes = document.querySelectorAll('.checkbox span'); 
    if (checkboxes[curOptEl].classList.contains('medium-priority')) {
      checkboxes[curOptEl].classList.remove('medium-priority');
      checkboxes[curOptEl].classList.add('high-priority');
    } else if (checkboxes[curOptEl].classList.contains('low-priority')) {
      checkboxes[curOptEl].classList.remove('low-priority');
      checkboxes[curOptEl].classList.add('high-priority');
    } else if (checkboxes[curOptEl].classList.contains('high-priority') != true) {
      checkboxes[curOptEl].classList.add('high-priority');
    }
    hideAllMenus();
  }, false);

  taskListCircleInput.addEventListener("click", () => {
    if (taskListCircleInput.checked === true) {
      tasksListEl[curOptEl].is_completed = true;
    } else {
      tasksListEl[curOptEl].is_completed = false;
    }
  })

  taskListOptionsMenu.appendChild(taskListOptionsElUpdate);
  taskListOptionsMenu.appendChild(taskListOptionsElDelete);
  taskListOptionsMenu.appendChild(taskListOptionsElFavorite);
  taskListOptionsMenu.appendChild(taskListOptionsElLowPriority);
  taskListOptionsMenu.appendChild(taskListOptionsElMediumPriority);
  taskListOptionsMenu.appendChild(taskListOptionsElHighPriority);

  taskListOptionsMenu.addEventListener("click", event => {
    event.stopPropagation();
  }, false);

  // taskListOptions.appendChild(taskListOptionsMenu);

  let taskFavIndicator = document.createElement('img');
  taskFavIndicator.className = "task-list__fav";
  if (isFavorite === true) {
    taskFavIndicator.classList.add('active');
  }
  taskFavIndicator.src = "./img/favorite-icon.png";
  taskFavIndicator.width = '20px';

  let taskGroupText = document.createElement('div');
  taskGroupText.className = "task-list__task-group";
  taskGroupText.textContent = result.name;

  taskListCircle.appendChild(taskListCircleInput);
  taskListCircle.appendChild(taskListCircleCheck);

  taskListRectangleInner.appendChild(taskListCircle);
  taskListRectangleInner.appendChild(taskListElementInput);
  taskListRectangleInner.appendChild(taskListOptions);
  taskListRectangleInner.appendChild(taskFavIndicator);
  taskListRectangleInner.appendChild(taskGroupText);
  taskListRectangleInner.appendChild(taskListOptionsMenu);

  taskListRectangle.appendChild(taskListRectangleInner);

  taskListElement.appendChild(taskListRectangle);

  taskListOptions.addEventListener("contextmenu", event => {
    event.preventDefault();
    let classList = event.target.classList; 
    console.log(classList)
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].includes('options-')) {
        curOptEl = classList[i].split('').splice(classList[i].indexOf('-') + 1, classList[i].length - 1);
        console.log(curOptEl);
        break;
      }
    }
    let sum = 0;

    for (let i = 0; i < curOptEl.length; i++) {
      sum += curOptEl[i];
    }
    curOptEl = Number(sum);
    console.log(curOptEl);

    taskListOptionsMenu.style.top = `${event.clientY}px`;
    taskListOptionsMenu.style.left = `${event.clientX}px`;
    taskListOptionsMenu.classList.toggle("active");
  })

  return taskListElement; 
}

const addTaskElement = async (priorityArg, taskTextArg, isCompleted, isFavorite, taskGroupId, userId) => {
  let result = await getOneTaskGroup(taskGroupId);
  let newTaskListEl = await createNewTaskElement(priorityArg, taskTextArg, isCompleted, isFavorite, result, userId);

  taskList.appendChild(newTaskListEl);
}

let addTaskBtn = document.querySelector('.add-task__button');

async function getTasks() {
  let tasksArr = [];
  let result = await fetch('http://localhost:8080/task',  {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',

  }).then(res => {
    return res.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => console.log(error))
  
  tasksArr = await result;
  tasksListEl = tasksArr;
  console.log(tasksListEl);
  return tasksArr
}

async function getOneTask(taskId) {
  let tasksObject = [];
  let result = await fetch(`http://localhost:8080/task/${taskId}`,  {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',

  }).then(res => {
    return res.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => console.log(error))
  
  tasksObject = await result;
  console.log(tasksObject);
  return tasksObject;
}

async function updateTask(taskData, taskId) {
  let tasksArr = [];

  let result = await fetch(`http://localhost:8080/task/${taskId}`,  {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      body: JSON.stringify(taskData)

  }).then(res => {
    return res.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => console.log(error))
  
  tasksArr = await result;
  return tasksArr
}

async function addTasksToTaskList() {
  tasksArr = await getTasks();

  tasksArr.forEach(async (el, i) => {
    await addTaskElement(el.priority, el.name, el.is_completed, el.is_favorite, el.task_group_id, el.user_id)
  })
}

addTaskBtn.addEventListener("click", () => {
  let addTaskInput = document.querySelector('.add-task-rectangle');
  let nameValue = addTaskInput.value;
  if (nameValue != '') {
    addTaskElement(0, nameValue, false, false, 1, 1);
  }
  let taskListElement = {
    name: nameValue,
    priority: 0,
    is_favorite: false,
    is_completed: false,
    task_group_id: 1,
    creation_date: "2023-05-12",
    completion_date: "2023-05-27"
  };
  // let taskData = tasksListEl[curOptEl];

  tasksListEl.push(taskListElement);
  
});