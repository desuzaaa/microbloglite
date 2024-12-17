// "use strict"

// async function register(userData) {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   };

//   return fetch("http://localhost:5005/api/users", options)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.message === "User created successfully") {
//         alert("Registration successful! Redirecting to Login page.");
//         window.location.assign("index.html");
//       } else {
//         alert(data.message || "An error occurred. Please try again.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error during registration:", error);
//       alert("Failed to register. Please try again later.");
//     });
// }

// const registrationForm = document.querySelector("#registrationForm");

// registrationForm.onsubmit = function(event) {
//     console.log("register");
//     localStorage.setItem("register")
//   event.preventDefault();

//   const username = document.querySelector("#username").value;
//   const password = document.querySelector("#password").value;
//   const confirmPassword = document.querySelector("#confirmPassword").value;

//   if (password !== confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

//   const newUser = {
//     username: username,
//     password: password,
//   };

//   register(newUser);
// };

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
