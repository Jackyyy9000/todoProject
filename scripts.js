const TODOS_STORAGE_KEY = "TODOS_STORAGE_KEY";

const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");

let todos = LoadTodos();
todos.forEach(RenderTodo);

//Handle submittion on form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoName = todoInput.value;
  if (todoName === "") return;

  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  };

  todos.push(newTodo);
  RenderTodo(newTodo);
  SaveTodo();

  todoInput.value = "";
});

//Handle if Todo is completed
list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.complete = e.target.checked;
  SaveTodo();
});

//Handle Todo deletion
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  todos = todos.filter((todo) => todo.id !== todoId);
  SaveTodo();
});

/* ---------- Rendering Todo BEGIN ---------- */

function RenderTodo(newTodo) {
  const templateClone = template.content.cloneNode(true);

  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = newTodo.id;

  const listText = templateClone.querySelector("[data-list-item-text]");
  listText.innerHTML = newTodo.name;

  const listCheckbox = templateClone.querySelector("[data-list-item-checkbox]");
  listCheckbox.checked = newTodo.complete;

  list.appendChild(templateClone);
}

//Saving Todos
function SaveTodo() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

//Loading Todos
function LoadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}
