const productServices = require('./../services/productServices')

module.exports = {
    getList: async (req, res) => {
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const keyword = req.query.keyword ? decodeURIComponent(req.query.keyword) : null;
        const criteria = {};
        if (keyword) {
            criteria.keyword = keyword;
        }
        criteria['page'] = page;
        criteria['limit'] = limit;

        const data = await productServices.getList(criteria);
        const response = {
            status: 1,
            code: 200,
            message: 'success',
            data: data ?? []
        }

        return res.json(response)
    },
    createHosting: async (req, res) => {
        const data = await productServices.createHosting(req.body.body);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'Create'
        }
        response.code = data.code;
        response.message = data.msg;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    },
    deleteHosting: async (req, res) => {
        const hostingId = req.params.hostingId;
        const data = await productServices.deleteHosting(hostingId);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'Delete'
        }
        response.code = data.code;
        response.message = data.msg;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    }
}
