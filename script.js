const tasks = [
    { question: "Wie schreibt man 'kaputt'?", answer: "Wie wird 'kaputt' geschrieben?" },
    { question: "Wo schaltet man diese Kamera aus?", answer: "Wo wird diese Kamera ausgeschaltet?" },
    { question: "Wann vermietet man die Wohnungen?", answer: "Wann werden die Wohnungen vermietet?" },
    { question: "Welche Sprache spricht man in Österreich?", answer: "Welche Sprache wird in Österreich gesprochen?" },
    { question: "Was trinkt man beim Oktoberfest in München?", answer: "Was wird beim Oktoberfest in München getrunken?" },
    { question: "Was isst man bei euch zum Frühstück?", answer: "Was wird bei euch zum Frühstück gegessen?" },
    { question: "Wie macht man Kartoffelsalat?", answer: "Wie wird Kartoffelsalat gemacht?" },
    { question: "Was verkauft man auf der Post?", answer: "Was wird auf der Post verkauft?" },
    { question: "Wann erntet man Orangen?", answer: "Wann werden Orangen geerntet?" },
    { question: "Was für Kleidung trägt man zu einer Hochzeit?", answer: "Was für Kleidung wird zu einer Hochzeit getragen?" },
    { question: "Zeigt man bei euch viele amerikanische Filme?", answer: "Werden bei euch viele amerikanische Filme gezeigt?" },
    { question: "Wie bezahlt man den Deutschkurs?", answer: "Wie wird der Deutschkurs bezahlt?" },
    { question: "Spielt man bei euch viel Fußball?", answer: "Wird bei euch viel Fußball gespielt?" },
    { question: "Wo isst man kein Schweinefleisch?", answer: "Wo wird kein Schweinefleisch gegessen?" },
    { question: "Welche Autos fährt man bei euch viel?", answer: "Welche Autos werden bei euch viel gefahren?" },
    { question: "Raucht man bei euch viel?", answer: "Wird bei euch viel geraucht?" },
    { question: "Welches Fest feiert man am 24. Dezember?", answer: "Welches Fest wird am 24. Dezember gefeiert?" },
    { question: "Schreibt man in deiner Heimat von rechts nach links?", answer: "Wird in deiner Heimat von rechts nach links geschrieben?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);