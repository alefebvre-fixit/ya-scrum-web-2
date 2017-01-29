import { Component } from '@angular/core';
import { StoryService } from './services/index';
import { Story } from './models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public storyService: StoryService
  ) {
  }


}
