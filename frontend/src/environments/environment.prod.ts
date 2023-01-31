// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServer: {
      ssl: false,
      host: 'localhost:4001',
      prefix: '',
      paths: {
        auth: {
          login:'auth/login',
          logout: 'auth/logout',
          register: 'auth/register',
          forgotPassword: '',
          changePassword: 'auth/change-password',
          infor: 'auth/{USER_ID}/infor',
          refreshToken: 'auth/refresh-token'
        },
        product: {
          list: 'dashboard/product/list',
          create: 'dashboard/product/create',
          delete: 'dashboard/product/{HOSTING_ID}/delete',
          update: 'dashboard/product/{HOSTING_ID}/update',
          listVlan: 'dashboard/product/list-vlan',
          createVlan: 'dashboard/product/create-vlan',
          updateVlan: 'dashboard/product/{VLAN_ID}/update-vlan',
          deleteVlan: 'dashboard/product/{VLAN_ID}/delete-vlan',
          listServer: 'dashboard/product/list-server',
          createServer: 'dashboard/product/create-server',
          updateServer: 'dashboard/product/{SERVER_ID}/update-server',
          deleteServer: 'dashboard/product/{SERVER_ID}/delete-server',
          listPort: 'dashboard/product/list-port',
          createPort: 'dashboard/product/create-port',
          updatePort: 'dashboard/product/{PORT_ID}/update-port',
          deletePort: 'dashboard/product/{PORT_ID}/delete-port',
        }
      }
  },
  jwt: {
    timeRefresh: 1800
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
