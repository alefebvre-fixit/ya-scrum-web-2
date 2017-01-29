import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryModule } from './story/story.module';
import { SprintDashboardComponent } from './sprint/sprint-dashboard.component';
import { ProductBacklogComponent } from './story/product-backlog.component';

// Route Configuration
export const routes: Routes = [

      {
        path: '',
        redirectTo: 'stories',
        pathMatch: 'full'
      },

  { path: 'sprints', component: SprintDashboardComponent },
  { path: 'stories', component: ProductBacklogComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
