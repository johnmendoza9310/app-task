import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITask } from 'src/app/models/interfaces/task.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class CreateTaskComponent implements OnInit {
  private fb = inject(FormBuilder);
  public tasksForm!: FormGroup;
  public tasks: ITask[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._initForm();
    // Swal.fire({
    //   title: 'Cargando',
    //   html: 'Espere un momento',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // }).finally(() => {
    //   this._initForm();
    //   Swal.close();
    // });
  }

  updateTasks(): void {
    console.log('Formulario tareas:', this.tasksForm.value);
  }

  addTask(): void {
    this.tasks.push(this.tasksForm.value);
    console.log('tareas', this.tasks);
  }

  get personFormArray(): FormArray {
    return this.tasksForm.get('person') as FormArray;
  }

  getSkillsByPersonIndex(personIndex: number): FormArray {
    return this.personFormArray.at(personIndex).get('skill') as FormArray;
  }

  addPerson(): void {
    const personGroup = this.fb.group({
      personName: [null, Validators.required],
      age: [null, Validators.required],
      skill: this.fb.array([]),
    });
    this.personFormArray.push(personGroup);
  }

  addskillByPersonIndex(personIndex: number): void {
    const skillControl = new FormControl(null, Validators.required); // Simple FormControl
    this.getSkillsByPersonIndex(personIndex).push(skillControl);
  }
  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkillsByPersonIndex(personIndex).removeAt(skillIndex);
  }

  removePerson(personIndex: number): void {
    this.personFormArray.removeAt(personIndex);
  }

  private _initForm(): void {
    this.tasksForm = this.fb.group({
      taskName: [null, Validators.required],
      limitDate: [null, Validators.required],
      taskComplete: [false, Validators.required],
      person: this.fb.array([]), // FormArray para las personas
    });
  }
}
