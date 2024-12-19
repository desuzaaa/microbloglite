/* Posts Page JavaScript */
"use strict";

const main = document.querySelector("main");

function getLoginData() { // added from auth.js so i wouldnt get errors in vscode
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}


async function getPosts() {
  const loginData = getLoginData(); // get the token from auth.js (putting this here so i dont forget)

  try {
    const response = await fetch("http://localhost:5005/api/posts", { // makes requests to api to get these posts
      headers: { Authorization: `Bearer ${loginData.token}` },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`); // if its not successful, throws error with status
    }

    const posts = await response.json(); // parses the response body as json and then assigns it to the posts variable
    posts.forEach((post) => showPostCards(post)); // goes over each post and tells showpostcards function to display it
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}

function showPostCards(post) { // creates the cards
  const card = document.createElement("div");
  card.className = "card mb-3";

  const username = document.createElement("h5");
  username.className = "card-title";
  username.textContent = post.username;

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = post.text;

  const timestamp = document.createElement("small");
  timestamp.className = "text-muted";
  timestamp.textContent = new Date(post.createdAt).toLocaleString();

  const contentDiv = document.createElement("div");
  contentDiv.className = "card-body";
  contentDiv.append(username, text, timestamp);

  card.append(contentDiv); 

  const postsContainer = document.getElementById("postsContainer");
  if (postsContainer) {
    postsContainer.append(card); 
  }
}



document.addEventListener("DOMContentLoaded", getPosts); // load the posts on page load