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

const toDoItems = [
    "Clean house",
    "Make dinner",
    "make a todo list",
];



function listItems(itemList) {

    const newList = document.createElement("tbody");
    newList.setAttribute("id","todo-table-body")

    itemList.forEach(function (task, index) {
        
        const tr = document.createElement("tr");

        const tdDate = document.createElement("td");
        tdDate.textContent = "2019-11-01";
        tr.appendChild(tdDate);

        const tdTask = document.createElement("td");
        tdTask.textContent = `${index+1}. ${task}`;
        tr.appendChild(tdTask);

        const tdCategory = document.createElement("td");
        tdCategory.textContent = 'misc';
        tr.appendChild(tdCategory);

        const tdDelete = document.createElement("td");
        tdDelete.textContent = '🗑️';
        tr.appendChild(tdDelete);

        newList.appendChild(tr);

    });

    const oldList = document.querySelector("#todo-table-body");
    document.querySelector("#todo-table").replaceChild(newList, oldList);

}

listItems(toDoItems);

const filterField = document.querySelector('#filter');
filterField.addEventListener('input', function (event) {
    const filteredItems = toDoItems.filter(function (item) {
        return item.toLowerCase().includes(
            event.currentTarget.value.toLowerCase()
        );
    });
    listItems(filteredItems);
})

