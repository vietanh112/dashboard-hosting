import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../model/api.response.model';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    protected apiServer = environment.apiServer;

    constructor(private httpClient: HttpClient,
                ) {
    }

    get(path: string, options: {}, callback: any): Observable<any> {
        // if (null !== this.globals.request) {
            // console.log('abort previous request');
            // this.globals.request.unsubscribe();
        // }
        return this.httpClient.get<ApiResponse>(this._buildUrl(path), options)
            .pipe(callback || '');
    }

    getFile(path: string, options: {}, callback: any): Observable<any> {
        // if (null !== this.globals.request) {
            // console.log('abort previous request');
            // this.globals.request.unsubscribe();
        // }
        return this.httpClient.get(this._buildUrl(path), options)
            .pipe(callback || '');
    }

    // getRaw(path: string, options: any, callback): Observable<any> {
    //     if (null !== this.globals.request) {
    //         // console.log('abort previous request');
    //         // this.globals.request.unsubscribe();
    //     }
    //     let body = typeof options.body !== 'undefined' ? options.body : null;
    //     body = body == null && typeof options.params !== 'undefined' ? options.params : options;

    // }

    post(path: string, options: any, callback: any): Observable<any> {
        let body = typeof options.body !== 'undefined' ? options.body : null;
        body = body == null && typeof options.params !== 'undefined' ? options.params : options;
        const headers = typeof options.headers !== 'undefined' ? options.headers : {};
        return this.httpClient.post<ApiResponse>(this._buildUrl(path), body, headers)
            .pipe(callback || '');
    }

    patch(path: string, options: any, callback: any): Observable<any> {
        let body = typeof options.body !== 'undefined' ? options.body : null;
        body = body == null && typeof options.params !== 'undefined' ? options.params : options;
        const headers = typeof options.headers !== 'undefined' ? options.headers : {};
        return this.httpClient.patch<ApiResponse>(this._buildUrl(path), body, headers)
            .pipe(callback || '');
    }

    delete(path: string, options: {}, callback: any): Observable<any> {
        return this.httpClient.delete<ApiResponse>(this._buildUrl(path), options)
            .pipe(callback || '');
    }

    put(path: string, options: {}, callback: any): Observable<any> {
        return this.httpClient.put<ApiResponse>(this._buildUrl(path), options)
            .pipe(callback || '');
    }

    getUrlByPath(path: any) {
        return this._buildUrl(path);
    }

    private _buildUrl(path: string) {
        let baseUrl = '';
        if (this.apiServer.host) {
            baseUrl = this.apiServer.ssl === true ? 'https://' : 'http://';
            baseUrl += this.apiServer.host;
        }
        if (this.apiServer.prefix !== '') {
            baseUrl += '/' + this.apiServer.prefix;
        }
        return baseUrl + '/' + path;
    }
}
