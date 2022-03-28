const taskContainer = document.getElementById("task_container");
console.log(taskContainer);

const newCard = ({id, imageUrl, taskTitle, taskType, taskDescription}) => `
    <div class="col-md-6 col-lg-4 id=${id}">
    <div class="card">
        <div class="card-header d-flex justify-content-end gap-2 rounded-3">
            <button type="button" class="btn btn-outline-success">
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button type="button" class="btn btn-outline-danger">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${taskTitle}</h5>
            <p class="card-text">${taskDescription}</p>
            <span class="badge bg-primary">${taskType}</span>
        </div>
        <div class="card-footer text-muted">
            <button type="button" class="btn btn-outline-primary float-end">
                open task
            </button>
        </div>
    </div>
    </div>
`;

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
};