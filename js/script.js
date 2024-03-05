{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const taskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideCompletedTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const completeAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
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

    const bindButtonsEvents = () => {

        const hideCompletedButton = document.querySelector(".js-buttons__hideCompleted");

        if (hideCompletedButton) {

            hideCompletedButton.addEventListener("click", toggleHideCompletedTasks);
        };

        const completeAllButton = document.querySelector(".js-buttons__completeAll");

        if (completeAllButton) {

            completeAllButton.addEventListener("click", completeAllTasks);
        };
    };

    const renderTasks = () => {
        let htmlTasksString = "";

        for (const task of tasks) {
            htmlTasksString += `
                <li class="${hideDoneTasks && task.done ? "checkList__item--hidden" : "checkList__item"}">
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

        document.querySelector(".js-tasks").innerHTML = htmlTasksString;
    };

    const renderButtons = () => {
        let htmlButtonsString = ""

        if (tasks.length) {
            htmlButtonsString += `
                <button class="buttons__hideComplete js-buttons__hideCompleted">
                   ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="buttons__hideComplete js-buttons__completeAll" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `;
        }

        document.querySelector(".js-buttons").innerHTML = htmlButtonsString;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
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