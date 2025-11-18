import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Students } from './students';

describe('Students', () => {
  let component: Students;
  let fixture: ComponentFixture<Students>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [Students],
    }).compileComponents();

    fixture = TestBed.createComponent(Students);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
