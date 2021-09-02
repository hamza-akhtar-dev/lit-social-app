const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Read User
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Update User
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.admin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        try {
            await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Account has been updated!");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can update only your account!");
    }
})

//Delete User
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.admin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted!");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can delete only your account!");
    }
})

//Follow User
router.put("/:id/follow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!currentUser.following.includes(req.params.id)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("User has been followed!");
            }
            else {
                res.status(403).json("You already follow this user!");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You cannot follow yourself!");
    }
})

//Unfollow User
router.put("/:id/unfollow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (currentUser.following.includes(req.params.id)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("User has been unfollowed!");
            }
            else {
                res.status(403).json("You already unfollowed this user!");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You cannot unfollow yourself!");
    }
})

module.exports = router;