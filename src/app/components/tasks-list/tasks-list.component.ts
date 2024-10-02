import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { ITask } from 'src/app/models/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks-service/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class TasksListComponent implements OnInit {

  ngOnInit(): void {

  }
}
