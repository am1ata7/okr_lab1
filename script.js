function runQuickStart() {
    alert("Вітаємо на DRZDV Music!");
}

function userDialog() {
    let userName = prompt("Як вас звати?");

    if (!userName) {
        userName = "гість";
    }

    let likesMusic = confirm(userName + ", хочете підібрати музичний настрій?");

    if (likesMusic) {
        let genre = "";
        let attempts = 0;

        while (genre === "" && attempts < 3) {
            genre = prompt("Введіть жанр або настрій, який хочете послухати:");
            attempts++;
        }

        if (genre) {
            alert("Для вас підійде настрій: " + genre);
            document.getElementById("dialog-result").textContent =
                userName + ", ваш музичний настрій: " + genre + ".";
        } else {
            alert("Жанр не введено.");
        }
    } else {
        alert("Можна просто переглянути сайт.");
    }
}

function showDeveloperInfo(lastName, firstName, position = "розробниця сайту") {
    alert("Автор: " + lastName + " " + firstName + "\nПосада: " + position);

    document.getElementById("dialog-result").textContent =
        "Автор сайту: " + lastName + " " + firstName + ", " + position + ".";
}

function compareStrings() {
    const firstString = document.getElementById("first-string").value;
    const secondString = document.getElementById("second-string").value;

    if (!firstString || !secondString) {
        alert("Введіть обидві назви треків.");
        return;
    }

    if (firstString.length > secondString.length) {
        alert("Більша назва: " + firstString);
        document.getElementById("dialog-result").textContent =
            "Більша назва треку: " + firstString;
    } else if (secondString.length > firstString.length) {
        alert("Більша назва: " + secondString);
        document.getElementById("dialog-result").textContent =
            "Більша назва треку: " + secondString;
    } else {
        alert("Назви однакової довжини.");
        document.getElementById("dialog-result").textContent =
            "Назви треків однакової довжини.";
    }
}

function changeBackgroundFor30Seconds() {
    const oldBackground = document.body.style.backgroundColor;

    document.body.style.backgroundColor = "#1f1f2e";
    document.body.style.color = "white";

    setTimeout(function () {
        document.body.style.backgroundColor = oldBackground;
        document.body.style.color = "#222";
        alert("Вечірній режим вимкнено.");
    }, 30000);
}

function redirectToPlaylist() {
    const answer = confirm("Відкрити сторінку плейлиста?");

    if (answer) {
        location.href = "playlist.html";
    }
}

function updateMusicFeed() {
    const result = document.getElementById("dialog-result");

    result.innerHTML = "<b>Оновлення:</b> у стрічку додано нові музичні рекомендації.";

    const newParagraph = document.createElement("p");
    const textNode = document.createTextNode("Рекомендація: переглянути плейлист DRZDV Music.");
    newParagraph.append(textNode);

    result.append(newParagraph);
}

function initMainButtons() {
    const dialogBtn = document.getElementById("dialog-btn");
    const developerBtn = document.getElementById("developer-btn");
    const compareBtn = document.getElementById("compare-btn");
    const bgBtn = document.getElementById("bg-btn");
    const locationBtn = document.getElementById("location-btn");

    if (dialogBtn) {
        dialogBtn.addEventListener("click", userDialog);
    }

    if (developerBtn) {
        developerBtn.addEventListener("click", function () {
            showDeveloperInfo("Дроздова", "Анастасія");
        });
    }

    if (compareBtn) {
        compareBtn.addEventListener("click", compareStrings);
    }

    if (bgBtn) {
        bgBtn.addEventListener("click", changeBackgroundFor30Seconds);
    }

    if (locationBtn) {
        locationBtn.addEventListener("click", redirectToPlaylist);
    }
}

function initMouseEvents() {
    const moodScale = document.getElementById("mood-scale");
    const hoverInfo = document.getElementById("hover-info");

    if (!moodScale || !hoverInfo) {
        return;
    }

    moodScale.addEventListener("mouseover", function (event) {
        event.target.classList.add("is-hovered");

        hoverInfo.textContent = "Шкала дозволяє обрати музичний настрій для добірки.";
    });

    moodScale.addEventListener("mouseout", function (event) {
        if (event.relatedTarget && moodScale.contains(event.relatedTarget)) {
            return;
        }

        moodScale.classList.remove("is-hovered");
        hoverInfo.textContent = "Наведіть курсор на шкалу, щоб побачити опис.";
    });
}

function initDragAndDrop() {
    const scale = document.getElementById("mood-scale");
    const handle = document.getElementById("mood-handle");
    const progress = document.getElementById("mood-progress");
    const result = document.getElementById("mood-result");

    if (!scale || !handle || !progress || !result) {
        return;
    }

    function updateMood(percent) {
        let mood = "synth";
        let description = "електронний вайб і нічна атмосфера.";

        if (percent < 33) {
            mood = "heavy";
            description = "важче звучання та більше енергії.";
        } else if (percent > 66) {
            mood = "pop";
            description = "легший поп-настрій.";
        }

        handle.style.left = percent + "%";
        progress.style.width = percent + "%";
        result.textContent = "Поточний настрій: " + mood + " — " + description;
    }

    handle.addEventListener("mousedown", function (event) {
        event.preventDefault();

        handle.classList.add("dragging");

        function onMouseMove(event) {
            const rect = scale.getBoundingClientRect();
            let x = event.clientX - rect.left;

            if (x < 0) {
                x = 0;
            }

            if (x > rect.width) {
                x = rect.width;
            }

            const percent = Math.round((x / rect.width) * 100);
            updateMood(percent);
        }

        document.addEventListener("mousemove", onMouseMove);

        document.addEventListener("mouseup", function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            handle.classList.remove("dragging");
        });
    });

    scale.addEventListener("mousedown", function (event) {
        const rect = scale.getBoundingClientRect();
        let x = event.clientX - rect.left;

        if (x < 0) {
            x = 0;
        }

        if (x > rect.width) {
            x = rect.width;
        }

        const percent = Math.round((x / rect.width) * 100);
        updateMood(percent);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initMainButtons();
    initMouseEvents();
    initDragAndDrop();

    const year = document.getElementById("current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});