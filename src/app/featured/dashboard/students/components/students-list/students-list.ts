import { Component, ViewChild } from '@angular/core';
import { Student, studentColumns } from '../../../../../core/services/students/model/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from '../../../../../core/services/students/students';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsList {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);

  isModalVisible = false;
  isDeleting = false;
  studentToDelete: Student | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentService: StudentService) {
    this.studentService.students$.subscribe((students) => {
      this.dataSource.data = students;
    });
  }

  ngOnInit() {
    this.studentService.getStudents();
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
      setTimeout(() => {
        this.studentService.deleteStudent(this.studentToDelete!.id);
        this.isDeleting = false;
        this.isModalVisible = false;
        this.studentToDelete = null;
      }, 500);
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
