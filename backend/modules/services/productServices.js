const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const db =  require('../models');
const redis = require('redis');
const client = redis.createClient(6379);
const listVlanRedisKey = 'list:vlan';
const listServerRedisKey = 'list:server';
const listPortRedisKey = 'list:port';


const productServices = {
    getList: async (criteria, page, limit) => {
        let data = null;
        let total = 0;
        let log = {
            code: 204,
            status: 0,
            data: null,
            total: null,
        }
        try {
            if (criteria) {
                if(Object.keys(criteria).length > 2) {
                    let newCriteria = {};
                    for (const [key, value] of Object.entries(criteria)) {
                        if(key != 'keyword') {
                            newCriteria[key] = value
                        }
                    }
                    data = await coreModels.hosting.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: {
                                        iPAddress: {
                                            [Op.like]: `%${criteria.keyword}%`
                                        },
                                        hostName: {
                                            [Op.like]: `%${criteria.keyword}%`
                                        }
                                    }
                                },
                                newCriteria
                            ]   
                        },
                        limit: limit,
                        offset: Number(limit) * Number(page)
                    });
                    total = await coreModels.hosting.count({
                        where: {
                            [Op.and]: [
                                {
                                    [Op.or]: {
                                        iPAddress: {
                                            [Op.like]: `%${criteria.keyword}%`
                                        },
                                        hostName: {
                                            [Op.like]: `%${criteria.keyword}%`
                                        }
                                    }
                                },
                                newCriteria
                            ]   
                        },
                    })
                }
                else {
                    if(criteria.keyword) {
                        data = await coreModels.hosting.findAll({
                            where: {
                                [Op.or]: {
                                    iPAddress: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    },
                                    hostName: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    }
                                }
                            },
                            limit: limit,
                            offset: Number(limit) * Number(page)
                        })
                        total = await coreModels.hosting.count({
                            where: {
                                [Op.or]: {
                                    iPAddress: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    },
                                    hostName: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    }
                                }
                            },
                        })
                    }
                    else {
                        data = await coreModels.hosting.findAll(
                            {
                                where: criteria,
                                limit: limit,
                                offset: Number(limit) * Number(page)
                            }
                        );
                        total = await coreModels.hosting.count({
                            where: criteria,
                        })
                    }
                }
            }
            else {
                data = await coreModels.hosting.findAll({
                    limit: limit,
                    offset: Number(limit) * Number(page)
                });
                total = await coreModels.hosting.count()
            }
            log.code = 200;
            log.status = 1;
            log.data = data;
            log.total = total;
            
        } catch (error) {
            return log;
        }

        return log;
    },
    createHosting: async (body) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            const data = await coreModels.hosting.create({
                iPAddress: body.ipaddress,
                iPAddressF5: body.ipaddressf5,
                hostname: body.hostname,
                port: Number(body.port),
                priority: body.priority,
                env: body.env,
                type: body.type,
                middleware: body.middleware,
                information: body.information,
                machineType: body.machineType,
                os: body.os,
                note: body.note,
                na: body.na,
                status: body.status,
                vlan: body.vlan,
                server: body.server
            })
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    deleteHosting: async(hostingId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        if(hostingId) {
            try {
                const data = await coreModels.hosting.destroy({
                    where: {
                        id: hostingId
                    }
                })
                if(data) {
                    log.code = 200;
                    log.msg = 'success';
                }
                return log
            } catch (error) {
                console.log(error);
                return log;
            }
        }
        return log
    },
    updateHosting: async (body, hostingId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            const data = await coreModels.hosting.update(
                {
                    iPAddress: body.ipaddress,
                    iPAddressF5: body.ipaddressf5,
                    hostname: body.hostname,
                    port: Number(body.port),
                    priority: body.priority,
                    env: body.env,
                    type: body.type,
                    middleware: body.middleware,
                    information: body.information,
                    machineType: body.machineType,
                    os: body.os,
                    note: body.note,
                    na: body.na,
                    status: body.status,
                    vlan: body.vlan,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: hostingId}
                }
            )
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    getListVlan: async (criteria, page, limit, type) => {
        let data;
        let total = 0;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: {
                data: [],
                total: 0
            }
        }
        // if(Object.keys(criteria).length == 1){
        //     if(criteria.keyword) {
        //         data = await coreModels.vlan.findAll({
        //             where: {
        //                 [Op.or]: {
        //                     name: {
        //                         [Op.like]: `%${criteria.keyword}%`
        //                     },
        //                     description: {
        //                         [Op.like]: `%${criteria.keyword}%`
        //                     }
        //                 }
        //             },
        //             limit: limit,
        //             offset: Number(limit) * Number(page)
        //         });

        //         total = await coreModels.vlan.count({
        //             where: {
        //                 [Op.or]: {
        //                     name: {
        //                         [Op.like]: `%${criteria.keyword}%`
        //                     },
        //                     description: {
        //                         [Op.like]: `%${criteria.keyword}%`
        //                     }
        //                 }
        //             },
        //         });
        //     }
        //     else if (criteria.server || criteria.id || criteria.status) {
        //         data = await coreModels.vlan.findAll({
        //             where: criteria,
        //             limit: limit,
        //             offset: Number(limit) * Number(page)
        //         });

        //         total = await coreModels.vlan.count({
        //             where: criteria
        //         })
        //     }
        // }
        // else if (Object.keys(criteria).length == 2) {
        //     if(criteria.keyword && criteria.server) {
        //         data = await coreModels.vlan.findAll({
        //             where: {
        //                 [Op.and]: [
        //                     {
        //                         [Op.or]: {
        //                             name: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             },
        //                             description: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             }
        //                         }
        //                     },
        //                     {
        //                         server: `${Number(criteria.server)}`
        //                     }
        //                 ]   
        //             },
        //             limit: limit,
        //             offset: Number(limit) * Number(page)
        //         })

        //         total = await coreModels.vlan.count({
        //             where: {
        //                 [Op.and]: [
        //                     {
        //                         [Op.or]: {
        //                             name: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             },
        //                             description: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             }
        //                         }
        //                     },
        //                     {
        //                         server: `${Number(criteria.server)}`
        //                     }
        //                 ]   
        //             }
        //         })
        //     }
        //     else if (criteria.keyword && criteria.status) {
        //         data = await coreModels.vlan.findAll({
        //             where: {
        //                 [Op.and]: [
        //                     {
        //                         [Op.or]: {
        //                             name: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             },
        //                             description: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             }
        //                         }
        //                     },
        //                     {
        //                         status: `${Number(criteria.status)}`
        //                     }
        //                 ]   
        //             },
        //             limit: limit,
        //             offset: Number(limit) * Number(page)
        //         })

        //         total = await coreModels.vlan.count({
        //             where: {
        //                 [Op.and]: [
        //                     {
        //                         [Op.or]: {
        //                             name: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             },
        //                             description: {
        //                                 [Op.like]: `%${criteria.keyword}%`
        //                             }
        //                         }
        //                     },
        //                     {
        //                         status: `${Number(criteria.status)}`
        //                     }
        //                 ]   
        //             }
        //         })
        //     }
        //     else if (criteria.server && criteria.status) {
        //         data = await coreModels.vlan.findAll({
        //             where: {
        //                 [Op.and]: [
        //                     {
        //                         server: `${Number(criteria.server)}`
        //                     },
        //                     {
        //                         status: `${Number(criteria.status)}`
        //                     }
        //                 ]   
        //             },
        //             limit: limit,
        //             offset: Number(limit) * Number(page)
        //         })

        //         total = await coreModels.vlan.count({
        //             where: {
        //                 [Op.and]: [
        //                     {
        //                         server: `${Number(criteria.server)}`
        //                     },
        //                     {
        //                         status: `${Number(criteria.status)}`
        //                     }
        //                 ]   
        //             }
        //         })

        //     }
        // }
        // else if (Object.keys(criteria).length == 3) {
        //     data = await coreModels.vlan.findAll({
        //         where: {
        //             [Op.and]: [
        //                 {
        //                     [Op.or]: {
        //                         name: {
        //                             [Op.like]: `%${criteria.keyword}%`
        //                         },
        //                         description: {
        //                             [Op.like]: `%${criteria.keyword}%`
        //                         }
        //                     }
        //                 },
        //                 {
        //                     server: `${Number(criteria.server)}`
        //                 },
        //                 {
        //                     status: `${Number(criteria.status)}`
        //                 }
        //             ]   
        //         },
        //         limit: limit,
        //         offset: Number(limit) * Number(page)
        //     })

        //     total = await coreModels.vlan.count({
        //         where: {
        //             [Op.and]: [
        //                 {
        //                     [Op.or]: {
        //                         name: {
        //                             [Op.like]: `%${criteria.keyword}%`
        //                         },
        //                         description: {
        //                             [Op.like]: `%${criteria.keyword}%`
        //                         }
        //                     }
        //                 },
        //                 {
        //                     server: `${Number(criteria.server)}`
        //                 },
        //                 {
        //                     status: `${Number(criteria.status)}`
        //                 }
        //             ]   
        //         }
        //     })
        // }
        // else {
        //     if(type == 'query') {
        //         const myPromise = new Promise((resolve, reject) => {
        //             client.get(listVlanRedisKey, async (err, vlan) => {
        //                 if(vlan != {} && vlan != null && vlan != undefined) {
        //                     resolve(JSON.parse(vlan));
        //                 }
        //                 else if(vlan == null || vlan == undefined || vlan == {} || vlan == []){
        //                     data = await coreModels.vlan.findAll({});
        //                     client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
        //                     resolve(data);
        //                 }
        //                 else {
        //                     reject(false)
        //                 }
        //             })
        //         });

        //         data = await myPromise
        //     }
        //     else {
        //         data = await coreModels.vlan.findAll({
        //             limit: limit,
        //             offset: Number(limit) * Number(page)
        //         });

        //         total = await coreModels.vlan.count({});
                
        //     }
        // }

        if(Object.keys(criteria).length == 0) {
            if(type == 'query') {
                const myPromise = new Promise((resolve, reject) => {
                    client.get(listVlanRedisKey, async (err, vlan) => {
                        if(vlan != {} && vlan != null && vlan != undefined) {
                            resolve(JSON.parse(vlan));
                        }
                        else if(vlan == null || vlan == undefined || vlan == {} || vlan == []){
                            data = await coreModels.vlan.findAll({
                                limit: 10,
                                offset: 0,
                                order: [
                                    ['createdAt', 'DESC'],
                                ],
                            });
                            client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
                            resolve(data);
                        }
                        else {
                            reject(false)
                        }
                    })
                });

                data = await myPromise
            }
            else {
                data = await coreModels.vlan.findAll({
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
                total =  await coreModels.vlan.count({});   
            }
        }
        else if(Object.keys(criteria).length == 1) {
            if('keyword' in criteria) {
                data = await coreModels.vlan.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${criteria.keyword}%`
                        },
                    },
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.vlan.count({
                    where: {
                        name: {
                            [Op.like]: `%${criteria.keyword}%`
                        },
                    },
                })
            }
            else {
                data = await coreModels.vlan.findAll({
                    where: criteria,
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.vlan.count({
                    where: criteria,
                })
            }
        }
        else if (Object.keys(criteria).length >= 2) {
            if('keyword' in criteria) {
                let allObj = {};
                for (const obj in criteria) {
                    if(obj != 'keyword'){
                        allObj[obj] = criteria[obj];   
                    } 
                }
                data = await coreModels.vlan.findAll({
                    where: {
                        [Op.and]: [
                            {
                                name: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                            },
                            allObj
                        ]
                    },
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.vlan.count({
                    where: {
                        [Op.and]: [
                            {
                                name: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                            },
                            allObj
                        ]
                    },
                })
            }
            else {
                data = await coreModels.vlan.findAll({
                    where: criteria,
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.vlan.count({
                    where: criteria
                })
            }
        }
        else {
            res.code = 200;
            return res;
        }

        res.status = 1;
        res.code = 200;
        res.msg = 'success';
        res.data.data = data;
        res.data.total = total;
        return res;
    },
    updateVlan: async (body, vlanId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.vlan.update(
                {
                    name: body.name,
                    status: body.status,
                    description: body.description,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: vlanId}
                }
            )
            if(data) {
                data = await coreModels.vlan.findAll({});
                client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    createVlan: async (body) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.vlan.create({
                name: body.name,
                status: body.status,
                description: body.description,
                status: body.status,
                server: body.server
            })
            if(data) {
                data = await coreModels.vlan.findAll({});
                client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    deleteVlan: async(vlanId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        if(vlanId) {
            try {
                let data = await coreModels.vlan.destroy({
                    where: {
                        id: vlanId
                    }
                })
                if(data) {
                    data = await coreModels.vlan.findAll({});
                    client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
                    log.code = 200;
                    log.msg = 'success';
                }
                return log
            } catch (error) {
                return log;
            }
        }
        return log
    },
    getListServer: async (criteria, page, limit, type) => {
        let data;
        let total = 0;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: {
                data: [],
                total: 0
            }
        }
        if(Object.keys(criteria).length == 0) {
            if(type == 'query') {
                const myPromise = new Promise((resolve, reject) => {
                    client.get(listServerRedisKey, async (err, server) => {
                        if(server != {} && server != null && server != undefined) {
                            resolve(JSON.parse(server));
                        }
                        else if (server == null || server == undefined || server == {} || server == []) {
                            data = await coreModels.server.findAll({
                                limit: 10,
                                offset: 0,
                                order: [
                                    ['createdAt', 'DESC'],
                                ],
                            });
                            client.setex(listServerRedisKey, 3600, JSON.stringify(data));
                            resolve(data);
                        }
                        else {
                            reject(false)
                        }
                    })
                });
                data = await myPromise; 
            }
            else {
                data = await coreModels.server.findAll({
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
                total =  await coreModels.server.count({});   
            }
        }
        else if(Object.keys(criteria).length == 1) {
            if('keyword' in criteria) {
                data = await coreModels.server.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${criteria.keyword}%`
                        },
                    },
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.server.count({
                    where: {
                        name: {
                            [Op.like]: `%${criteria.keyword}%`
                        },
                    },
                })
            }
            else {
                data = await coreModels.server.findAll({
                    where: criteria,
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.server.count({
                    where: criteria,
                })
            }
        }
        else if (Object.keys(criteria).length >= 2) {
            if('keyword' in criteria) {
                let allObj = {};
                for (const obj in criteria) {
                    if(obj != 'keyword'){
                        allObj[obj] = criteria[obj];   
                    } 
                }
                data = await coreModels.server.findAll({
                    where: {
                        [Op.and]: [
                            {
                                name: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                            },
                            allObj
                        ]
                    },
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.server.count({
                    where: {
                        [Op.and]: [
                            {
                                name: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                            },
                            allObj
                        ]
                    },
                })
            }
            else {
                data = await coreModels.server.findAll({
                    where: criteria,
                    limit: limit,
                    offset: Number(limit) * Number(page),
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                total = await coreModels.server.count({
                    where: criteria
                })
            }
        }
        else {
            res.code = 201;
            res.data.data = [];
            res.data.total = 0;
            return res;
        }

        res.data.data = data;
        res.data.total = total;
        res.status = 1;
        res.code = 200;
        res.msg = 'success';

        return res;
    },
    deleteServer: async(serverId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        if(serverId) {
            try {
                let data = await coreModels.server.destroy({
                    where: {
                        id: serverId
                    }
                })
                if(data) {
                    data = await coreModels.server.findAll({
                        limit: 10,
                        offset: 0,
                        order: [
                            ['createdAt', 'DESC'],
                        ],
                    });
                    client.setex(listServerRedisKey, 3600, JSON.stringify(data));
                    log.code = 200;
                    log.msg = 'success';
                }
                return log
            } catch (error) {
                return log;
            }
        }
        return log
    },
    updateServer: async (body, serverId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.server.update(
                {
                    name: body.name,
                    status: body.status,
                    description: body.description,
                    updatedAt: new Date()
                },
                {
                    where: {id: serverId}
                }
            )
            if(data) {
                data = await coreModels.server.findAll({
                    limit: 10,
                    offset: 0,
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
                client.setex(listServerRedisKey, 3600, JSON.stringify(data));
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    createServer: async (body) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.server.create({
                name: body.name,
                status: body.status,
                description: body.description,
                status: body.status
            })
            if(data) {
                data = await coreModels.server.findAll({
                    limit: 10,
                    offset: 0,
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
                client.setex(listServerRedisKey, 3600, JSON.stringify(data));
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    //port
    getListPort: async (criteria, page, limit, type) => {
        let data;
        let total = 0;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: {
                data: [],
                total: 0
            }
        }
        try {
            if (Object.keys(criteria).length == 0) {
                if(type == 'query') {
                    const myPromise = new Promise((resolve, reject) => {
                        client.get(listPortRedisKey, async (err, port) => {
                            if(port != {} && port != null && port != undefined) {
                                resolve(JSON.parse(port));
                            }
                            else if (port == null || port == undefined || port == {} || port == []) {
                                data = await coreModels.port.findAll({
                                    limit: 10,
                                    offset: 0,
                                    order: [
                                        ['createdAt', 'DESC'],
                                    ],
                                });
                                client.setex(listPortRedisKey, 3600, JSON.stringify(data));
                                resolve(data);
                            }
                            else {
                                reject(false)
                            }
                        })
                    });
                    data = await myPromise;
                }
               else{
                    data = await coreModels.port.findAll({
                        limit: limit,
                        offset: Number(limit) * Number(page),
                        order: [
                            ['createdAt', 'DESC'],
                        ],
                    });
                    total = await coreModels.port.count();
               }
            }
            else if(Object.keys(criteria).length == 1) {
                if('keyword' in criteria) {
                    data = await coreModels.port.findAll({
                        where: {
                            port: {
                                [Op.like]: `%${criteria.keyword}%`
                            },
                        },
                        limit: limit,
                        offset: Number(limit) * Number(page),
                        order: [
                            ['createdAt', 'DESC'],
                        ]
                    })
                    total = await coreModels.port.count({
                        where: {
                            port: {
                                [Op.like]: `%${criteria.keyword}%`
                            },
                        },
                    })
                }
                else {
                    data = await coreModels.port.findAll({
                        where: criteria,
                        limit: limit,
                        offset: Number(limit) * Number(page),
                        order: [
                            ['createdAt', 'DESC'],
                        ]
                    })
                    total = await coreModels.port.count({
                        where: criteria,
                    })
                }
            }
            else if (Object.keys(criteria).length >= 2) {
                if('keyword' in criteria) {
                    let allObj = {};
                    for (const obj in criteria) {
                        if(obj != 'keyword'){
                            allObj[obj] = criteria[obj];   
                        } 
                    }
                    data = await coreModels.port.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    port: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    },
                                },
                                allObj
                            ]
                        },
                        limit: limit,
                        offset: Number(limit) * Number(page),
                        order: [
                            ['createdAt', 'DESC'],
                        ]
                    })
                    total = await coreModels.port.count({
                        where: {
                            [Op.and]: [
                                {
                                    port: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    },
                                },
                                allObj
                            ]
                        },
                    })
                }
                else {
                    data = await coreModels.port.findAll({
                        where: criteria,
                        limit: limit,
                        offset: Number(limit) * Number(page),
                        order: [
                            ['createdAt', 'DESC'],
                        ]
                    })
                    total = await coreModels.port.count({
                        where: criteria
                    })
                }
            }
            else {
                return res;
            }
            res.status = 1;
            res.code = 200;
            res.msg = 'success';
            res.data.data = data;
            res.data.total = total;

            return res;
        } catch (error) {
            console.log(error);
            return res
        }
    },
    deletePort: async(portId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        if(portId) {
            try {
                let data = await coreModels.port.destroy({
                    where: {
                        id: portId
                    }
                })
                if(data) {
                    data = await coreModels.port.findAll({
                        limit: 0,
                        offset: 0,
                        order: [
                            ['createdAt', 'DESC'],
                        ],
                    });
                    client.setex(listPortRedisKey, 3600, JSON.stringify(data));
                    log.code = 200;
                    log.msg = 'success';
                }
                return log
            } catch (error) {
                return log;
            }
        }
        return log
    },
    updatePort: async (body, portId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.port.update(
                {
                    port: body.port,
                    status: body.status,
                    description: body.description,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: portId}
                }
            )
            if(data) {
                data = await coreModels.port.findAll({
                    limit: 0,
                    offset: 0,
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
                client.setex(listPortRedisKey, 3600, JSON.stringify(data));
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    createPort: async (body) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.port.create({
                port: body.port,
                status: body.status,
                description: body.description,
                status: body.status,
                server: body.server
            })
            if(data) {
                data = await coreModels.port.findAll({
                    limit: 0,
                    offset: 0,
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
                client.setex(listPortRedisKey, 3600, JSON.stringify(data));
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },

}

module.exports = productServices
