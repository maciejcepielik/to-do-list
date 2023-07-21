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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="checkList__item">
                    <button class="checkList__button js-checkList__button--done">
                        <img width="30px" height="30px" src="images/not_done.png" alt="not_done">
                    </button>
                    <span class="checkList__task js-checkList__task ${task.done ? "checkList__task--done" : ""}">${task.content}</span>
                    <button class="checkList__button">
                        <img width="30px" height="30px" src="images/delete_icon.png" alt="delete">
                    </button>
            </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent
            });

        render();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();
            // console.log(newTaskContent)

            if (newTaskContent === "") {
                return;
            }

            addNewTask(newTaskContent);
        });

    };

    init();
}