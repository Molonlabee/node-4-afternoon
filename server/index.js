require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require('./middleWares/checkForSession');
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');

const app = express();

let {SERVER_PORT, SESSION_SECRET} = process.env;

//MIDDLEWARE
app.use(express.json());
app.use(
   session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

//ENDPOINTS

//swag
app.get("/api/swag/", swagController.read);
//auth
app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.signout);
//cart
app.post('/api/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);
//search
app.get('/api/search', searchController.search);

app.listen(SERVER_PORT, () => {
    console.log(`server listening on port ${SERVER_PORT}.`);
});