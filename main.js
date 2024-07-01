let taskInput = document.getElementById("task-input");
let addBttn = document.getElementById("add-bttn");
let taskList = [];

addBttn.addEventListener("click",addTask);



function addTask() {
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHtml = "";
    for (let i=0; i<taskList.length;i++){
      if(taskList[i].isComplete == true){
        resultHtml += `
        <div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
              <button onClick="toggleComplete('${taskList[i].id}')">check</button>
              <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
          </div>`;
      } else{
        resultHtml +=
        `
        <div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
              <button onClick="toggleComplete('${taskList[i].id}')">check</button>
              <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
          </div>`;
      }
    }


    document.getElementById("task-board").innerHTML = resultHtml;


}



function toggleComplete(id) {
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}


function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1);
      break;
    }
  }
  render();
}

function randomIdGenerate() {
  return "_"+Math.random().toString(36).substr(2, 9);
}