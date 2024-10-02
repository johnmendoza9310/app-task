import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TasksDynamicFormComponent } from './components/tasks-dynamic-form/tasks-dynamic-form.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
