let taskInput = document.getElementById("task-input");
let addBttn = document.getElementById("add-bttn");
let taskList = [];

addBttn.addEventListener("click",addTask);



function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskContent);
    render();
}

function render(){
    let resultHtml = "";
    for (let i=0; i<taskList.length;i++){
        resultHtml += `
        <div class="task">
            <div>${taskList[i]}</div>
            <div>
              <button>check</button>
              <button>delete</button>
            </div>
          </div>
        `;
    }


    document.getElementById("task-board").innerHTML = resultHtml;


}