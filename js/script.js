{
    const tasks = [];

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-checkList__button--remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(taskIndex, 1)
                render();
            })
        });
    }

    const taskDone = () => {
        const doneButtons = document.querySelectorAll(".js-checkList__button--done");

        doneButtons.forEach((doneButton, taskIndex) => {
            doneButton.addEventListener("click", () => {
                tasks[taskIndex].done = !tasks[taskIndex].done;
                render();
            })
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="checkList__item">
                    <button class="checkList__button checkList__button--done js-checkList__button--done"> ${task.done ? "✔" : ""}
                    </button>
                    <span class="checkList__task js-checkList__task ${task.done ? "checkList__task--done" : ""}">${task.content}</span>
                    <button class="checkList__button js-checkList__button--remove">
                        <img width="30px" height="30px" src="images/delete_icon.png" alt="delete">
                    </button>
            </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        removeTask();

        taskDone();

    };

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent
            });

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        // console.log(newTaskContent)

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}