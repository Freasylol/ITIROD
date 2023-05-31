let tasksListEl = [];

let curOptEl = 0;

addTasksToTaskList();

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

const createNewTaskElement = (priorityArg, taskTextArg, index) => {
  console.log(`PriorityArg ${priorityArg}`);
  console.log(`TaskTextArg ${taskTextArg}`);
  let priority = priorityArg === null || priorityArg === undefined || typeof priorityArg !== typeof Number() ? 0: priorityArg;
  let taskText = taskTextArg === null || taskTextArg === undefined || typeof taskTextArg !== typeof String() ? '' : taskTextArg;

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

  let taskRectangles = document.querySelectorAll('.task-list__element')

  taskListInput = document.createElement("input");
  taskListInput.className = "task-list__name";

  taskListOptions = document.createElement("img");
  taskListOptions.className = `task-list__options options-${taskRectangles.length}`;
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
    // let taskData = {
    //   name: "defaultName",
    //   priority: 1,
    //   is_favorite: false,
    //   is_completed: false,
    //   task_group_id: 1,
    //   creation_date: "2023-05-12",
    //   completion_date: "2023-05-27"
    // }
    // updateTask(taskData, 1);
    let nameValue = '';
    let nameInputs = document.querySelectorAll('.task-list__name');
    for (let i = 0; i < nameInputs.length; i++) {
      if (i === curOptEl) {
        nameValue = nameInputs[i].value;
      }
    }
    tasksListEl[curOptEl].name = nameValue;
    console.log(tasksListEl[curOptEl]);
    hideAllMenus();
  }, false);

  taskListOptionsElDelete.addEventListener("click", () => {
    tasksListEl.splice(curOptEl, 1);
    hideAllMenus();
  }, false); 

  taskListOptionsElFavorite.addEventListener("click", () => {
    console.log(event.target.classList)
    console.log(tasksListEl[curOptEl])
    if (tasksListEl[curOptEl].is_favorite === true) {
      tasksListEl[curOptEl].is_favorite = false;
    } else {
      tasksListEl[curOptEl].is_favorite = true;
    }
    console.log(tasksListEl[curOptEl]); 
    hideAllMenus();
  }, false);

  taskListOptionsElLowPriority.addEventListener("click", () => {
    tasksListEl[curOptEl].priority = 1;
    let checkboxes = document.querySelectorAll('.checkbox span');
    for (let i = 0; i < checkboxes.length; i++) {
      if (i === curOptEl) {
        if (checkboxes[i].classList.contains('medium-priority')) {
          checkboxes[i].classList.remove('medium-priority');
        } else if (checkboxes[i].classList.contains('high-priority')) {
          checkboxes[i].classList.remove('high-priority');
        }
      }
    }
    hideAllMenus();
  }, false);

  taskListOptionsElMediumPriority.addEventListener("click", () => {
    tasksListEl[curOptEl].priority = 1;
    let checkboxes = document.querySelectorAll('.checkbox span');
    for (let i = 0; i < checkboxes.length; i++) {
      if (i === curOptEl) {
        if (checkboxes[i].classList.contains('high-priority')) {
          checkboxes[i].classList.remove('high-priority');
          checkboxes[i].classList.add('medium-priority');
        } else if (checkboxes[i].classList.contains('medium-priority') != true) {
          checkboxes[i].classList.add('medium-priority');
        }
      }
    }
    hideAllMenus();
  }, false);

  taskListOptionsElHighPriority.addEventListener("click", () => {
    tasksListEl[curOptEl].priority = 2;
    let checkboxes = document.querySelectorAll('.checkbox span'); 
    for (let i = 0; i < checkboxes.length; i++) {
      if (i === curOptEl) {
        if (checkboxes[i].classList.contains('medium-priority')) {
          checkboxes[i].classList.remove('medium-priority');
          checkboxes[i].classList.add('high-priority');
        } else if (checkboxes[i].classList.contains('high-priority') != true) {
          checkboxes[i].classList.add('high-priority');
        }
      }
    }
    hideAllMenus();
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

const addTaskElement = (priorityArg, taskTextArg, index) => {
  console.log('Add task');

  let newTaskListEl = createNewTaskElement(priorityArg, taskTextArg, index);
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

let menuAreaArr = document.querySelectorAll(".task-list__options");
let menuArr = document.querySelectorAll(".task-list__options-menu");

let updateElementArr = document.querySelectorAll(".task-list__options-menu-element-update");
let deleteElementArr = document.querySelectorAll(".task-list__options-menu-element-delete");
let favoriteElementArr = document.querySelectorAll(".task-list__options-menu-element-favorite");
let lowPriorityElementArr = document.querySelectorAll(".task-list__options-menu-element-low-priority");
let mediumPriorityElementArr = document.querySelectorAll(".task-list__options-menu-element-medium-priority");
let highPriorityElementArr = document.querySelectorAll(".task-list__options-menu-element-high-priority");

// menuAreaArr.forEach((el, index) => {
//   el.addEventListener("contextmenu", event => {
//     event.preventDefault();
//     menuArr[index].style.top = `${event.clientY}px`;
//     menuArr[index].style.left = `${event.clientX}px`;
//     menuArr[index].classList.toggle("active");
//   })
// })

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