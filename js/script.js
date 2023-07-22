{
    const tasks = [
        {
            content: "zrobić obiadek",
            done: true
        },
        {
            content: "wyprowadzić pieska",
            done: false
        }
    ];

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-checkList__button--remove");

        // console.log(removeButtons)
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(taskIndex, 1)
                render();
            })
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="checkList__item">
                    <button class="checkList__button js-checkList__button--done">
                        <img width="30px" height="30px" src="images/not_done.png" alt="not_done">
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