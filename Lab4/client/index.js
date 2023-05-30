let tasksListEl = [];

addTasksToTaskList();

const createNewTaskElement = (priorityArg, taskTextArg) => {
  console.log(`PriorityArg ${priorityArg}`);
  console.log(`TaskTextArg ${taskTextArg}`);
  let priority = priorityArg === null || priorityArg === undefined || typeof priorityArg !== typeof Number() ? 0: priorityArg;
  let taskText = taskTextArg === null || taskTextArg === undefined || typeof taskTextArg !== typeof String() ? '' : taskTextArg;

  // console.log(`Changed PriorityArg ${priority}`);
  // console.log(`Changed TaskTextArg ${taskText}`);

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

  taskListInput = document.createElement("input");
  taskListInput.className = "task-list__name";

  taskListOptions = document.createElement("img");
  taskListOptions.className = "task-list__options";
  taskListOptions.src = "./img/options-icon.png";

  taskListOptionsMenu = document.createElement("ul");
  taskListOptionsMenu.className = "task-list__options-menu";

  taskListOptionsElUpdate = document.createElement("li");
  taskListOptionsElUpdate.className = "task-list__options-menu-element-update";
  taskListOptionsElUpdate.textContent = "Update";

  taskListOptionsElDelete = document.createElement("li");
  taskListOptionsElDelete.className = "task-list__options-menu-element-delete";
  taskListOptionsElDelete.textContent = "Delete";

  taskListOptionsElFavorite = document.createElement("li");
  taskListOptionsElFavorite.className = "task-list__options-menu-element-favorite"; 
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
    let taskData = {
      name: "defaultName",
      priority: 1,
      is_favorite: false,
      is_completed: false,
      task_group_id: 1,
      creation_date: "2023-05-12",
      completion_date: "2023-05-27"
    }
    updateTask(taskData, 1);
  }, false);

  taskListOptionsElDelete.addEventListener("click", () => {
      alert("Delete");
  }, false); 

  taskListOptionsElFavorite.addEventListener("click", () => {
    favoriteButtons = document.querySelectorAll('.task-list__options-menu-element-favorite');
    console.log(favoriteButtons);
    let index = 0;
    for (let i = 0; i < favoriteButtons.length; i++) {
      if (favoriteButtons[i] === event.target) {
        index = i;
        break;
      }
    }
    console.log(index);
    // alert("Favorite");
    // menuArr[index].classList.toggle("active");
  }, false);

  taskListOptionsElLowPriority.addEventListener("click", () => {
    alert("Low priority");
  }, false);

  taskListOptionsElMediumPriority.addEventListener("click", () => {
    alert("Medium priority");
  }, false);

  taskListOptionsElHighPriority.addEventListener("click", () => {
    alert("High priority");
  }, false);

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
  
  document.addEventListener("click", event => {
    if (event.button !== 2) {
      menuArr.forEach((el) => {
        el.classList.remove("active");
      })
      
    }
  }, false);

  taskListCircle.appendChild(taskListCircleInput);
  taskListCircle.appendChild(taskListCircleCheck);

  taskListRectangleInner.appendChild(taskListCircle);
  taskListRectangleInner.appendChild(taskListElementInput);
  taskListRectangleInner.appendChild(taskListOptions);
  taskListRectangleInner.appendChild(taskListOptionsMenu);

  taskListRectangle.appendChild(taskListRectangleInner);

  taskListElement.appendChild(taskListRectangle);

  taskListOptions.addEventListener("contextmenu", event => {
    event.preventDefault();
    taskListOptionsMenu.style.top = `${event.clientY}px`;
    taskListOptionsMenu.style.left = `${event.clientX}px`;
    taskListOptionsMenu.classList.toggle("active");
  })

  return taskListElement; 
}

const addTaskElement = (priorityArg, taskTextArg, index) => {
  console.log('Add task');

  let newTaskListEl = createNewTaskElement(priorityArg, taskTextArg);
  newTaskListEl.classList.add(String('el-' + index))

  taskList.appendChild(newTaskListEl);
}

let taskList = document.querySelector('.tasks-list');
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

  tasksArr.forEach((el, i) => {
    addTaskElement(el.priority, el.name, i)
  })
}

// let menuArea = document.querySelector(".task-list__options");
// let menu = document.querySelector(".task-list__options-menu");

// let updateElement = document.querySelector(".task-list__options-menu-element-update");
// let deleteElement = document.querySelector(".task-list__options-menu-element-delete");
// let favoriteElement = document.querySelector(".task-list__options-menu-element-favorite");
// let lowPriorityElement = document.querySelector(".task-list__options-menu-element-low-priority");
// let mediumPriorityElement = document.querySelector(".task-list__options-menu-element-medium-priority");
// let highPriorityElement = document.querySelector(".task-list__options-menu-element-high-priority");

let menuAreaArr = document.querySelectorAll(".task-list__options");
let menuArr = document.querySelectorAll(".task-list__options-menu");

let updateElementArr = document.querySelectorAll(".task-list__options-menu-element-update");
let deleteElementArr = document.querySelectorAll(".task-list__options-menu-element-delete");
let favoriteElementArr = document.querySelectorAll(".task-list__options-menu-element-favorite");
let lowPriorityElementArr = document.querySelectorAll(".task-list__options-menu-element-low-priority");
let mediumPriorityElementArr = document.querySelectorAll(".task-list__options-menu-element-medium-priority");
let highPriorityElementArr = document.querySelectorAll(".task-list__options-menu-element-high-priority");

menuAreaArr.forEach((el, index) => {
  el.addEventListener("contextmenu", event => {
    event.preventDefault();
    menuArr[index].style.top = `${event.clientY}px`;
    menuArr[index].style.left = `${event.clientX}px`;
    menuArr[index].classList.toggle("active");
  })
})

menuArr.forEach((el) => {
  el.addEventListener("click", event => {
    event.stopPropagation();
  }, false);
})

document.addEventListener("click", event => {
  if (event.button !== 2) {
    menuArr.forEach((el) => {
      el.classList.remove("active");
    })
    
  }
}, false);

updateElementArr.forEach((el) => {
  el.addEventListener("click", () => {
    alert("update");
  }, false);
})

deleteElementArr.forEach((el) => {
  el.addEventListener("click", () => {
    alert("Delete");
  }, false);
}) 

favoriteElementArr.forEach((el) => {
  el.addEventListener("click", () => {
    alert("Favorite");
  }, false);
})

lowPriorityElementArr.forEach((el) => {
  el.addEventListener("click", () => {
    alert("Low priority");
  }, false);
})

mediumPriorityElementArr.forEach((el) => {
  el.addEventListener("click", () => {
    alert("Medium priority");
  }, false);
})

highPriorityElementArr.forEach((el) => {
  el.addEventListener("click", () => {
    alert("High priority");
  }, false);
})

addTaskBtn.addEventListener("click", () => {
  let addTaskInput = document.querySelector('.add-task-rectangle');

  let taskListElement = {
    name: addTaskInput.value,
    priority: 1,
    is_favorite: false,
    is_completed: false,
    task_group_id: 1,
    creation_date: "2023-05-12",
    completion_date: "2023-05-27"
  };
  tasksListEl.push(taskListElement);
  console.log(tasksListEl);
  addTaskElement(null, null);
});