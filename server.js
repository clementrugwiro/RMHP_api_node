const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config(); // Load environment variables


const userroutes = require('./src/routes/user')
const authroutes = require('./src/routes/authroutes')
const team = require('./src/routes/teammates')
const contentRoutes = require("./src/routes/content");
const reviews =require('./src/routes/reviews')
const projects = require('./src/routes/projects')

const port = 3001

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userroutes)
app.use("/api", authroutes);
app.use("/api/team", team)
app.use("/api/content", contentRoutes);
app.use('/api/reviews',reviews)
app.use('/api/projects',projects)

app.get ('/', (req,res)=>{  
    res.send("The app is running correctly.")
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});