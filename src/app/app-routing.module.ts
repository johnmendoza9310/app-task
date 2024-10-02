import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TasksDynamicFormComponent } from './components/tasks-dynamic-form/tasks-dynamic-form.component';

const routes: Routes = [
  {
    path: 'task-list',
    component: TasksListComponent,
  },
  {
    path: 'task-dynamic-form',
    component: TasksDynamicFormComponent,
  },
  {
    path: '',
    redirectTo: 'task-list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
