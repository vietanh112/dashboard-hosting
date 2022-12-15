const productServices = require('./../services/productServices')

module.exports = {
    getList: async (req, res) => {
        const criteria = {};
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        for (const [key, value] of Object.entries(req.query)) {
            if(key != 'page' && key != 'limit') {
                if(key == 'id') {
                    criteria[key] = Number(value);
                }
                else {
                    criteria[key] = value;
                }
            }
        }
        const data = await productServices.getList(criteria, page, limit);
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
    },
    updateHosting: async (req, res) => {
        const hostingId = req.params.hostingId;
        const body = await req.body.body;
        const data = await productServices.updateHosting(body, hostingId);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'update'
        }
        response.code = data.code;
        response.message = data.msg;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    },
    getListVlan: async (req, res) => {
        let criteria = {};
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const type = req.query.type ? req.query.type : '';
        for (const [key, value] of Object.entries(req.query)) {
            if(key != 'page' && key != 'limit' && key != 'type') {
                if(key == 'id') {
                    criteria[key] = Number(value);
                }
                else {
                    criteria[key] = value;
                }
            }
        }
        const obj = await productServices.getListVlan(criteria, page, limit, type);
        const response = {
            status: obj.status,
            code: obj.code,
            message: obj.msg,
            data: obj.data ?? []
        }

        return res.json(response)
    },
    updateVlan: async (req, res) => {
        const vlanId = req.params.vlanId;
        const body = await req.body.body;
        const data = await productServices.updateVlan(body, vlanId);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'update'
        }
        response.code = data.code;
        response.message = data.msg;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    },
    deleteVlan: async (req, res) => {
        const vlanId = req.params.vlanId;
        const data = await productServices.deleteVlan(vlanId);
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
    },
    createVlan: async (req, res) => {
        const data = await productServices.createVlan(req.body.body);
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

    //SERVER
    getListServer: async (req, res) => {
        let criteria = {};
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const type = req.query.type ? req.query.type : '';
        for (const [key, value] of Object.entries(req.query)) {
            if(key != 'page' && key != 'limit' && key != 'type') {
                if(key == 'id') {
                    criteria[key] = Number(value);
                }
                else {
                    criteria[key] = value;
                }
            }
        }
        const obj = await productServices.getListServer(criteria, page, limit, type);
        const response = {
            status: obj.status,
            code: obj.code,
            message: obj.msg,
            data: obj.data ?? []
        }
        return res.json(response)
    },
    deleteServer: async (req, res) => {
        const serverId = req.params.serverId;
        const data = await productServices.deleteServer(serverId);
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
    },
    createServer: async (req, res) => {
        const data = await productServices.createServer(req.body.body);
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
    updateServer: async (req, res) => {
        const serverId = req.params.serverId;
        const body = await req.body.body;
        const data = await productServices.updateServer(body, serverId);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'update'
        }
        response.code = data.code;
        response.message = data.msg;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    },

    //PORT
    getListPort: async (req, res) => {
        let criteria = {};
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const type = req.query.type ?? null;
        for (const [key, value] of Object.entries(req.query)) {
            if(key != 'page' && key != 'limit' && key != 'type') {
                if(key == 'id' || key == 'status') {
                    criteria[key] = Number(value);
                }
                else {
                    criteria[key] = value;
                }
            }
        }
        const obj = await productServices.getListPort(criteria, page, limit, type);
        const response = {
            status: obj.status,
            code: obj.code,
            message: obj.msg,
            data: obj.data ?? []
        }

        return res.json(response)
    },
    deletePort: async (req, res) => {
        const portId = req.params.portId;
        const data = await productServices.deletePort(portId);
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
    },
    createPort: async (req, res) => {
        const data = await productServices.createPort(req.body.body);
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
    updatePort: async (req, res) => {
        const portId = req.params.portId;
        const body = await req.body.body;
        const data = await productServices.updatePort(body, portId);
        let response = {
            status: 1,
            code: 200,
            message: '',
            data: 'update'
        }
        response.code = data.code;
        response.message = data.msg;
        if (data.code == 400) {
            response.data = null;
        }
        return res.json(response)
    },
}
