import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryCardComponent} from './story-card.component';
import { StoryGridComponent} from './story-grid.component';
import { ProductBacklogComponent} from './product-backlog.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoryService } from '../services/index';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  declarations: [StoryCardComponent, StoryGridComponent, ProductBacklogComponent],
  exports: [StoryCardComponent, StoryGridComponent, ProductBacklogComponent],
  providers: [StoryService]
})

export class StoryModule { }
