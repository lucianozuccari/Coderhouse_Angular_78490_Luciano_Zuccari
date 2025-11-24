import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../../../core/services/students/students';
import {
  Student,
  StudentRanks,
  StudentSpecialization,
  StudentSpecies,
} from '../../../../../core/services/students/model/Student';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import * as StudentsActions from '../../../../../core/store/students/students.actions';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.html',
  styleUrl: './students-form.scss',
})
export class StudentsForm implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId: string | null = null;
  isSaving = false;

  // Obtener los valores directamente de los enums
  species = Object.values(StudentSpecies);
  specializations = Object.values(StudentSpecialization);
  ranks = Object.values(StudentRanks);

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<RootState>
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  initForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthdate: ['', Validators.required],
      species: ['', Validators.required],
      specialization: ['', Validators.required],
      rank: ['', Validators.required],
    });
  }

  checkEditMode() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.isEditMode = true;
      this.loadStudent(this.studentId);
    }
  }

  loadStudent(id: string) {
    this.studentsService.getStudent(Number(id)).subscribe({
      next: (student) => {
        if (student) {
          console.log('Student loaded:', student);
          // Convertir la fecha a formato YYYY-MM-DD para el input date
          const formattedDate = new Date(student.birthdate).toISOString().split('T')[0];
          this.studentForm.patchValue({
            ...student,
            birthdate: formattedDate,
          });
        } else {
          console.error('Student not found');
          this.goBack();
        }
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.goBack();
      },
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.isSaving = true;
      const studentData = {
        ...this.studentForm.value,
        birthdate: this.studentForm.value.birthdate, // Mantener como string para la API
      };

      if (this.isEditMode && this.studentId) {
        // Editar estudiante existente
        const studentToUpdate = { ...studentData, id: Number(this.studentId) } as Student;
        this.studentsService.updateStudent(studentToUpdate).subscribe({
          next: (updatedStudent) => {
            console.log('[StudentsForm] Student updated successfully:', updatedStudent);
            // Actualizar el store - refrescar todos los estudiantes
            this.studentsService.fetchStudents().subscribe({
              next: (students) => {
                this.store.dispatch(StudentsActions.setStudents({ payload: students }));
                this.isSaving = false;
                this.goBack();
              },
            });
          },
          error: (error) => {
            console.error('[StudentsForm] Error updating student:', error);
            this.isSaving = false;
          },
        });
      } else {
        // Crear nuevo estudiante
        this.studentsService.addStudent(studentData as Student).subscribe({
          next: (newStudent) => {
            console.log('[StudentsForm] Student created successfully:', newStudent);
            // Actualizar el store - refrescar todos los estudiantes
            this.studentsService.fetchStudents().subscribe({
              next: (students) => {
                this.store.dispatch(StudentsActions.setStudents({ payload: students }));
                this.isSaving = false;
                this.goBack();
              },
            });
          },
          error: (error) => {
            console.error('[StudentsForm] Error creating student:', error);
            this.isSaving = false;
          },
        });
      }
    } else {
      this.markFormGroupTouched(this.studentForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/students']);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.studentForm.get(fieldName);
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
