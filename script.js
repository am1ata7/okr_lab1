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
    const moodZone = document.getElementById("mood-zone");
    const hoverInfo = document.getElementById("hover-info");

    if (!moodZone || !hoverInfo) {
        return;
    }

    moodZone.addEventListener("mouseover", function (event) {
        const card = event.target.closest(".mood-card");

        if (!card || !moodZone.contains(card)) {
            return;
        }

        if (event.relatedTarget && card.contains(event.relatedTarget)) {
            return;
        }

        card.classList.add("is-hovered");
        hoverInfo.textContent = card.dataset.note;
    });

    moodZone.addEventListener("mouseout", function (event) {
        const card = event.target.closest(".mood-card");

        if (!card || !moodZone.contains(card)) {
            return;
        }

        if (event.relatedTarget && card.contains(event.relatedTarget)) {
            return;
        }

        card.classList.remove("is-hovered");
        hoverInfo.textContent = "Наведіть курсор на картку, щоб побачити опис настрою.";
    });
}

function initDragAndDrop() {
    const moodCards = document.querySelectorAll(".mood-card");
    const choiceArea = document.getElementById("choice-area");
    const selectedMood = document.getElementById("selected-mood");

    if (!moodCards.length || !choiceArea || !selectedMood) {
        return;
    }

    moodCards.forEach(function (card) {
        card.addEventListener("mousedown", function (event) {
            event.preventDefault();

            const startRect = card.getBoundingClientRect();
            const shiftX = event.clientX - startRect.left;
            const shiftY = event.clientY - startRect.top;

            card.classList.add("dragging");
            card.style.left = startRect.left + "px";
            card.style.top = startRect.top + "px";
            card.style.width = startRect.width + "px";

            function moveAt(clientX, clientY) {
                card.style.left = clientX - shiftX + "px";
                card.style.top = clientY - shiftY + "px";
            }

            function onMouseMove(event) {
                moveAt(event.clientX, event.clientY);

                const areaRect = choiceArea.getBoundingClientRect();

                const insideArea =
                    event.clientX >= areaRect.left &&
                    event.clientX <= areaRect.right &&
                    event.clientY >= areaRect.top &&
                    event.clientY <= areaRect.bottom;

                if (insideArea) {
                    choiceArea.classList.add("is-active");
                } else {
                    choiceArea.classList.remove("is-active");
                }
            }

            document.addEventListener("mousemove", onMouseMove);

            document.addEventListener("mouseup", function onMouseUp(event) {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);

                const areaRect = choiceArea.getBoundingClientRect();

                const insideArea =
                    event.clientX >= areaRect.left &&
                    event.clientX <= areaRect.right &&
                    event.clientY >= areaRect.top &&
                    event.clientY <= areaRect.bottom;

                if (insideArea) {
                    selectedMood.textContent = "Обрано настрій: " + card.textContent.trim();
                }

                choiceArea.classList.remove("is-active");
                card.classList.remove("dragging");

                card.style.left = "";
                card.style.top = "";
                card.style.width = "";
            });
        });

        card.ondragstart = function () {
            return false;
        };
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