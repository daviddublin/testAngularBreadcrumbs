import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppDashboardComponent } from './Dashboard/app.dashboard';
import { AppHomeComponent } from './Home/app.home';
import { AppGroupAdmin } from './Dashboard/AppGroupAdmin/app.group-admin'
import { AppSchemeReturns } from './Dashboard/AppSchemeReturns/app.scheme-returns'
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    data: { breadcrumb: 'home' },
    component: AppHomeComponent
  },
  {
    path: 'home/dashboard',
    data: { breadcrumb: 'home/dashboard' },
    component: AppDashboardComponent
  },
  {
    path: 'home/dashboard/scheme-returns',
    data: { breadcrumb: 'home/dashboard/scheme-returns' },
    component: AppSchemeReturns
  },
  {
    path: 'home/dashboard/group-admin',
    data: { breadcrumb: 'home/dashboard/group-admin' },
    component: AppGroupAdmin
  }
 ];

@NgModule({
  declarations: [
  	AppComponent,
  	AppDashboardComponent,
  	AppSchemeReturns,
  	BreadcrumbComponent,
  	AppHomeComponent
  	],
  imports: [ 
  	BrowserModule,
  	BrowserAnimationsModule,
  	MatFormFieldModule,
  	MatInputModule,
    RouterModule.forRoot(routes),
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
