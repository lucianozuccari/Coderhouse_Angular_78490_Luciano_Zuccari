import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CoursesList } from './courses-list';
import { CoursesService } from '../../../../../core/services/courses/courses';
import {
  Course,
  CourseCategory,
  CourseLevel,
  CourseRanks,
  CourseLanguage,
  CourseAuthority,
} from '../../../../../core/services/courses/model/Course';

describe('CoursesList Component', () => {
  let component: CoursesList;
  let fixture: ComponentFixture<CoursesList>;

  const mockCourse: Course = {
    id: 1,
    title: 'Test Course',
    description: 'A test course description',
    category: CourseCategory.COMBAT_TACTICS,
    level: CourseLevel.BEGINNER,
    rankRequired: CourseRanks.CADET,
    language: CourseLanguage.BASIC,
    authority: CourseAuthority.REPUBLIC_ACADEMY,
  };

  beforeEach(async () => {
    const mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([mockCourse])),
      dispatch: jasmine.createSpy('dispatch'),
    };

    const mockCoursesService = {
      fetchCourses: jasmine.createSpy('fetchCourses').and.returnValue(of([mockCourse])),
      deleteCourse: jasmine.createSpy('deleteCourse').and.returnValue(of(void 0)),
    };

    await TestBed.configureTestingModule({
      declarations: [CoursesList],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: CoursesService, useValue: mockCoursesService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayedColumns', () => {
    expect(component.displayedColumns).toBeDefined();
    expect(component.displayedColumns.length).toBeGreaterThan(0);
  });

  it('should initialize dataSource', () => {
    expect(component.dataSource).toBeDefined();
  });

  it('should set course to delete when onDelete is called', () => {
    component.onDelete(mockCourse);

    expect(component.courseToDelete).toEqual(mockCourse);
    expect(component.isModalVisible).toBe(true);
  });

  it('should close modal when closeModal is called', () => {
    component.isModalVisible = true;
    component.courseToDelete = mockCourse;

    component.closeModal();

    expect(component.isModalVisible).toBe(false);
    expect(component.courseToDelete).toBeNull();
  });

  it('should return confirm message with course title', () => {
    component.courseToDelete = mockCourse;

    const message = component.getConfirmMessage();

    expect(message).toContain(mockCourse.title);
  });

  it('should return default message when no course selected', () => {
    component.courseToDelete = null;

    const message = component.getConfirmMessage();

    expect(message).toBe('¿Estás seguro de que deseas eliminar este curso?');
  });
});
