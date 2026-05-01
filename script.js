function runQuickStart() {
    alert("Вітаємо на сайті DRZDV Music!");

    let visitorName = prompt("Введіть ваше ім’я:");
    if (visitorName === null || visitorName.trim() === "") {
        alert("Ім’я не введено.");
        return;
    }

    let answer = confirm(visitorName + ", бажаєте отримати персональну музичну рекомендацію?");
    const resultBox = document.getElementById("dialog-result");

    if (!resultBox) {
        return;
    }

    if (answer) {
        resultBox.textContent = "Натисніть кнопку «Підібрати трек», щоб отримати рекомендацію.";
    } else {
        resultBox.textContent = "Можете переглянути сторінки сайту або повернутися до рекомендацій пізніше.";
    }
}

function showDeveloperInfo() {
    alert("Сайт створила Анастасія Дроздова.");
}

function userDialog() {
    let mood = prompt("Оберіть настрій: спокійний, енергійний, темний, важкий, меланхолійний");

    if (mood === null || mood.trim() === "") {
        alert("Настрій не введено.");
        return;
    }

    mood = mood.trim().toLowerCase();

    let recommendation = "";

    if (mood === "спокійний") {
        recommendation = "It's No Good — Depeche Mode";
    } else if (mood === "енергійний") {
        recommendation = "Levitating — Dua Lipa";
    } else if (mood === "темний") {
        recommendation = "Blinding Lights — The Weeknd";
    } else if (mood === "важкий") {
        recommendation = "Freak On a Leash — Korn";
    } else if (mood === "меланхолійний") {
        recommendation = "Genesis — Deftones";
    } else {
        recommendation = "Enjoy the Silence — Depeche Mode";
    }

    const resultBox = document.getElementById("dialog-result");
    if (resultBox) {
        resultBox.innerHTML =
            "<strong>Рекомендований трек:</strong><br>" + recommendation;
    }
}

function compareStrings() {
    const firstInput = document.getElementById("first-string");
    const secondInput = document.getElementById("second-string");

    if (!firstInput || !secondInput) {
        return;
    }

    const firstValue = firstInput.value.trim();
    const secondValue = secondInput.value.trim();

    if (firstValue === "" || secondValue === "") {
        alert("Потрібно ввести дві назви для порівняння.");
        return;
    }

    if (firstValue.length > secondValue.length) {
        alert("Довша назва: " + firstValue);
    } else if (secondValue.length > firstValue.length) {
        alert("Довша назва: " + secondValue);
    } else {
        alert("Обидві назви однакові за довжиною.");
    }
}

function changeBackgroundFor30Seconds() {
    const originalColor = getComputedStyle(document.body).backgroundColor;
    document.body.style.backgroundColor = "#dbeafe";

    const resultBox = document.getElementById("dialog-result");
    if (resultBox) {
        resultBox.textContent = "Вечірній режим увімкнено на 30 секунд.";
    }

    setTimeout(function () {
        document.body.style.backgroundColor = originalColor;
        if (resultBox) {
            resultBox.textContent = "Вечірній режим вимкнено.";
        }
    }, 30000);
}

function redirectToPlaylist() {
    const answer = confirm("Перейти до сторінки плейлиста?");
    if (answer) {
        location.href = "playlist.html";
    }
}

function highlightNavByPage() {
    const links = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    for (let i = 0; i < links.length; i++) {
        const href = links[i].getAttribute("href");
        if (href === currentPage) {
            links[i].style.color = "#ffcc66";
            links[i].style.textDecoration = "underline";
        }
    }
}

function setupIndexPageHandlers() {
    const developerBtn = document.getElementById("developer-btn");
    const dialogBtn = document.getElementById("dialog-btn");
    const compareBtn = document.getElementById("compare-btn");
    const bgBtn = document.getElementById("bg-btn");
    const locationBtn = document.getElementById("location-btn");

    if (developerBtn) {
        developerBtn.onclick = showDeveloperInfo;
    }

    if (dialogBtn) {
        dialogBtn.addEventListener("click", userDialog);
        dialogBtn.addEventListener("click", function () {
            console.log("Кнопка підбору треку була натиснута.");
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

function setupBubblingDemo() {
    const outerBox = document.getElementById("outer-box");
    const resultBox = document.getElementById("dialog-result");

    if (!outerBox || !resultBox) {
        return;
    }

    outerBox.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            resultBox.innerHTML += "<br>Спрацювало спливання: клік дійшов до контейнера кнопок.";
        }
    });
}

function setupArtistDelegation() {
    const artistList = document.getElementById("artist-list");
    const resultBlock = document.getElementById("artist-result");

    if (!artistList || !resultBlock) {
        return;
    }

    artistList.addEventListener("click", function (event) {
        const card = event.target.closest(".card");

        if (!card || !artistList.contains(card)) {
            return;
        }

        const artistName = card.dataset.artist;
        const artistInfo = card.dataset.info;

        resultBlock.innerHTML =
            "<strong>" + artistName + "</strong><br>" + artistInfo;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const year = document.getElementById("current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    highlightNavByPage();
    setupIndexPageHandlers();
    setupBubblingDemo();
    setupArtistDelegation();
});