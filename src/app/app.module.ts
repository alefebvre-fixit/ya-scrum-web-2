import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './ya-scrum-app';

import { AngularFireModule } from 'angularfire2';

import { UserService } from './services/index';
import { SprintService } from './services/index';
import { StoryService } from './services/index';

import { StoryModule } from './story/story.module';
import { SprintModule } from './sprint/sprint.module';

import {SharedModule} from './shared/shared-module';

import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { ChartsModule } from 'ng2-charts/ng2-charts';

export const firebaseConfig = {
    apiKey: 'AIzaSyBRVBLO8VXkurLDQR1eVcVXOmNXyt8SCoc',
    authDomain: 'ya-scrum.firebaseapp.com',
    databaseURL: 'https://ya-scrum.firebaseio.com',
    storageBucket: 'ya-scrum.appspot.com',
    messagingSenderId: '873493349647'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoryModule,
    SprintModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    FlexLayoutModule,
    RouterModule.forRoot(ROUTES),
    ChartsModule
  ],
  providers: [SprintService, StoryService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
