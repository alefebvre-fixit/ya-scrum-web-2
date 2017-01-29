import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

import { UserService } from './services/index';
import { SprintService } from './services/index';
import { StoryService } from './services/index';

import { StoryModule } from './story/story.module';

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
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    FlexLayoutModule.forRoot()
  ],
  providers: [SprintService, StoryService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
