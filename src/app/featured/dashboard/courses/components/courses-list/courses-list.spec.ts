import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteConfirmModalComponent } from '../../../../../shared/components/modals/delete-confirm-modal/delete-confirm-modal.component';

import { CoursesList } from './courses-list';

describe('CoursesList', () => {
  let component: CoursesList;
  let fixture: ComponentFixture<CoursesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesList],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginator,
        MatFormFieldControl,
        MatInputModule,
        MatTableModule,
        RouterTestingModule,
        DeleteConfirmModalComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
