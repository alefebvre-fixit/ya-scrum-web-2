import { Component, OnInit, Input} from '@angular/core';

import { Story } from '../models/index';

@Component({
  selector: 'story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent  {

  @Input() story: Story;

  constructor(
  ) {
  }

}
