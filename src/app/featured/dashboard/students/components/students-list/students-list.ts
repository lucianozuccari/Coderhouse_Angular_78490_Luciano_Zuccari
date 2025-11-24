import { Component, ViewChild, OnInit } from '@angular/core';
import { Student, studentColumns } from '../../../../../core/services/students/model/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../../core/services/students/students';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { selectAllStudents } from '../../../../../core/store/students/students.selector';
import * as StudentsActions from '../../../../../core/store/students/students.actions';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsList implements OnInit {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);

  isModalVisible = false;
  isDeleting = false;
  studentToDelete: Student | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<RootState>, private studentsService: StudentsService) {
    this.store.select(selectAllStudents).subscribe((students) => {
      console.log('[StudentsList] Students from store:', students);
      this.dataSource.data = students;
    });
  }

  ngOnInit() {
    console.log('[StudentsList] Loading students directly from service');
    // Como los efectos no están registrados, usamos el servicio directamente
    this.studentsService.fetchStudents().subscribe({
      next: (students) => {
        console.log('[StudentsList] Students fetched:', students);
        // Actualizamos el store manualmente
        this.store.dispatch(StudentsActions.setStudents({ payload: students }));
      },
      error: (error) => {
        console.error('[StudentsList] Error fetching students:', error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(student: Student) {
    this.studentToDelete = student;
    this.isModalVisible = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  confirmDelete() {
    if (this.studentToDelete) {
      this.isDeleting = true;

      // Usar el servicio directamente para eliminar
      this.studentsService.deleteStudent(this.studentToDelete.id).subscribe({
        next: () => {
          console.log('[StudentsList] Student deleted successfully');
          // Actualizar el store removiendo el estudiante
          const currentStudents = this.dataSource.data;
          const updatedStudents = currentStudents.filter((s) => s.id !== this.studentToDelete!.id);
          this.store.dispatch(StudentsActions.setStudents({ payload: updatedStudents }));

          // Cerrar modal
          this.isDeleting = false;
          this.isModalVisible = false;
          this.studentToDelete = null;
        },
        error: (error) => {
          console.error('[StudentsList] Error deleting student:', error);
          this.isDeleting = false;
        },
      });
    }
  }

  getConfirmMessage(): string {
    if (this.studentToDelete) {
      return `¿Estás seguro de que deseas eliminar el estudiante ${this.studentToDelete.name}?`;
    }
    return '¿Estás seguro de que deseas eliminar este estudiante?';
  }

  closeModal() {
    if (!this.isDeleting) {
      this.isModalVisible = false;
      this.studentToDelete = null;
    }
  }
}
