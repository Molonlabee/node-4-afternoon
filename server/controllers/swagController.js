const swag = require('../models/swag');
const swagController = require('./controller/swagController');


module.exports = {
    read: (req, res, next) => {
        res.status(200).send(swag);
    }
};

app.get("/api/swag", swagController.read);