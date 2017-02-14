import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { StoryService, SprintService, UserService } from '../services/index';
import { Story, Sprint, User } from '../models/index';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryEditComponent } from './story-edit.component';
import { StoryCardComponent } from './story-card.component';

@Component({
  selector: 'story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.css']
})
export class StoryViewComponent implements OnInit {

  public story: Story;
  public sprint: Sprint;
  public productOwner: User;

  constructor(
    private route: ActivatedRoute,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,
    public dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.storyService.findOne(id).subscribe(story => {
          this.story = story;
          if (story.sprintId) {
            this.sprintService.findOne(story.sprintId).subscribe(sprint => {
              this.sprint = sprint;
            });
          }
          if (story.productOwnerId) {
            this.userService.findOne(story.productOwnerId).subscribe(user => {
              this.productOwner = user;
              console.log(this.productOwner);
            });
          }
        });
      });
  }

  assignProductOwner() {
    /*
    let selectorModal = this.modalCtrl.create(ProductOwnerSelectorPage, { storyId: this.story.$key });
    selectorModal.present();
    */
  }

  navigateToProductOwner(user: User) {

  }

  editStory(story: Story) {
    console.log('editStory');

    const dialogRef = this.dialog.open(StoryEditComponent);
    dialogRef.componentInstance.story = this.story;
    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
    });

  }

}
