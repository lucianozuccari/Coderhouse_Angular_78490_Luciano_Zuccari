import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../../core/services/students/students';
import { Student, StudentRanks, StudentSpecialization, StudentSpecies } from '../../../../../core/services/students/model/Student';

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
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
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
    this.studentService.students$.subscribe((students) => {
      const student = students.find((s) => s.id === Number(id));
      if (student) {
        // Convertir la fecha a formato YYYY-MM-DD para el input date
        const formattedDate = new Date(student.birthdate).toISOString().split('T')[0];
        this.studentForm.patchValue({
          ...student,
          birthdate: formattedDate
        });
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log('Saving...');
      this.isSaving = true;
      const studentData = {
        ...this.studentForm.value,
        birthdate: new Date(this.studentForm.value.birthdate)
      };

      setTimeout(() => {
        if (this.isEditMode && this.studentId) {
          this.studentService.updateStudent({
            ...studentData, 
            id: Number(this.studentId) 
          } as Student);
        } else {
          this.studentService.addStudent(studentData as Student);
        }
        this.isSaving = false;
        this.goBack();
      }, 800);
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