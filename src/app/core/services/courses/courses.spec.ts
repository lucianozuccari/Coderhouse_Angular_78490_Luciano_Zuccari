import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses';
import {
  Course,
  CourseCategory,
  CourseLevel,
  CourseRanks,
  CourseLanguage,
  CourseAuthority,
} from './model/Course';
import { API_URL } from '../../utils/constants';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

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

  const mockCourses: Course[] = [
    mockCourse,
    {
      id: 2,
      title: 'Advanced Course',
      description: 'An advanced test course',
      category: CourseCategory.SITH_ARTS,
      level: CourseLevel.ADVANCED,
      rankRequired: CourseRanks.SITH_LORD,
      language: CourseLanguage.HUTTESE,
      authority: CourseAuthority.SITH_ORDER,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchCourses', () => {
    it('should return courses from API', () => {
      service.fetchCourses().subscribe((courses) => {
        expect(courses).toEqual(mockCourses);
        expect(courses.length).toBe(2);
      });

      const req = httpMock.expectOne(`${API_URL}/courses`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCourses);
    });

    it('should handle error and return empty array', () => {
      service.fetchCourses().subscribe((courses) => {
        expect(courses).toEqual([]);
      });

      const req = httpMock.expectOne(`${API_URL}/courses`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getCourse', () => {
    it('should return a specific course', () => {
      const courseId = 1;

      service.getCourse(courseId).subscribe((course) => {
        expect(course).toEqual(mockCourse);
      });

      const req = httpMock.expectOne(`${API_URL}/courses/${courseId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCourse);
    });

    it('should handle error and return undefined', () => {
      const courseId = 999;

      service.getCourse(courseId).subscribe((course) => {
        expect(course).toBeUndefined();
      });

      const req = httpMock.expectOne(`${API_URL}/courses/${courseId}`);
      req.error(new ErrorEvent('Course not found'));
    });
  });

  describe('addCourse', () => {
    it('should add a new course', () => {
      const newCourse: Course = { ...mockCourse, id: 0 }; // Sin ID para nuevo curso
      const createdCourse: Course = { ...mockCourse, id: 3 };

      service.addCourse(newCourse).subscribe((course) => {
        expect(course).toEqual(createdCourse);
      });

      const req = httpMock.expectOne(`${API_URL}/courses`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newCourse);
      req.flush(createdCourse);
    });

    it('should handle error when adding course', () => {
      const newCourse: Course = { ...mockCourse, id: 0 };

      service.addCourse(newCourse).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${API_URL}/courses`);
      req.error(new ErrorEvent('Server error'));
    });
  });

  describe('updateCourse', () => {
    it('should update an existing course', () => {
      const updatedCourse: Course = { ...mockCourse, title: 'Updated Course' };

      service.updateCourse(updatedCourse).subscribe((course) => {
        expect(course).toEqual(updatedCourse);
      });

      const req = httpMock.expectOne(`${API_URL}/courses/${updatedCourse.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedCourse);
      req.flush(updatedCourse);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', () => {
      const courseId = 1;

      service.deleteCourse(courseId).subscribe(() => {
        // El delete no retorna nada, solo verificamos que se complete
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${API_URL}/courses/${courseId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should handle error when deleting course', () => {
      const courseId = 999;

      service.deleteCourse(courseId).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${API_URL}/courses/${courseId}`);
      req.error(new ErrorEvent('Course not found'));
    });
  });
});
