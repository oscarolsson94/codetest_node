import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import schedule from "node-schedule";
import postRoutes from "./routes/posts.js";
import { updateDB, fetchData, uploadToDB } from "./util/dbutil.js";

dotenv.config();

let initialRun = true;

const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/posts", postRoutes); //default path for all routes

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

//run once per hour, change to ("* * * * *") for once per minute
schedule.scheduleJob("0 * * * *", async () => {
  if (initialRun) {
    await fetchData();
    await uploadToDB();
    initialRun = false;
  } else {
    await fetchData();
    await updateDB();
  }
});
