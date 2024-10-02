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
  selector: 'app-tasks-dynamic-form',
  templateUrl: './tasks-dynamic-form.component.html',
  styleUrls: ['./tasks-dynamic-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class TasksDynamicFormComponent {
  private taskService = inject(TasksService);
  private fb = inject(FormBuilder);
  public tasksForm!: FormArray;
  public taskGroup!: FormGroup;
  public tasks: ITask[] = [];
  public tasksfilter: ITask[] = [];
  public currentFilter: 'completed' | 'pending' | 'all' = 'all';
  public matchedIndexes: number[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando',
      html: 'Espere un momento',
      didOpen: () => {
        Swal.showLoading();
      },
    }),
      this._initForm();

    this.taskService
      .getData()
      .pipe(take(1))
      .subscribe((data: ITask[]) => {
        this.tasks = data;
        this.tasksfilter = this.tasks;

        if (data.length > 0) {
          this.loadTasks();
        }
      });
  }

  filterTaskBycondition(condition: 'completed' | 'pending' | 'all'): void {
    this.matchedIndexes = [];
    this.currentFilter = condition;

    this.tasksfilter = this.tasks.filter((task, index) => {
      let matches = false;

      if (condition === 'completed') {
        matches = task.taskComplete;
      } else if (condition === 'pending') {
        matches = !task.taskComplete;
      } else {
        matches = true;
      }

      //Guardar indices que aplican al filtro
      if (matches) {
        this.matchedIndexes.push(index);
      }

      return matches;
    });

    console.log('this.matchedIndexes', this.matchedIndexes);
  }
  private loadTasks(): void {
    this.tasksfilter.forEach((task, index) => {
      const taskGroup = this.fb.group({
        taskName: [task.taskName, Validators.required],
        limitDate: [task.limitDate, Validators.required],
        taskComplete: [task.taskComplete, [Validators.required]],
        person: this.fb.array([]),
      });

      if (task?.person?.length > 0) {
        const personArray = taskGroup.get('person') as FormArray;
        task.person.forEach((person) => {
          const personGroup = this.fb.group({
            personName: [person.personName, [Validators.required]],
            age: [person.age, [Validators.required]],
            skill: this.fb.array(
              person.skill.map((skill) =>
                this.fb.group({
                  skill: [skill, [Validators.required]],
                })
              )
            ),
          });
          personArray.push(personGroup);
        });
      }

      this.matchedIndexes.push(index);

      this.tasksForm.push(taskGroup);
    });

    Swal.close();
  }

  updateTasks(): void {
    console.log('formulario tareas', this.tasksForm);
  }

  addTask(): void {
    const taskGroup = this.fb.group({
      taskName: [null, Validators.required],
      limitDate: [null, Validators.required],
      taskComplete: [false, [Validators.required]],
      person: this.fb.array([]), // FormArray para las personas
    });
    this.tasksForm.push(taskGroup);

    const newTask: ITask = taskGroup.value as ITask;
    //Actualizar el array original de tareas
    this.tasks.push(newTask);

    //Actualizar filtros depués de agregar una tarea al formulario
    this.filterTaskBycondition(this.currentFilter);
  }
  personByTaskIndex(index: number): FormArray {
    return this.tasksForm.at(index).get('person') as FormArray;
  }

  skillByIndex(taskIndex: number, personIndex: number): FormArray {
    return this.personByTaskIndex(taskIndex)
      .at(personIndex)
      .get('skill') as FormArray;
  }

  addPersonByTaskIndex(taskIndex: number): void {
    const personGroup = this.fb.group({
      personName: [null, [Validators.required]],
      age: [null, [Validators.required]],
      skill: this.fb.array([]), // Asegúrate de que esto sea un FormArray
    });

    this.personByTaskIndex(taskIndex).push(personGroup);
  }
  addskillByIndex(taskIndex: number, personIndex: number): void {
    const skill = this.personByTaskIndex(taskIndex)
      .at(personIndex)
      .get('skill') as FormArray;

    const skillGroup = this.fb.group({
      skill: [null, [Validators.required]],
    });

    skill.push(skillGroup);
  }

  private _initForm(): void {
    this.taskGroup = this.fb.group({
      tasksForm: this.fb.array([]),
    });
    this.tasksForm = this.taskGroup.get('tasksForm') as FormArray;
  }

  changeState(taskIndex: number, event: any) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    this.tasks[taskIndex].taskComplete = isChecked;
  }
}
