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
import {RoleModel} from '../../auth/models/role.model';
import {PositionModel} from '../../auth/models/position.model';

declare const commons: any;
@Injectable({
    providedIn: 'root'
})

export class SearchService {
    protected apiServerPaths = environment.apiServer.paths;

    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private router: Router,
    ) {}

    selectSearch(queries: any) {
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
        return this.apiService.get(this.apiServerPaths.search.getList, options, map((response: any) => {
            let rs: any[] = []

            if(response.status == 1 && response.code == 200) {
                if(response.data) {
                    if(queries.type == 'vlan') {
                        response.data.forEach((item: any) => {
                            rs.push(new ServerModel(item));
                        });
                    }
                    else if(queries.type == 'port') {
                        response.data.forEach((item: any) => {
                            rs.push(new ServerModel(item));
                        });
                    }
                    else if(queries.type == 'hosting') {
                        let obj: any = {
                            port: [],
                            server: [],
                            vlan: []
                        }
                        if(response.data.port) {
                            response.data.port.forEach((item: any) => {
                                obj.port.push(new PortModel(item));
                            });
                        }
                        if(response.data.server) {
                            response.data.server.forEach((item: any) => {
                                obj.server.push(new ServerModel(item));
                            });
                        }
                        if(response.data.vlan) {
                            response.data.vlan.forEach((item: any) => {
                                obj.vlan.push(new VlanModel(item));
                            });
                        }
                        return obj;
                    }
                }
            }
            return rs;
            })
        )
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
        return this.apiService.get(this.apiServerPaths.search.listServer, options, map((response: any) => {
          let rs: any[] = [];
            if(response.status == 1 && response.code == 200) {
                if(response.data) {
                    response.data.forEach((item: any) => {
                        rs.push(new ServerModel(item));
                    });
                }
            }
            return rs;
            })
        )
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
      return this.apiService.get(this.apiServerPaths.search.listVlan, options, map((response: any) => {
          let rs: any[] = [];
          if(response.status == 1 && response.code == 200) {
              if(response.data) {
                  response.data.forEach((item: any) => {
                      rs.push(new VlanModel(item));
                  });
              }
          }
          return rs;
          })
      )
  }
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
    return this.apiService.get(this.apiServerPaths.search.listPort, options, map((response: any) => {
      let rs: any[] = [];
        if(response.status == 1 && response.code == 200) {
            if(response.data) {
                response.data.forEach((item: any) => {
                    rs.push(new PortModel(item));
                });
            }
        }
        return rs;
        })
    )
    }

    listRole(queries: any) {
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
        return this.apiService.get(this.apiServerPaths.search.listRole, options, map((response: any) => {
          let rs: any[] = [];
            if(response.status == 1 && response.code == 200) {
                if(response.data) {
                    response.data.forEach((item: any) => {
                        rs.push(new RoleModel(item));
                    });
                }
            }
            return rs;
            })
        )
    }
    listPosition(queries: any) {
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
        return this.apiService.get(this.apiServerPaths.search.listRole, options, map((response: any) => {
            console.log(response);
            
        let rs: any[] = [];
            if(response.status == 1 && response.code == 200) {
                if(response.data) {
                    response.data.forEach((item: any) => {
                        rs.push(new PositionModel(item));
                    });
                }
            }
            return rs;
            })
        )
    }
}
