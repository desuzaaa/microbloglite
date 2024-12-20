"use strict";

const createPostForm = document.getElementById("createPostForm");
const logoutButton = document.getElementById("logoutButton");
const postsListContainer = document.getElementById("postsList");

// function that gets and display posts
async function getPosts() {
  const loginData = getLoginData();

  try {
    const response = await fetch("http://localhost:5005/api/posts", {
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const posts = await response.json();

    // clear existing posts (had to use innerHTML, innerText didnt capture what I wanted)
    postsListContainer.innerHTML = "";

    // filter posts to only show the logged-in user's posts
    const userPosts = posts.filter((post) => post.username === loginData.username);

    // sort posts by newest date
    userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // create and append post elements
    userPosts.forEach((post) => {
      const postElement = createPostElement(post);
      postsListContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    postsListContainer.innerHTML = '<p class="text-danger">Failed to load posts. Please try again later.</p>';
  }
}

// smaller function to create div HTML element
function createPostElement(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "card mb-3";

  // formatting the date
  const postDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// (had to use innerHTML, innerText didnt capture what I wanted)
  postDiv.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">@${post.username}</h5>
        <small class="date-text-color">${postDate}</small>
      </div>
      <p class="card-text">${post.text}</p>
    </div>
  `;

  return postDiv;
}

createPostForm.addEventListener("submit", async (event) => {
  // event listener for the form submission
  event.preventDefault();

  const loginData = getLoginData(); // Get the login data from local storage (token and username)
  const postContent = document.getElementById("postContent").value.trim();

  if (!postContent) { // check if the post content is empty
    alert("Post content cannot be empty!"); // if it is, alert the user that they cannot do post and it prevents
    return;
  }

  try {
    // send a POST request to the api with post content and the token
    const response = await fetch("http://localhost:5005/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify({ text: postContent }),
    });

    if (!response.ok) {
      // check if the response was bad, if not throw an error message
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    alert("Post created successfully!"); // if the post is created, tell the user it has been made
    createPostForm.reset(); // then reset the form to clear the text area


    getPosts();  // get and then display updated posts with the new post created 
  } catch (error) {
    console.error("Error creating post:", error); // if an error is caught, log it (thank you tim)
    alert("An error occurred while creating the post. Please try again.");
  }
});

function getLoginData() { // added in this js so i dont get vscode error
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}


// below is essentially the same process, but instead of a POST request, i did a GET request in a sense

document.addEventListener("DOMContentLoaded", async function () {
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
    console.log(userData);

    fullName.textContent = userData.fullName || "Full Name Not Provided";
    username.textContent = `@${userData.username}` || "@username";
    bio.textContent = userData.bio || "This user has not written a bio yet.";

    // fetch and display posts after loading user details
    getPosts();
  } catch (error) {
    console.error("Error fetching user details:", error);
    alert("Failed to load user details. Please try again.");
  }
});
