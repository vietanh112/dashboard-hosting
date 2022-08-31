import { PreloadingStrategy, Route } from '@angular/router';
import {of} from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
    preloadedModules: string[] = [];

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        //@ts-ignore
        if (route.data && route.data.preload) {
            this.preloadedModules.push(route.path);
            return load();
        } else {
            return of(null);
        }
    }
}
