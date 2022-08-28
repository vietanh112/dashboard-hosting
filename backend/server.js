require('dotenv').config();
const express = require('express')

express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

const cors = require("cors");
const app = express();
const path = require('path')
const fs = require('fs')

const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 3000
const prefixPath = process.env.PREFIX_PATH || '/';

//
const productController = require('./modules/controllers/productController')

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//joining path of directory
const directoryModulesPath = path.join(__dirname, 'modules')
// routes grouping
app.prefix(`${prefixPath}`, function (appGroup) {
    fs.readdir(directoryModulesPath, function (err, modules) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err)
        }
        //listing all files using forEach
        const moduleRoutes = require(`./modules/routes/routes.js`);
        moduleRoutes(appGroup);
    });
})

//Routes

app.route(`/dashboard/product/list`).get([], async(req, res) => {
    return productController.getList(req, res);
})
app.route(`/dashboard/product/create`).post([], async(req, res) => {
    return productController.createHosting(req, res);
})
app.route(`/dashboard/product/:hostingId/delete`).delete([], async(req, res) => {
    return productController.deleteHosting(req, res);
})