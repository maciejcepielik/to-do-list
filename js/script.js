{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent
            });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1)
        render();
    };

    const taskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-checkList__button--remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-checkList__button--done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                taskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="checkList__item">
                    <button class="checkList__button checkList__button--done js-checkList__button--done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="checkList__task js-checkList__task ${task.done ? "checkList__task--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="checkList__button checkList__button--remove js-checkList__button--remove">
                        🗑️
                    </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask");
        const newTaskContentValue = newTaskContent.value.trim();

        if (newTaskContentValue !== "") {
            addNewTask(newTaskContentValue);
            newTaskContent.value = "";
        }

        newTaskContent.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}