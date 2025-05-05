const form = document.createElement("form");
form.classList.add("form");

const heading = document.createElement("h3");
const headings = ["Sign Up", "Login"];
heading.textContent = headings[0];

form.appendChild(heading);

const labels = ["Username", "Email", "Password"];
const types = ["text", "email", "password"];

function createLabel(index) {
  const label = document.createElement("label");
  label.textContent = labels[index];
  label.classList.add("label");
  return label;
}

function createInput(index) {
  const input = document.createElement("input");
  input.type = types[index];
  input.name = labels[index].toLowerCase();
  input.placeholder = `Enter your ${labels[index].toLowerCase()}...`;
  input.classList.add("input");
  return input;
}

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.classList.add("submitButton");
submitButton.textContent = headings[0];

for (let i = 0; i < labels.length; i++) {
  form.appendChild(createLabel(i));
  form.appendChild(createInput(i));
}

const textContents = [
  "Already have an account? Login",
  "Don't have an account? Sign up",
];

const toggleButton = document.createElement("button");
toggleButton.textContent = textContents[0];
toggleButton.style.backgroundColor = "transparent";
toggleButton.style.border = "none";
toggleButton.style.marginTop = "10px";
toggleButton.style.color = "blue";
toggleButton.type = "button";

form.appendChild(submitButton);
form.appendChild(toggleButton);

form.addEventListener("submit", handleSubmit);
toggleButton.addEventListener("click", handleToggle);

let isLogin = false;
function handleToggle() {
  isLogin = !isLogin;
  const labels = document.querySelectorAll("label");
  const inputs = document.querySelectorAll("input");

  if (isLogin) {
    labels.forEach((label) => {
      if (label.textContent == "Username") {
        label.style.display = "none";
      }
    });
    inputs.forEach((input) => {
      if (input.name == "username") {
        input.style.display = "none";
      }
    });
    heading.textContent = headings[1];
    toggleButton.textContent = textContents[1];
    submitButton.textContent = headings[1];
  } else {
    labels.forEach((label) => {
      if (label.textContent == "Username") {
        label.style.display = "flex";
      }
    });
    inputs.forEach((input) => {
      if (input.name == "username") {
        input.style.display = "flex";
      }
    });
    heading.textContent = headings[0];
    toggleButton.textContent = textContents[0];
    submitButton.textContent = headings[0];
  }
}

function handleSignup() {
  const inputs = document.querySelectorAll("input");
  let user = {};
  inputs.forEach((input, index) => {
    user[labels[index].toLowerCase()] = input.value;
  });

  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => appendRow(data.user));

  inputs.forEach((input) => {
    input.value = "";
  });
}

function handleLogin() {
  const inputs = document.querySelectorAll("input");
  let user = {};

  inputs.forEach((input, index) => {
    if (input.name === "email" || input.name === "password") {
      user[labels[index].toLowerCase()] = input.value;
    }
  });

  if (user.email === "" || user.password === "") {
    alert("Fill all required fields!");
    return;
  }

  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/dashboard.html";
      } else {
        alert("Email or password incorrect!");
        return;
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
    });

  inputs.forEach((input) => {
    input.value = "";
  });
}

function handleSubmit(event) {
  event.preventDefault();
  if (isLogin) {
    handleLogin();
  } else {
    handleSignup();
  }
}

function getAllUsers() {
  fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => createTbody(data));
}

document.body.appendChild(form);
getAllUsers();

const table = document.createElement("table");
createTable();

function createTable(users = []) {
  table.style.border = "1px solid black";
  table.style.borderCollapse = "collapse";
  document.body.appendChild(table);
  createThead();
  createTbody(users);
}

function createThead() {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  tr.style.border = "1px solid black";

  labels.forEach((label) => {
    const th = document.createElement("th");
    th.style.border = "1px solid black";
    th.textContent = label;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);
}

const tbody = document.createElement("tbody");

function createTbody(users) {
  users.forEach((user) => {
    appendRow(user);
  });
}

function appendRow(user) {
  const tr = document.createElement("tr");
  const values = Object.values(user);
  for (let i = 0; i < values.length; i++) {
    const td = document.createElement("td");
    td.style.border = "1px solid black";
    td.textContent = values[i];
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
table.appendChild(tbody);
