const searchServices = require('./../services/searchServices')

module.exports = {
    getList: async (req, res) => {
        const type = req.query.type ?? null;
        try {
            const obj = await searchServices.getList(type);
            const response = {
                status: obj.status,
                code: obj.code,
                message: obj.msg,
                data: obj.data ?? []
            }
            return res.json(response)
        } catch (error) {
            return res.json({
                status: 0,
                code: 204,
                message: "Failed",
                data: []
            })
        }
    },
    listServer: async (req, res) => {
        const keyword = req.query.keyword ?? null;
        try {
            const obj = await searchServices.getServer(keyword);
            const response = {
                status: obj.status,
                code: obj.code,
                message: obj.msg,
                data: obj.data ?? []
            }
            return res.json(response)
        } catch (error) {
            return res.json({
                status: 0,
                code: 204,
                message: "Failed",
                data: []
            })
        }
    }
}