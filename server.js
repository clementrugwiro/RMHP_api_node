const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const swaggerDocument = YAML.load('./documentation/swagger.yaml'); // Path to your YAML file
const bodyParser = require("body-parser");
require('dotenv').config(); // Load environment variables



const userroutes = require('./src/routes/user')
const authroutes = require('./src/routes/authroutes')
const team = require('./src/routes/teammates')
const contentRoutes = require("./src/routes/content");
const reviews =require('./src/routes/reviews')
const projects = require('./src/routes/projects')
const contact = require('./src/routes/contact')
const contactus = require('./src/routes/contactus')
const jobs = require('./src/routes/jobs')

const port = 3001

const app = express();



// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/user', userroutes)
app.use("/api", authroutes);
app.use("/api/team", team)
app.use("/api/content", contentRoutes);
app.use('/api/reviews',reviews)
app.use('/api/projects',projects)
app.use('/api/contact', contact)
app.use("/api",contactus)
app.use("/api/jobs",jobs)

app.get ('/', (req,res)=>{  
    res.send("The app is running correctly.")
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});