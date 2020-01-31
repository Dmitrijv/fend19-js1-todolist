# FEND19 - JavaScript 1 - To Do List

![preview](/readme/todo2.jpg)

## Description

A simple To Do application that lets you add and remove tasks as well as filter the list of existing tasks by category
and description. Tasks that are overdue are highlighted in red.

ToDo list is saved in local storage and persists through browser shut down.

## Implementation

When the page is loaded for the first time todo list is loaded from localStorage.

```js
let toDoItems = JSON.parse(localStorage.getItem("todo"));
```

If no items are found in local storage an example list is loaded for the purpose of presenting the project.

```js
if (!toDoItems || Object.keys(toDoItems).length === 0) {
  toDoItems = {
    1: {
      task: "clean house",
      deadline: "2020-12-02",
      category: "Misc"
    },
```

New tasks can only be added if task description is not
empty

```js
function createNewTask() {
  // task description can't be empty
  const textInput = document.querySelector("#newTaskInput");
  if (textInput.value.length === 0) {
    textInput.focus();
    textInput.classList.replace("borderWhite", "borderRed");
    return;
  }
```

and deadline timestamp does not refer to a point of time in the past.

```js
// deadline can't be before current time
const dateInput = document.querySelector("#dateSelector");
if (dateInput.validity.valid === false) {
  dateInput.focus();
  return;
}
```

List of items is filtered by category and keyword if such was specified.

```js
function drawFilteredList(toDoItems) {
  const filterField = document.querySelector("#filterInput");
  const selectedCategory = document.querySelector('input [name="categoryInputGroup"]:checked').value;

  const filteredItems = [];

  for (const index in toDoItems) {
    const item = toDoItems[index];
    const isCorrectCategory = selectedCategory === "All" || selectedCategory === item["category"];
    const includesKeyword = item["task"].toLowerCase().includes(filterField.value.toLowerCase());
    if (isCorrectCategory && includesKeyword) filteredItems[index] = item;
  }

  drawTodoList(filteredItems);
}
```
