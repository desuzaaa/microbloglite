// "use strict"

const fullName = document.querySelector("#fullName")
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

async function createUser(event) {
  event.preventDefault();
  let signUpData = {
    fullName: fullName.value.trim(),
    username: username.value.trim(),
    password: password.value.trim(),
    
  };

   

  try {
    let promise = fetch("http://localhost:5005/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);

  } catch (error) {
    console.error("Error code", error.message);
  }
  window.location.assign("index.html");
}
