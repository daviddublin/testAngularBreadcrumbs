import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
    breadcrumbs$: Observable<Breadcrumb[]>;

    constructor(breadcrumbService: BreadcrumbService) {
        this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
    }
}
