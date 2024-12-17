/* Posts Page JavaScript */
"use strict";
let logoutButton = document.querySelector("#logoutButton") // <-- logout button to redirect to login page
logoutButton.addEventListener("click", (event) => {
  logout();
});