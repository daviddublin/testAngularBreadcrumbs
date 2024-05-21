import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../models/breadcrumb';

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbService {
    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private router: Router) {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd)
            )
            .subscribe((event) => {
                const root = this.router.routerState.snapshot.root;
                const breadcrumbs: Breadcrumb[] = [];
                this.addBreadcrumb(root.firstChild!, [], breadcrumbs);
                this._breadcrumbs$.next(breadcrumbs);
            });
    }

    buildDepth(iterations: number, constituentFolders: string[]) {
        var depthStr = '';
        for (let i = 1; i <= iterations; i++) {
            depthStr = depthStr + '/' + constituentFolders[i];
        }
        return depthStr;
    }

    private addBreadcrumb(
        route: ActivatedRouteSnapshot,
        parentUrl: string[],
        breadcrumbs: Breadcrumb[]
    ) {
        if (route) {
            const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
            let toShow = route.data["breadcrumb"]?.split("/") ? route.data["breadcrumb"]?.split("/") : routeUrl.toString().split(',');
            let constituentFolders: string[] = new Array();
            let pathToFollow: string[] = new Array();
            constituentFolders = toShow.toString().split(',');
            constituentFolders.splice(0, 0, 'home');
            pathToFollow = routeUrl.toString().split(',');
            pathToFollow.splice(0, 0, 'home');
            for (let i = 1; i < pathToFollow.length; i++) {
                const breadcrumb = {
                    label: this.getLabel(constituentFolders[i]),
                    url: this.buildDepth(i, pathToFollow),
                };
                breadcrumbs.push(breadcrumb);
                this.addBreadcrumb(route.firstChild!, routeUrl, breadcrumbs);
            }
        }
    }

    capitalizeFirstLetters(breadcrumbStrings: string[]): string {
        let toReturn = "";
        for (let i = 0; i < breadcrumbStrings.length; i++) {
            toReturn += breadcrumbStrings[i].charAt(0).toUpperCase() + breadcrumbStrings[i].slice(1) + " ";
        }
        return toReturn;
    }

    getLabel(input: string) {
        let noHyphen = input.replace(/-/g, ' ');
        let splitOnSpace = noHyphen.split(' ');
        let toReturn = this.capitalizeFirstLetters(splitOnSpace);
        return toReturn + " / ";
    }
}
