import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {NavBar} from './navbar/navbar';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    BrowserModule,
    MaterialModule,
  ],
  declarations: [NavBar],
  exports: [NavBar],
  providers: [],
  entryComponents: [
  ],
})

export class SharedModule {}
