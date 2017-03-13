import {Component, ViewEncapsulation} from '@angular/core';

import { StoryService } from './services/index';
import { Story } from './models/index';

@Component({
  selector: 'ya-scrum-app',
  templateUrl: './ya-scrum-app.html',
  styleUrls: ['./ya-scrum-app.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class AppComponent {

  constructor(
    public storyService: StoryService
  ) {
  }


}
