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

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTask = document.querySelector(".js-newTask").value.trim();
            // console.log(newTask)

            if (newTask === "") {
                return;
            }

            tasks.push(
                {
                    content: newTask
                });

            render();
        });

    };

    init();
}