const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();
dotenv.config();

//Connecting MongoDB cloud database
mongoose.connect(process.env.MONGO_URL, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, () => 
    {
        console.log("MongoDB connected!")
    })

//MiddleWare
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//Started Listening
app.listen(8800, () => {
    console.log("Backend server is running!");
});


