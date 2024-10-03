import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { take } from 'rxjs';
import { ITask } from 'src/app/models/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks-service/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class TasksListComponent implements OnInit {
  private taskService = inject(TasksService);
  public tasks: ITask[] = [];
  public tasksfilter: ITask[] = [];
  public currentFilter: 'completed' | 'pending' | 'all' = 'all';

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando',
      html: 'Espere un momento',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.taskService
      .getData()
      .pipe(take(1))
      .subscribe((data: ITask[]) => {
        this.tasks = data;
        this.tasksfilter = this.tasks;
        Swal.close();
      });
  }

  filterTaskBycondition(condition: 'completed' | 'pending' | 'all'): void {
    this.currentFilter = condition;

    this.tasksfilter = this.tasks.filter((task) => {
      if (condition === 'completed') {
        return task.taskComplete;
      } else if (condition === 'pending') {
        return !task.taskComplete;
      }
      return true;
    });
  }
}
