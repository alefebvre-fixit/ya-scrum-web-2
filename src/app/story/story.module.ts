import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryCardComponent} from './story-card.component';
import { StoryGridComponent} from './story-grid.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  declarations: [StoryCardComponent, StoryGridComponent],
  exports: [StoryCardComponent, StoryGridComponent],
  providers: []
})

export class StoryModule { }
