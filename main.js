/*



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
    editButton.textContent = "E";
    tableRow.appendChild(editButton);

    // make a cell describing the task
    const deleteCell = document.createElement("td");
    deleteCell.classList.add('buttonCell');
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












