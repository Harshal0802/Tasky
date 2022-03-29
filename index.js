const taskContainer = document.getElementById("task_container");
console.log(taskContainer);

let globalStore = [];

const newCard = ({id, imageUrl, taskTitle, taskType, taskDescription}) => `
    <div class="col-md-6 col-lg-4 id=${id}">
    <div class="card">
        <div class="card-header d-flex justify-content-end gap-2 rounded-3">
            <button type="button" id=${id} class="btn btn-outline-success" onclick="editCard.apply(this, arguments)">
                <i class="fa-solid fa-pencil" id=${id} onclick="editCard.apply(this, arguments)"></i>
            </button>
            <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
                <i class="fa-solid fa-trash" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
            </button>
        </div>
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${taskTitle}</h5>
            <p class="card-text">${taskDescription}</p>
            <span class="badge bg-primary">${taskType}</span>
        </div>
        <div class="card-footer text-muted">
            <button type="button" id=${id} class="btn btn-outline-primary float-end">
                open task
            </button>
        </div>
    </div>
    </div>
`;

const updateLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));
};

const loadInitialTaskCards = () => {
    //access localStorage
    const getInitialdata = localStorage.getItem("tasky");
    if(!getInitialdata) return;
    //convert Stingified object to object
    const { cards } = JSON.parse(getInitialdata);
    //map around the array to generate the HTML card
    cards.map((card) => {
        const createNewCard = newCard(card);
        taskContainer.insertAdjacentHTML("beforeend",createNewCard);    
        globalStore.push(card);
    })
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //unique number for card 
        imageUrl : document.getElementById("image-url").value,
        taskTitle: document.getElementById("task-title").value,
        taskType: document.getElementById("task-type").value,
        taskDescription: document.getElementById("task-description").value,
    };

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend",createNewCard);

    globalStore.push(taskData);

    updateLocalStorage();
};

const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);

    updateLocalStorage();

    if(tagname === "BUTTON"){
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    }

    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );
};

const editCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];
    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEditChange.apply(this, arguments)");
    submitButton.innerHTML = "Save Changes";
    console.log(taskTitle);
    console.log(taskDescription);
    console.log(taskType);
    console.log(submitButton);
};


const saveEditChange = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;

    if(tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];  

    const updatedData = {
        taskTitle: taskTitle.innerHTML,
        taskType: taskType.innerHTML,
        taskDescription: taskDescription.innerHTML,
    };

    globalStore = globalStore.map((task) => {
        if(task.id === targetID)
        {
            return {
                id: task.id,
                imageUrl : task.imageUrl,
                taskTitle: updatedData.taskTitle,
                taskType: updatedData.taskType,
                taskDescription: updatedData.taskDescription,
            };
        }
      return task;  
    });
    updateLocalStorage();
};