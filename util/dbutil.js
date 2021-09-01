import Post from "../models/postModel.js";
import axios from "axios";

let posts = [];
let backupPosts = [];

export async function updateDB() {
  try {
    let dbPosts = await Post.find({});

    await Post.deleteMany({});

    for (let i = 0; i < dbPosts.length; i++) {
      if (dbPosts[i].updatedManually === true) {
        continue;
      } else {
        dbPosts[i] = posts[i];
      }
    }

    await Post.insertMany(dbPosts);

    console.log("Updated posts in DB");
    posts = [];
  } catch (err) {
    console.log(err);
    backupPosts = [...dbPosts];
  }
}

export async function fetchData() {
  try {
    const retries = 2;
    const myConfig = { timeout: 500 };

    for (let i = 1; i <= 50; i++) {
      if ((i - 1) % 5 === 0) {
        await sleep(1000);
        console.log("Got 5 posts from API");
      }
      for (let j = 0; j < retries; j++) {
        try {
          let response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${i}`,
            myConfig
          );
          if (response.status === 200) {
            posts.push(response.data);
            break;
          } else {
            console.log("Failed trying to fetch data, trying again");
          }
        } catch (error) {
          console.log("Cannot fetch data");
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function uploadToDB() {
  try {
    await Post.insertMany(posts);
    console.log("Uploaded 50 documents to DB");
    posts = [];
  } catch (err) {
    console.log(err);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
