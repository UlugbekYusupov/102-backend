const token = localStorage.getItem("token");

if (token === "undefined" || token === null) {
  window.location.href = "/index.html";
}
