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

  species = [
    { value: StudentSpecies.HUMAN, label: 'Human' },
    { value: StudentSpecies.TWI_LEK, label: "Twi'lek" },
    { value: StudentSpecies.CHISS, label: 'Chiss' },
    { value: StudentSpecies.ZABRAK, label: 'Zabrak' },
    { value: StudentSpecies.RODIAN, label: 'Rodian' },
    { value: StudentSpecies.TRANDOSHAN, label: 'Trandoshan' },
    { value: StudentSpecies.MON_CALAMARI, label: 'Mon Calamari' },
    { value: StudentSpecies.WOOKIEE, label: 'Wookiee' },
    { value: StudentSpecies.BOTHAN, label: 'Bothan' },
    { value: StudentSpecies.DUROS, label: 'Duros' },
    { value: StudentSpecies.TOGRUTA, label: 'Togruta' },
    { value: StudentSpecies.NAUTOLAN, label: 'Nautolan' },
    { value: StudentSpecies.MIRIALAN, label: 'Mirialan' },
    { value: StudentSpecies.DATHOMIRIAN, label: 'Dathomirian' },
    { value: StudentSpecies.GEONOSIAN, label: 'Geonosian' }
  ];

  specializations = [
    { value: StudentSpecialization.COMBAT_PILOT, label: 'Combat Pilot' },
    { value: StudentSpecialization.DIPLOMACY, label: 'Diplomacy & Relations' },
    { value: StudentSpecialization.LOGISTICS, label: 'Logistics & Supply' },
    { value: StudentSpecialization.INFANTRY, label: 'Infantry Operations' },
    { value: StudentSpecialization.AT_PILOT, label: 'AT Walker Pilot' },
    { value: StudentSpecialization.COMMAND_CONTROL, label: 'Command & Control' },
    { value: StudentSpecialization.PROVISIONS, label: 'Provisions & Resources' },
    { value: StudentSpecialization.ADMINISTRATION, label: 'Imperial Administration' },
    { value: StudentSpecialization.INTELLIGENCE, label: 'Intelligence & Espionage' },
    { value: StudentSpecialization.NAVAL_OPERATIONS, label: 'Naval Operations' },
    { value: StudentSpecialization.ENGINEERING, label: 'Military Engineering' },
    { value: StudentSpecialization.MEDICAL_CORPS, label: 'Medical Corps' },
    { value: StudentSpecialization.COMMUNICATIONS, label: 'Communications & Signals' },
    { value: StudentSpecialization.SPECIAL_FORCES, label: 'Special Forces' },
    { value: StudentSpecialization.ARTILLERY, label: 'Artillery & Heavy Weapons' }
  ];

  ranks = [
    { value: StudentRanks.CADET, label: 'Cadet' },
    { value: StudentRanks.SUBOFFICER, label: 'Subofficer' },
    { value: StudentRanks.OFFICER, label: 'Officer' },
    { value: StudentRanks.COMMANDER, label: 'Commander' },
    { value: StudentRanks.MOFF, label: 'Moff' },
    { value: StudentRanks.SITH_LORD, label: 'Sith Lord' }
  ];

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentService,
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
    this.studentsService.students$.subscribe((students) => {
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
          this.studentsService.updateStudent({ 
            ...studentData, 
            id: Number(this.studentId) 
          } as Student);
        } else {
          this.studentsService.addStudent(studentData as Student);
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