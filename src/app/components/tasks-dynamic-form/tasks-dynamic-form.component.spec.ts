import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDynamicFormComponent } from './tasks-dynamic-form.component';

describe('TasksDynamicFormComponent', () => {
  let component: TasksDynamicFormComponent;
  let fixture: ComponentFixture<TasksDynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksDynamicFormComponent]
    });
    fixture = TestBed.createComponent(TasksDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
