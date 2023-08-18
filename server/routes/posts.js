import express from 'express';
import { getFeedPosts,getUserPosts,getLikePosts } from '../controllers/posts.js';
import { verifyWebToken } from '../middleware/auth.js';

const router=express.Router();

// Read

router.get("/",verifyWebToken,getFeedPosts);  //will grab the user feed on home page
router.get("/:userId/posts",verifyWebToken,getUserPosts);  //because we want to grab specific user post




// Update
router.patch("/:id/like",verifyWebToken,getLikePosts);

export default router;