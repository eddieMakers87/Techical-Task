let API = "http://localhost:8000/posts";
let API_USERS = "http://localhost:8000/profile";

//! регистрация
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");
let first = document.querySelector(".remFirst");
let second = document.querySelector(".remSecond");

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
