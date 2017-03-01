import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {NavBar} from './navbar/navbar';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ScrumItems} from './scrum-items/scrum-items';
import {ComponentSidenav} from './component-sidenav/component-sidenav';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    BrowserModule,
    MaterialModule,
  ],
  declarations: [NavBar, ComponentSidenav],
  exports: [NavBar, ComponentSidenav],
  providers: [ScrumItems],
  entryComponents: [
  ],
})

export class SharedModule {}
