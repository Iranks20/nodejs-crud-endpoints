const cors=require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/key.config');
// create express app
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// Set JWT_SECRET environment variable
process.env.JWT_SECRET = keys.JWT_SECRET;
// Setup server port
const port = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.use(cors())

//making cors available for different servers
// const cors = require('cors');
// app.use(cors({
//     origin: ['https://www.section.io', 'https://www.google.com/']
// }));
// Load environment variables from .env file


app.get('/api/v3/signup', (req, res) => {
  res.send("Hello World");
  
});
// user signup with jwt
const authRoutes = require('./src/routes/auth.routes')
app.use('/api/v3', authRoutes)


// Require incidence routes
const incidenceRoutes = require('./src/routes/incidence.routes')
// using as middleware
app.use('/api/v1/incidences', incidenceRoutes)

// Require reporters routes
const reporterRoutes = require('./src/routes/reporter.routes')
// // using as middleware
app.use('/api/v1/reporters', reporterRoutes)

// login details
const loginRoutes = require('./src/routes/login.routes')
app.use('/api/v1/login', loginRoutes)

// Require users routes
const usersRoutes = require('./src/routes/users.routes')
// // using as middleware
app.use('/api/v2/users', usersRoutes)

const appusersRoutes = require('./src/routes/appuserslogin.routes')
app.use('/api/v1/reporters', appusersRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});