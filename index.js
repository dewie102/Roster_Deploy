// load up the env file
// process the contents of the file
// KEY=VALUE
// split each line's string
// Add the KEY
require("dotenv").config();
const express = require("express");
const studentsRouter = require("./routes/students");
const cors = require("cors");

const app = express();

/*
Telling the app (or express) to use json and urlencoded middleware
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* 
This is telling the app to use our studentsRouter
*/
app.use("/api/students", studentsRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening");
});

//console.log(process.env);
