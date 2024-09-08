let myArr = JSON.parse(localStorage.getItem("myArr"));
const inputEl = document.querySelector(".inputEl");
const AddBtn = document.querySelector(".addbtn");
const DivEl = document.querySelector(".container");
const DivTodo = document.querySelector(".myTodos");
const warn = document.querySelector(".warning");
const clearBtn = document.querySelector(".btn-div");

if (myArr === null) {
  myArr = [];
}

render();

if (myArr.length === 0) {
  clearBtn.style.display = "none";
}

AddBtn.addEventListener("click", function () {
  if (!inputEl.value) {
    warn.style.display = "block";
    warn.textContent = "Text box cannot be empty";
    warn.style.color = "red";
  } else {
    myArr.push({
      title: inputEl.value,
      id: Math.random(),
    });
    warn.style.display = "block";
    warn.textContent = "Text added succesfully";
    warn.style.color = "green";
  }

  if (myArr.length > 0) {
    clearBtn.style.display = "flex";
  }
  render();
  saveToLocalStorage();
});

clearBtn.addEventListener("click", () => {
  myArr = [];
  clearBtn.style.display = "none";
  render();
  saveToLocalStorage();
});

function render() {
  DivTodo.innerText = "";

  myArr.forEach((todo) => {
    let myDiv = document.createElement("div");
    DivTodo.appendChild(myDiv);
    myDiv.classList.add("myDiv");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    myDiv.append(checkBox);
    checkBox.id = todo.id;
    checkBox.onchange = change;

    let para = document.createElement("p");
    para.textContent = todo.title;
    myDiv.append(para);
    para.classList.add("para");
    inputEl.value = "";

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", deleteTodo);
    myDiv.appendChild(deleteBtn);
    deleteBtn.id = todo.id;
    deleteBtn.classList.add("deleteBtn");
    warn.style.display = "none";
  });
}

function deleteTodo(e) {
  const deleteBtn = e.target.id;
  myArr = myArr.filter((todo) => {
    if (todo.id != deleteBtn) return todo;
  });
  console.log(myArr);
  render();
  saveToLocalStorage();
}

function change(e) {
  const checkBox = e.target.id;
  const myDiv = e.target.parentNode;
  const para = myDiv.querySelector("p");
  myArr.filter((todo) => {
    if (checkBox == todo.id) {
      para.classList.toggle("line");
    }
  });
}

function saveToLocalStorage() {
  localStorage.setItem("myArr", JSON.stringify(myArr));
}
