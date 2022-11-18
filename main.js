let API = "http://localhost:8000/posts";
let API_USERS = "http://localhost:8000/profile";

//! регистрация
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");
let first = document.querySelector(".remFirst");
let second = document.querySelector(".remSecond");

// ! CRUD
let inp = document.querySelector(".inp");
let image = document.querySelector("#image");
let btnAdd = document.querySelector("#btn-add");
let text = document.querySelector("#post");

// ? инпуты из модалки
let editTitle = document.querySelector("#edit-title");
let editPrice = document.querySelector("#edit-price");
let editDescr = document.querySelector("#edit-descr");
let editImage = document.querySelector("#edit-image");
let editSaveBtn = document.querySelector("#btn-save-edit");
let exampleModal = document.querySelector("#exampleModal");

// ? блок куда добавятся карточки из функции render
let list = document.querySelector("#products-list");

submit.addEventListener("click", async () => {
  let obj = {
    username: username.value,
    password: password.value,
  };

  if (!obj.username.trim() || !obj.password.trim()) {
    alert("fill the form field");
    return;
  }
  console.log(obj);
  await fetch(API_USERS, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json",
    },
  }).then(() => alert("Пользователь добавлен"));
});

// ! ADD - Обработчик событий на добавление
btnAdd.addEventListener("click", async function () {
  // собираем обьект для добавления в дб.жсон
  let obj = {
    text: text.value,
    image: image.value,
  };

  // проверим - создается ли он
  // console.log(obj);

  if (!obj.text.trim() || !obj.image.trim()) {
    alert("Заполните все поля");
    return;
  }

  // ! запрос на добавление

  await fetch(API, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json",
    },
  });

  text.value = "";
  image.value = "";

  render();
});

// `${API}?q=${searchVal}&_page=${currentPage}&_limit=3`
// ! отображение из json-server
async function render() {
  let products = await fetch(API)
    .then((res) => res.json())
    .catch((err) => console.log(err)); // отловим ошибку
  //drawPaginationButtons();

  list.innerHTML = "";
  products.forEach((element) => {
    let newElem = document.createElement("div");
    newElem.id = element.id;
    newElem.innerHTML = `
      <div class="card m-5" style="width: 18rem;">
      <img src=${element.image} class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">${element.text}</p>
        <a href="#" id=${element.id} class="btn btn-danger btn-delete">DELETE</a>
        <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${element.id} class="btn btn-dark btn-edit">EDIT</a>
        <a href="#" id=${element.id} class="btn btn-warning btn-cart">🛒</a>
      </div>
    </div>`;
    list.append(newElem);
  });
}
render();
