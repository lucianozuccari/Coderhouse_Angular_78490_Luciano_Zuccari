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
  CourseAuthority,
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
    this.courseService.getCourse(Number(id)).subscribe({
      next: (course) => {
        if (course) {
          console.log('Curso cargado:', course); // Para debug

          // Asegurarse de que los valores coincidan con los enums
          this.courseForm.patchValue({
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            rankRequired: course.rankRequired,
            language: course.language,
            authority: course.authority,
          });

          console.log('Formulario después de patchValue:', this.courseForm.value); // Para debug
        } else {
          console.error('Curso no encontrado');
          this.goBack();
        }
      },
      error: (error) => {
        console.error('Error al cargar el curso:', error);
        this.goBack();
      },
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.isSaving = true;
      const courseData = this.courseForm.value;

      if (this.isEditMode && this.courseId) {
        // Suscribirse al Observable de updateCourse
        this.courseService
          .updateCourse({
            ...courseData,
            id: Number(this.courseId),
          } as Course)
          .subscribe({
            next: () => {
              this.isSaving = false;
              this.goBack();
            },
            error: (error) => {
              console.error('Error al actualizar el curso:', error);
              this.isSaving = false;
              // Aquí podrías mostrar un mensaje de error al usuario
            },
          });
      } else {
        // Suscribirse al Observable de addCourse
        this.courseService.addCourse(courseData as Course).subscribe({
          next: () => {
            this.isSaving = false;
            this.goBack();
          },
          error: (error) => {
            console.error('Error al crear el curso:', error);
            this.isSaving = false;
            // Aquí podrías mostrar un mensaje de error al usuario
          },
        });
      }
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
