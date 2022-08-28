
const productController = require('../controllers/productController')



module.exports = function(app) {
    // Product
    app.route(`dashboard/product/list`)
        .get([],
            async(req, res) => {
                /*  #swagger.tags = ['list hosting product']
                #swagger.description = 'list hosting product'
                #swagger.security = [{
                    bearer: []
                }]
                #swagger.responses[200] = {
                    schema: { "$ref": "#/definitions/ResponseSuccess" },
                    description: "Successfully." }
                #swagger.responses[400] = {
                    schema: { "$ref": "#/definitions/BadRequest" },
                    description: "Bad Request." }
                #swagger.responses[401] = {
                    schema: { "$ref": "#/definitions/UnAuthorization" },
                    description: "UnAuthorization." }
                #swagger.responses[403] = {
                    schema: { "$ref": "#/definitions/Forbidden" },
                    description: "Forbidden." }
                #swagger.responses[404] = {
                    schema: { "$ref": "#/definitions/NotFound" },
                    description: "Not Found." } */
                    return res.json({ message: "Welcome to bezkoder application.123123" });
                return productController.getList(req, res)
            }
        )
        
    }