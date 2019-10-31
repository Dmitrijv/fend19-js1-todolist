/*

    Din uppgift

    Du skall med hjälp av HTML, CSS och Javascript göra en todo-applikation.
    I applikationen skall en användare kunna lägga till och ta bort ärenden från en “att göra”-lista.
    Du får göra precis som du vill med styling. Applikationen har olika krav beroende på betygsnivå.


    Krav för godkänt (G):

    Applikationen skall ha ett inmatningsfält med tillhörande knapp där användaren kan fylla i en ny todo.

    När användaren klickar på en “lägg till”-knapp, eller trycker på Enter-tangenten på tangentbordet skall 
    todo:n läggas till i en lista på todos. Inmatningsfältet skall tömmas när en todo lags till i listan.

    Applikationen skall även ha en lista över redan inmatade todos.
    I listan över inmatade todos skall det också finnas en knapp för varje todo, 
    där användaren kan ta bort en todo ur listan. 
    När användaren klickar på “ta bort”-knappen skall todo:n tas bort ur listan.

    Applikationen skall även ha ett fält som kan användas för att filtrera todos.
    När användaren skriver i fältet skall bara de todos som innehåller textsträngen användaren skriver in synas.
    Om fältet är tomt skall alla todos visas.


    Krav för väl godkänt (VG):

    Applikationen skall ha ett formulär där användaren kan fylla i sin todo.

    Det skall innehålla:
    - ett textfält där själva ärendet kan skrivas in
    - ett datumfält där ett sista datum för ärendet skall väljas, fältet skall ha dagens datum som defaultvärde
    - en selectbox där användaren kan välja vilken kategori ärendet tillhör. Du kan själv välja vilka kategorier som 
    skall finnas (t.ex. “hushållsarbete” eller “jobb”)
    - en “lägg till”-knapp
    - När användaren “skickar formuläret” (klickar på knappen) så skall ärendet läggas till i en todolista.

    Applikationen skall även ha en lista över redan inmatade todos.
    I listan skall man se själva ärendetexten, slutdatumet, kategorin för varje todo.
    Om slutdatumet är tidigare än dagens datum ska det finnas en grafisk varning som visar att slutdatumet är passerat.
    I listan över inmatade todos skall det också finnas en knapp för varje todo, 
    där användaren kan ta bort en todo ur listan.
    När användaren klickar på “ta bort”-knappen skall todo:n tas bort ur listan.

    Applikationen skall även ha ett fält som kan användas för att filtrera todos.
    När användaren skriver i fältet skall bara de todos som innehåller textsträngen användaren skriver in synas.
    Om fältet är tomt skall alla todos visas.

    Applikationen skall även ha en lista med radiobuttons, en för varje kategori, och en för “alla”.
    Om användaren klickar i en radiobutton skall bara ärenden för den kategorin visas.

    Om både en radiobutton är iklickad och fritextfältet har text skall båda användas.
    Filtrera först fram allt som är i en viss kategori, och gör sedan fritextfiltreringen baserat på det.

 */


const BOARD_HEIGHT = 15;

let activePlayer = 1;

const toDoListItems = {};

const movesMadeLabel = document.querySelector("#moves-made");
movesMadeLabel.textContent = "To Do List";

const table = document.querySelector("#game-table");
const tbody = document.createElement("tbody");

const gameInfoCell = document.querySelector("table thead tr th");
gameInfoCell.setAttribute("colspan", "3");

// create table cells
for (let y = 1; y <= BOARD_HEIGHT; y++) {

    const tableRow = document.createElement("tr");

    // make a button to delete this list item
    const deleteButton = document.createElement("td");
    deleteButton.classList.add('titleCell');
    tableRow.appendChild(deleteButton);

    // make a button to edit this item
    const editButton = document.createElement("td");
    editButton.classList.add('buttonCell');
    editButton.textContent = "time";
    tableRow.appendChild(editButton);

    // make a cell describing the task
    const deleteCell = document.createElement("td");
    deleteCell.classList.add('deleteCell');
    deleteCell.textContent = "X";
    tableRow.appendChild(deleteCell);

    tbody.appendChild(tableRow);
}

// make a cell to add
const lastTableRow = document.createElement("tr");
const addItemButtonCell = document.createElement("td");
addItemButtonCell.classList.add('addItemButtonCell');
addItemButtonCell.textContent = "+";
addItemButtonCell.setAttribute("colspan", "3");
lastTableRow.appendChild(addItemButtonCell);
tbody.appendChild(lastTableRow);

table.appendChild(tbody);


function clickCell(event) {

    const thisCell = event.currentTarget;

    // update cell appearance
    thisCell.classList.add("ownedByPlayer"+activePlayer);

    const coordinates = thisCell.getAttribute("id").match(/\d+/g);
    const clickedCell = { x: Number(coordinates[0]), y: Number(coordinates[1]), };


    activePlayer = (activePlayer === 1) ? 2 : 1;

}

function mouseEnterCell(event) {
    const thisCell = event.currentTarget;
    if (!(thisCell.classList.contains("ownedByPlayer1") || thisCell.classList.contains("ownedByPlayer2")))
        thisCell.classList.add("player"+activePlayer+"Mouseover");
}

