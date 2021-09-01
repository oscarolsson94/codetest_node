import express from "express";
import { updateUserWithId } from "../controllers/posts.js";

const router = express.Router();

/* "/api/posts" is common path for all enpoints */

router.patch("/:userId/:id", updateUserWithId);

export default router;
