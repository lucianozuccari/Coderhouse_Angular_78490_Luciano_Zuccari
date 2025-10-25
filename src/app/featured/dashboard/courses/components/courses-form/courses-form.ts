import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../../../core/services/courses/courses';
import { 
  Course, 
  CourseLevel, 
  CourseRanks, 
  CourseCategory, 
  CourseLanguage, 
  CourseAuthority 
} from '../../../../../core/services/courses/model/Course';

@Component({
  selector: 'app-courses-form',
  standalone: false,
  templateUrl: './courses-form.html',
  styleUrl: './courses-form.scss',
})
export class CoursesForm implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;
  courseId: string | null = null;
  isSaving = false;

  // Obtener los valores directamente de los enums
  categories = Object.values(CourseCategory);
  levels = Object.values(CourseLevel);
  ranks = Object.values(CourseRanks);
  languages = Object.values(CourseLanguage);
  authorities = Object.values(CourseAuthority);

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  initForm() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      level: ['', Validators.required],
      rankRequired: ['', Validators.required],
      language: ['', Validators.required],
      authority: ['', Validators.required],
    });
  }

  checkEditMode() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditMode = true;
      this.loadCourse(this.courseId);
    }
  }

  loadCourse(id: string) {
    this.courseService.courses$.subscribe((courses) => {
      const course = courses.find((c) => c.id === Number(id));
      if (course) {
        this.courseForm.patchValue(course);
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log('Saving...');
      this.isSaving = true;
      const courseData = this.courseForm.value;

      setTimeout(() => {
        if (this.isEditMode && this.courseId) {
          this.courseService.updateCourse({ 
            ...courseData, 
            id: Number(this.courseId) 
          } as Course);
        } else {
          this.courseService.addCourse(courseData as Course);
        }
        this.isSaving = false;
        this.goBack();
      }, 800);
    } else {
      this.markFormGroupTouched(this.courseForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/courses']);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.courseForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  }
}