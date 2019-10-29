/*

Du skall med hjälp av HTML, CSS och Javascript göra ett fem-i-rad-spel.
Du skall skapa en HTML-sida, som när den visas i webbläsaren innehåller:
En rubrik med spelets namn (du kan välja ett eget namn om du vill)
Ett spelbräde.
Ett textfält (<p>-tagg) som berättar vems tur det är att göra ett drag, O eller X.
Ett textfält (<p>-tagg) som berättar hur många drag som har gjorts totalt.
Spelbrädet skall bestå av ett rutfält med knappar (<button>).
Det skall vara åtminstone 25 knappar i höjdled och 25 knappar i sidled stort.
Den spelare vars tur det är kan klicka på en knapp som inte redan blivit klickad på.
När spelaren gör det skall spelaren vars tur det är få sin markering på den knappen.
Om det är X tur att klicka, så kan denne alltså klicka på en knapp, som då får markeringen “X”.
Då går turen över till O.
När en knapp väl blivit klickad på så skall det inte hända något om någon av spelarna klickar på den igen.
Du får styla spelet på vilket sätt du själv vill.

Krav för godkänt:

Du kan skapa spelbrädet som du vill, antingen genom att skriva HTML, eller skapa elementen med Javascript.
Ditt program skall hålla reda på vems tur det är, och hur många drag som har gjorts sammanlagt.
Detta skall visas i varsitt textfält (<p>-tagg).
Du kan använda bokstäverna O och X som märken för kryss och cirkel.
Du ska ha använt minst 4 CSS-klasser när du har stylat spelet. Varje klass måste innehålla minst en deklaration.


Krav för väl godkänt:

Minst uppfyllt kraven för godkänt.
Du måste ha skapat själva spelbrädet (alltså knapparna) med hjälp av Javascript.
Du skall ha en eller flera variabler som gör att du kan ändra på antal rutor på spelbrädet.
Märkena, alltså X och O, skall antingen vara stylade med en färg,
eller använda en emoji istället för text (t.ex. ❌ ⭕️, eller annan valfri om du tycker det är roligare),
eller använda sig av en bild av något slag.
Varje gång en spelare gjort ett drag skall ditt program kontrollera om någon av spelarna har vunnit
(alltså fått minst 5 symboler i rad horisontellt, vertikalt eller diagonalt).
Om någon av spelarna har vunnit skall detta presenteras i ett eget textfält, och det skall inte gå att spela vidare.

 */

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 20;
const WINNING_LINE_LENGTH = 5;

const PLAYER_INFO = {
    1:{
        name: "RED",
        marker: "X",
        cells: [],
    },
    2:{
        name: "BLUE",
        marker: "O",
        cells: [],
    },
};

let activePlayer = 1;

function clearBoard() {
    for (let playerID of Object.keys(PLAYER_INFO))
        clearPlayerCells(PLAYER_INFO[playerID]["cells"]);
}

function clearPlayerCells(cells) {
    for (let i = 0; i < cells.length; i++) {
        const cell = document.querySelector("#cell-"+cells[i].x+"-"+cells[i].y);
        cell.classList.remove("ownedByPlayer1", "ownedByPlayer2");
        cell.textContent = "";
    }
    cells.length = 0;
}

function countAllClickedCells() {
    return Object.keys(PLAYER_INFO).reduce((sum, playerId) => {return sum + PLAYER_INFO[playerId]["cells"].length},0);
}

const movesMadeLabel = document.querySelector("#moves-made");
function updateMovesMadeLabel(movesMade) {
    if(movesMade === 0)
        movesMadeLabel.textContent = "Five In A Row"; // +BOARD_HEIGHT+"x"+BOARD_WIDTH;
    else if (movesMade === 1)
        movesMadeLabel.textContent = movesMade+" move made";
    else
        movesMadeLabel.textContent = movesMade+" moves made";
}
updateMovesMadeLabel(countAllClickedCells());



const p1TurnSpan = document.querySelector("#player1Turn");
p1TurnSpan.classList.add("player1Status", "inactive");
p1TurnSpan.innerText = "Reds turn";

const p2TurnSpan = document.querySelector("#player2Turn");
p2TurnSpan.classList.add("player2Status", "inactive");
p2TurnSpan.innerText = "Blues turn";

function updateTurnLabel(activePlayer) {
    if (activePlayer === 1){
        p1TurnSpan.classList.remove("inactive");
        p2TurnSpan.classList.add("inactive");
    } else if (activePlayer === 2) {
        p1TurnSpan.classList.add("inactive");
        p2TurnSpan.classList.remove("inactive");
    }
}
updateTurnLabel(activePlayer);



const table = document.querySelector("#game-table");
const tbody = document.createElement("tbody");

const gameInfoCell = document.querySelector("table thead tr th");
gameInfoCell.setAttribute("colspan", BOARD_WIDTH+"");

// create table cells
for (let y = 1; y <= BOARD_HEIGHT; y++) {
    const tableRow = document.createElement("tr");
    for (let x = 1; x <= BOARD_WIDTH; x++) {
        const tableCell = document.createElement("td");
        tableCell.setAttribute("id", "cell-"+x+"-"+y);
        tableCell.addEventListener('click', clickCell);
        tableCell.addEventListener('mouseenter', mouseEnterCell);
        tableCell.addEventListener('mouseleave', mouseLeaveCell);
        tableRow.appendChild(tableCell);
    }
    tbody.appendChild(tableRow);
}
table.appendChild(tbody);


function clickCell(event) {

    const thisCell = event.currentTarget;

    // cell is already owned by a player
    if (thisCell.classList.contains("ownedByPlayer1") || thisCell.classList.contains("ownedByPlayer2"))
        return;

    thisCell.classList.remove("player1Mouseover", "player2Mouseover");

    // update cell appearance
    thisCell.textContent = PLAYER_INFO[activePlayer]['marker'];
    thisCell.classList.add("ownedByPlayer"+activePlayer);

    const coordinates = thisCell.getAttribute("id").match(/\d+/g);
    const clickedCell = { x: Number(coordinates[0]), y: Number(coordinates[1]), };

    PLAYER_INFO[activePlayer]["cells"].push(clickedCell);

    // if someone won congratulate winner and clear board
    if (hasPlayerWon(clickedCell, activePlayer) === true){
        alert(PLAYER_INFO[activePlayer]["name"] + " wins !!!");
        clearBoard();

    // if all cells on the board have been clicked it's a draw
    } else if (countAllClickedCells() === (BOARD_WIDTH*BOARD_HEIGHT)){
        alert("Draw !!!");
        clearBoard();
    }

    activePlayer = (activePlayer === 1) ? 2 : 1;

    updateTurnLabel(activePlayer);
    updateMovesMadeLabel(countAllClickedCells());

}

function mouseEnterCell(event) {
    const thisCell = event.currentTarget;
    if (!(thisCell.classList.contains("ownedByPlayer1") || thisCell.classList.contains("ownedByPlayer2")))
        thisCell.classList.add("player"+activePlayer+"Mouseover");
}

function mouseLeaveCell(event) {
    event.currentTarget.classList.remove("player1Mouseover", "player2Mouseover");
}



function hasPlayerWon(clickedCell, activePlayer) {

    const ownedCells = PLAYER_INFO[activePlayer]['cells'];

    if (countHorizontalNeighbors(clickedCell) >= WINNING_LINE_LENGTH-1)
        return true;
    else if (countVerticalNeighbors(clickedCell) >= WINNING_LINE_LENGTH-1)
        return true;
    else if (countRightDiagonalNeighbors(clickedCell) >= WINNING_LINE_LENGTH-1)
        return true;
    else if (countLeftDiagonalNeighbors(clickedCell) >= WINNING_LINE_LENGTH-1)
        return true;
    return false;


    function countVerticalNeighbors(clickedCell) {
        return consecutiveCells(clickedCell, getNeighbourN) + consecutiveCells(clickedCell, getNeighbourS);
    }

    function countHorizontalNeighbors(clickedCell) {
        return consecutiveCells(clickedCell, getNeighbourW) + consecutiveCells(clickedCell, getNeighbourE);
    }
    
    function countRightDiagonalNeighbors(clickedCell) {
        return consecutiveCells(clickedCell, getNeighbourNE) + consecutiveCells(clickedCell, getNeighbourSW);
    }

    function countLeftDiagonalNeighbors(clickedCell) {
        return consecutiveCells(clickedCell, getNeighbourNW) + consecutiveCells(clickedCell, getNeighbourSE);
    }

    function consecutiveCells(clickedCell, neighbourDirectionCheck) {

        let neighbours = 0;
        const pointerCell = {x: clickedCell.x, y: clickedCell.y};
        const maxDistance = Math.max(BOARD_WIDTH, BOARD_HEIGHT);

        while (neighbours < maxDistance){
            const neighbourCell = neighbourDirectionCheck(pointerCell);
            if (neighbourCell){
                neighbours++;
                pointerCell.x = neighbourCell.x;
                pointerCell.y = neighbourCell.y;
            } else {
                break;
            }
        }

        return neighbours;
    }
    
    function getNeighbourN(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y-1 === cell.y && neighbor.x === cell.x);
    }

    function getNeighbourNE(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y-1 === cell.y && neighbor.x+1 === cell.x);
    }

    function getNeighbourE(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y === cell.y && (neighbor.x-1) === cell.x);
    }

    function getNeighbourSE(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y+1 === cell.y && (neighbor.x+1) === cell.x);
    }

    function getNeighbourS(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y+1 === cell.y && neighbor.x === cell.x);
    }

    function getNeighbourSW(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y+1 === cell.y && neighbor.x-1 === cell.x);
    }

    function getNeighbourW(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y === cell.y && ((neighbor.x+1) === cell.x));
    }

    function getNeighbourNW(cell) {
        return ownedCells.find(( neighbor ) => neighbor.y-1 === cell.y && neighbor.x-1 === cell.x);
    }

}










