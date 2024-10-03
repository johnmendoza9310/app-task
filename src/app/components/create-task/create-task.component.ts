import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, of, take } from 'rxjs';
import Swal from 'sweetalert2';

import {
  hasSkillValidator,
  minAgeValidator,
  uniquePersonNameValidator,
} from 'src/app/commoms/validators/task-validators';
import {
  ITask,
  ITaskPutResponse,
} from 'src/app/models/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks-service/tasks.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class CreateTaskComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TasksService);
  public tasksForm!: FormGroup;
  tasks: ITask[] = [];
  formSubmitted: boolean = false;

  ngOnInit(): void {
    this._initForm();
    Swal.fire({
      title: 'Cargando',
      html: 'Espere un momento',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.taskService
      .getData()
      .pipe(
        take(1),

        catchError((error: any) => {
          this._openErrorModal(error);
          return of(error);
        })
      )
      .subscribe((data: ITask[]) => {
        this.tasks = data;
        Swal.close();
      });
  }

  addTask(): void {
    this.tasksForm.markAllAsTouched();

    if (this.tasksForm.valid) {
      this.tasks.push(this.tasksForm.value);

      Swal.fire({
        title: 'Cargando',
        html: 'Espere un momento',
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.taskService
        .putData(this.tasks)
        .pipe(
          take(1),
          catchError((error: any) => {
            this._openErrorModal(error);
            return of(error);
          })
        )
        .subscribe((data: ITaskPutResponse) => {
          this.taskService.setTasks(data.record);

          Swal.fire({
            title: '!Excelente¡',
            text: 'Tarea agregada y guardada',
            icon: 'success',
          });
        });
    } else {
      this.formSubmitted = true;
    }
  }

  get personFormArray(): FormArray {
    return this.tasksForm.get('person') as FormArray;
  }

  private _openErrorModal(error: any): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio un error inesperado',
      footer: error,
    });
  }

  getSkillsByPersonIndex(personIndex: number): FormArray {
    return this.personFormArray.at(personIndex).get('skill') as FormArray;
  }

  addPerson(): void {
    const personGroup = this.fb.group({
      personName: [null, [Validators.required, Validators.minLength(5)]],
      age: [null, [Validators.required, minAgeValidator]],
      skill: this.fb.array([], [hasSkillValidator]),
    });
    this.personFormArray.push(personGroup);
  }

  addskillByPersonIndex(personIndex: number): void {
    const skillControl = new FormControl(null, Validators.required);
    this.getSkillsByPersonIndex(personIndex).push(skillControl);
  }
  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkillsByPersonIndex(personIndex).removeAt(skillIndex);
  }

  removePerson(personIndex: number): void {
    this.personFormArray.removeAt(personIndex);
  }

  validateErrors(control: AbstractControl | null): boolean {
    if (!control) {
      return false;
    }
    return !control.valid && control.touched;
  }

  private _initForm(): void {
    this.tasksForm = this.fb.group({
      taskName: [null, Validators.required],
      limitDate: [null, Validators.required],
      taskComplete: [false, Validators.required],
      person: this.fb.array([], [uniquePersonNameValidator]),
    });
  }
}
