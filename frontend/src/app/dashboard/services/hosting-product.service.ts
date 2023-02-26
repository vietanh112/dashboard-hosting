import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {ApiService} from '../../_core/services/api.service';
import {HostingModel} from '../models/host.model';
import {PortModel} from '../models/port.model';
import {ServerModel} from '../models/server.model';
import {VlanModel} from '../models/vlan.model';

declare const commons: any;
@Injectable({
    providedIn: 'root'
})

export class DashboardHostingProductService {
    protected apiServerPaths = environment.apiServer.paths;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private router: Router,
        ) {}
    invalidToken(res: any) {
        if(res.code == 208 && res.status == 0) {
            localStorage.clear();
            this.router.navigate(['auth', 'login']);
        }
        return true;
    }

    list(queries: any) {
        let options: any = {
            params: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        // tslint:disable-next-line:forin
        for (const i in queries) {
            options['params'][i] = queries[i];
        }
        return this.apiService.get(this.apiServerPaths.product.list, options, map((response: any) => {
                this.invalidToken(response);
                console.log(response);

                let rs: any = {
                    total: 0,
                    list: []
                }
                if(response.status == 1 && response.code == 200) {
                    if(response.data.data) {
                        response.data.data.forEach((item: any) => {
                            rs.list.push(new HostingModel(item));
                        });
                    }
                    rs.total = response.data.total;
                }
                return rs;
            })
        )
    }
    create(body: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        return this.apiService.post(this.apiServerPaths.product.create, options, map((response: any) => {
            return response;
        }));
    }
    update(body: any, hostingId: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.update;
        path = path.replace('{HOSTING_ID}', String(hostingId));
        return this.apiService.patch(path, options, map((response: any) => {
            return response;
        }));
    }
    delete(hostingId: any) {
        let options: any = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.delete;
        path = path.replace('{HOSTING_ID}', String(hostingId));
        return this.apiService.delete(path, options, map((response: any) => {
            return response;
        }));
    }
    listVlan(queries: any) {
        let options: any = {
            params: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        // tslint:disable-next-line:forin
        for (const i in queries) {
            options['params'][i] = queries[i];
        }
        return this.apiService.get(this.apiServerPaths.product.listVlan, options, map((response: any) => {
            let rs: any = {
                total: 0,
                list: []
            }
            if(response.status == 1 && response.code == 200) {
                if(response.data.data) {
                    response.data.data.forEach((item: any) => {
                        rs.list.push(new VlanModel(item));
                    });
                }
                rs.total = response.data.total ?? rs.list.length;
            }
            return rs
            })
        )
    }
    updateVlan(body: any, vlanId: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.updateVlan;
        path = path.replace('{VLAN_ID}', String(vlanId));
        return this.apiService.patch(path, options, map((response: any) => {
            return response;
        }));
    }
    createVlan(body: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        return this.apiService.post(this.apiServerPaths.product.createVlan, options, map((response: any) => {
            return response;
        }));
    }
    deleteVlan(vlanId: any) {
        let options: any = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.deleteVlan;
        path = path.replace('{VLAN_ID}', String(vlanId));
        return this.apiService.delete(path, options, map((response: any) => {
            return response;
        }));
    }
    listServer(queries: any) {
        let options: any = {
            params: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        // tslint:disable-next-line:forin
        for (const i in queries) {
            options['params'][i] = queries[i];
        }
        return this.apiService.get(this.apiServerPaths.product.listServer, options, map((response: any) => {
            let rs: any = {
                total: 0,
                list: []
            }
            if(response.status == 1 && response.code == 200) {
                if(response.data.data) {
                    response.data.data.forEach((item: any) => {
                        rs.list.push(new ServerModel(item));
                    });
                }
                rs.total = response.data.total ?? rs.list.length;
            }
            return rs
        })
        )
    }
    deleteServer(serverId: any) {
        let options: any = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.deleteServer;
        path = path.replace('{SERVER_ID}', String(serverId));
        return this.apiService.delete(path, options, map((response: any) => {
            return response;
        }));
    }
    updateServer(body: any, serverId: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.updateServer;
        path = path.replace('{SERVER_ID}', String(serverId));
        return this.apiService.patch(path, options, map((response: any) => {
            return response;
        }));
    }
    createServer(body: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        return this.apiService.post(this.apiServerPaths.product.createServer, options, map((response: any) => {
            return response;
        }));
    }
    //PORT

    listPort(queries: any) {
        let options: any = {
            params: {},
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        // tslint:disable-next-line:forin
        for (const i in queries) {
            options['params'][i] = queries[i];
        }
        return this.apiService.get(this.apiServerPaths.product.listPort, options, map((response: any) => {
            let rs: any = {
                total: 0,
                list: []
            }
            if(response.status == 1 && response.code == 200) {
                if(response.data.data) {
                    response.data.data.forEach((item: any) => {
                        rs.list.push(new PortModel(item));
                    });
                }
                rs.total = response.data.total;
            }
            return rs;
            })
        )
    }
    deletePort(portId: any) {
        let options: any = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.deletePort;
        path = path.replace('{PORT_ID}', String(portId));
        return this.apiService.delete(path, options, map((response: any) => {
            return response;
            }
        ));
    }
    updatePort(body: any, portId: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let path = this.apiServerPaths.product.updatePort;
        path = path.replace('{PORT_ID}', String(portId));
        return this.apiService.patch(path, options, map((response: any) => {
            return response;
        }));
    }
    createPort(body: any) {
        let options: any = {
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        return this.apiService.post(this.apiServerPaths.product.createPort, options, map((response: any) => {
            return response;
        }));
    }
}
