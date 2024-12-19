"use strict";

const createPostForm = document.getElementById("createPostForm");
const logoutButton = document.getElementById("logoutButton");

createPostForm.addEventListener("submit", async (event) => { // adds an event listener to the form for when the user submits a new post
  event.preventDefault(); // reloads the page

  const loginData = getLoginData();
  const postContent = document.getElementById("postContent").value.trim(); // gets and trims the content entered by the user

  if (!postContent) {
    alert("Post content cannot be empty!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5005/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify({ text: postContent }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post"); // if the post content is empty, shows an alert and prevents from posting
    }

    alert("Post created successfully!");
    createPostForm.reset();

    // GET POSTS AGAIN AFTER SHOWING
    getPosts(); // this HOPEFULLY SHOULD UPDATE THE POSTS
  } catch (error) {
    console.error("Error creating post:", error);
    alert("An error occurred while creating the post. Please try again.");
  }
});

function getLoginData() {
  // added from auth.js so i wouldnt get errors in vscode
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}



document.addEventListener("DOMContentLoaded", async function () { // THIS DYNAMICALLY updates the user's profile card
  const fullName = document.getElementById("fullName");
  const username = document.getElementById("username");
  const bio = document.getElementById("bio");

  const loginData = getLoginData();

  try {
    const response = await fetch(`http://localhost:5005/api/users/${loginData.username}`, {
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user details: ${response.status}`);
    }

    const userData = await response.json(); 
    console.log(userData); // DEBUGGING THIS

    fullName.textContent = userData.fullName || "Full Name Not Provided";
    username.textContent = `@${userData.username}` || "@username";
    bio.textContent = userData.bio || "This user has not written a bio yet.";
  } catch (error) {
    console.error("Error fetching user details:", error);
    alert("Failed to load user details. Please try again.");
  }
});
