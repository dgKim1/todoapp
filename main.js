let taskInput = document.getElementById("task-input");
let addBttn = document.getElementById("add-bttn");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let filterList = [];
let mode = "all";
let underLine = document.getElementById("under-line");

addBttn.addEventListener("click", addTask);


//기본 underline style 설정 (all탭 아래)
underLine.style.left = tabs[1].offsetLeft + "px";
underLine.style.width = tabs[1].offsetWidth + "px";
underLine.style.top = tabs[1].offsetTop - 3 + tabs[1].offsetHeight + "px";

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  tabs[i].addEventListener("click", (e) => horizontalIndicator(e));
}

function horizontalIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top =
    e.currentTarget.offsetTop - 3 + e.currentTarget.offsetHeight + "px";
}

function enterkey() {
  if (window.event.keyCode == 13) {
    // 엔터키가 눌렸을 때
    addTask();
  }
}

function addTask() {
  if (taskInput.value === "") {
    alert("할 일을 입력하세요!!!");
    return;
  }
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }
  let resultHtml = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHtml += `
        <div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
              <button onClick="toggleComplete('${list[i].id}')">check</button>
              <button onClick="deleteTask('${list[i].id}')">Delete</button>
            </div>
          </div>`;
    } else {
      resultHtml += `
        <div class="task">
            <div>${list[i].taskContent}</div>
            <div>
              <button onClick="toggleComplete('${list[i].id}')">check</button>
              <button onClick="deleteTask('${list[i].id}')">Delete</button>
            </div>
          </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  if (mode !== "all") {
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].id == id) {
        filterList.splice(i, 1);
        break;
      }
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
