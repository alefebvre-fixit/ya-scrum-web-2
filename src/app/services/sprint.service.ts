import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, StoryProgress, SprintProgress } from '../models/index';
import { AngularFireDatabase } from 'angularfire2';

const SPRINTS = '/sprints';

@Injectable()
export class SprintService {

  constructor(
    private database: AngularFireDatabase
  ) {
  }

  public index(){
    this.findAll().take(1).subscribe((sprints: Sprint[]) => {
      console.log(sprints.length + "sprints to be index");
        for (let sprint of sprints) {

          console.log("Indexing sprint " + sprint);

          if (sprint.status == undefined){
            sprint.status = "new";
          }

          sprint.filter_status = Sprint.getFilterStatus(sprint.status);
          this.save(sprint);

          this.findStoryBySprint(sprint.$key).subscribe((stories: Story[]) => {
            
            sprint.size = stories.reduce(function (sum: number, story: Story) {
              return story.size;
            }, 0);
            this.database.object('/sprints/' + sprint.$key).update({ size: sprint.size });
          });

        }
    });
  }

  public findAll(): Observable<Sprint[]> {
    return this.database.list(SPRINTS);
  }

  public findStoryKeysPerSprint(sprintKey: string): Observable<string[]> {
    return this.database.list('storyPerSprint/' + sprintKey).map(storiesPerSprint => storiesPerSprint
      .map(storyPerSprint => storyPerSprint.$key));
  }

  public findStoryBySprint(sprintId: string): Observable<Story[]> {
    return this.findStoryKeysPerSprint(sprintId)
      .map(storiesPerSprint => storiesPerSprint.map(storyKey => this.database.object('stories/' + storyKey))).flatMap(fbos => Observable.combineLatest(fbos));
  }

  public findOneStory(storyKey: string): Observable<Story> {
    return this.database.object('/stories/' + storyKey);
  }

  public findByStatus(status: string): Observable<Sprint[]> {
    return this.database.list(SPRINTS, {
      query: {
        orderByChild: 'filter_status',
        equalTo: status
      }
    });
  }

  public assignToSprint(sprintId: string, storyId: string) {
    console.log("assignToSprint(sprintId: string, storyId: string)");

    this.findOne(sprintId).take(1).subscribe(sprint => {
      this.findOneStory(storyId).take(1).subscribe(story => {

        console.log("assignToSprint after subscribe");

        let join = new Object();
        join[storyId] = true;

        let progress: StoryProgress = Story.createProgress(story, 1);
        Story.setProgress(story, progress);
        sprint.size += story.size;

        this.database.object('/storyPerSprint/' + sprintId).update(join);
        this.database.object('/stories/' + storyId).update({ sprintId: sprintId, status: "assigned", progress: 0, duration: sprint.duration, history: story.history });
        this.database.object('/sprints/' + sprintId).update({ size: sprint.size });

      })
    });
  }

  public assignScrumMaster(sprintId: string, userId: string) {
    console.log("assignScrumMaster(sprintId: string, userId: string)");
    this.database.object('/sprints/' + sprintId).update({ scrumMasterId: userId});
  }

  public findOne(sprintKey: string): Observable<Sprint> {
    console.log("findOne(sprintKey: string): Observable<Sprint>");
    return this.database.object('/sprints/' + sprintKey);
  }

  public save(sprint: Sprint) {
    if (sprint.$key) {
      this.update(sprint);
    } else {
      this.create(sprint);
    }
  }

  public create(sprint: Sprint) {
    console.log("create(sprint: Sprint)");

    sprint.filter_status = Sprint.getFilterStatus(sprint.status);
    this.database.list(SPRINTS).push(sprint);
  }

  public update(sprint: Sprint) {
    console.log("update(sprint: Sprint)");
    sprint.filter_status = Sprint.getFilterStatus(sprint.status);    
    this.database.object('/sprints/' + sprint.$key).update(Sprint.getUpdate(sprint));
  }

  public updateSprintProgress(story: Story) {
    console.log("updateSprintProgress(story: Story)");

    this.findOne(story.sprintId).take(1).subscribe(sprint => {

      for (let storyProgress of story.history) {
        //find sprintProgress for that day
        let sprintProgress: SprintProgress = Sprint.getProgress(sprint, storyProgress.day);
        if (sprintProgress == undefined) {
          sprintProgress = Sprint.createProgress(sprint, storyProgress.day);
          Sprint.setProgress(sprint, sprintProgress);
        }
        SprintProgress.setProgress(sprintProgress, storyProgress);
      }

      //calculate progress for each day
      if (sprint.history == undefined) {
        sprint.history = new Array<SprintProgress>();
      }

      for (let sprintProgress of sprint.history) {
        let stories = sprintProgress.storiesProgress;

        if (stories != undefined) {
          SprintProgress.reset(sprintProgress);
          for (let story of stories) {
            sprintProgress.daily += story.daily;
            sprintProgress.previous += story.previous;
            sprintProgress.total += story.total;
            sprintProgress.remaining += story.remaining;
          }
        }
      }
      //finaly calculate the overall progress
      this.calculateProgress(sprint);
      this.database.object('/sprints/' + sprint.$key).update({ status: sprint.status, 
        filter_status: Sprint.getFilterStatus(sprint.status), 
        progress: sprint.progress, 
        duration: sprint.duration, 
        history: sprint.history });

    });
  }

  public calculateProgress(sprint: Sprint) {
    console.log("calculateProgress(sprint: Sprint)");
    if (sprint.history) {
      //TODO Do a sort first
      sprint.progress = sprint.history.reduce(function (sum: number, progress: SprintProgress) {
        return progress.total;
      }, 0);

      if (sprint.progress > 0) {
        if (sprint.progress >= sprint.size) {
          sprint.status = "closed"
        } else {
          sprint.status = "started"
        }
      } else {
        sprint.status = "new";
      }
    }
  }


  public generateBurndowData(sprint: Sprint): any{
    let result = {labels: [], datas: []}
    console.log('SprintService::generateBurndowData(sprint: Sprint)');
    result.labels = this.generateLabels(sprint);
    result.datas[0] = this.generateIdealCurve(sprint);
    result.datas[1] = this.generateActualCurve(sprint);

    return result;
  }

  private generateActualCurve(sprint: Sprint): any{
    let result = { data: [], label: 'Actual' };

    for (let day = 1; day <= sprint.duration; day++) {
      let progress: SprintProgress = Sprint.getProgress(sprint, day);
      if (progress != undefined){
        result.data[day-1] = progress.remaining;
      }
    }

    return result;
  }

  private generateIdealCurve(sprint: Sprint): any{

    let result = { data: [], label: 'Ideal' };

    for (let day = 1; day <= sprint.duration; day++) {
      let remaining = sprint.size - ((sprint.size * day)/ sprint.duration);
      result.data[day-1] = remaining;
    }

    return result;
  }

  private generateLabels(sprint: Sprint): Array<string>{
    let result: Array<string> = new Array<string>();
    
    for (let day = 1; day <= sprint.duration; day++) { 
      result.push(day.toString());
    }

    return result;
  }


}
