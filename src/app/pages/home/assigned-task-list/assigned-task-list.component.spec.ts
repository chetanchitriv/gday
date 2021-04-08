import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTaskListComponent } from './assigned-task-list.component';

describe('AssignedTaskListComponent', () => {
  let component: AssignedTaskListComponent;
  let fixture: ComponentFixture<AssignedTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
