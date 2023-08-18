import express from "express";

import {
    getProfileUsers,
    getProfileUsersFriends,
    addRemoveProfileUsersFriends
} from "../controllers/users.js";

import {verifyWebToken} from "../middleware/auth.js";

const router=express.Router();

router.get("/:id",verifyWebToken,getProfileUsers); //we can use this id and call our database with this particular id

router.get("/:id/friendId",verifyWebToken,getProfileUsersFriends); //will grab the user friends


//UPDATE (for update functions we use patch instead of get)
router.patch("/:id/:friendId",verifyWebToken,addRemoveProfileUsersFriends);

export default router;