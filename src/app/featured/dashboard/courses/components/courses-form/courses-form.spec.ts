import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CoursesForm } from './courses-form';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('CoursesForm', () => {
  let component: CoursesForm;
  let fixture: ComponentFixture<CoursesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesForm],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginator,
        MatFormFieldControl,
        MatInputModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
