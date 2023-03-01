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
        let criteria = {};
        for (const [key, value] of Object.entries(req.query)) {
            criteria[key] = value;
        }
        console.log(criteria);
        try {
            const obj = await searchServices.getServer(criteria);
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
    listPort: async (req, res) => {
        let criteria = {};
        for (const [key, value] of Object.entries(req.query)) {
            criteria[key] = value;
        }
        try {
            const obj = await searchServices.getPort(criteria);
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
    listVlan: async (req, res) => {
        let criteria = {};
        for (const [key, value] of Object.entries(req.query)) {
            criteria[key] = value;
        }
        try {
            const obj = await searchServices.getVlan(criteria);
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