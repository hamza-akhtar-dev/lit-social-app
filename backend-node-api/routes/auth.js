const router =  require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async(req, res) => {
    try{
        //Creating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Creating a new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        //Saving the new user in database
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async(req, res) => {
    try{
        //Searching for the user
        const user =  await User.findOne({ email:req.body.email });
        !user && res.status(404).json("User not found!");

        //Checking for validity of the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Password not valid!");
        
        //Responding with user object
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});  

module.exports = router;