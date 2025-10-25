import { Component, ViewChild } from '@angular/core';
import { Course, courseColumns } from '../../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../../core/services/courses/courses';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList {
  displayedColumns: string[] = courseColumns;
  dataSource = new MatTableDataSource<Course>([]);

  isModalVisible = false;
  isDeleting = false;
  courseToDelete: Course | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private courseService: CoursesService) {
    this.courseService.courses$.subscribe((courses) => {
      this.dataSource.data = courses;
    });
  }

  ngOnInit() {
    this.courseService.getCourses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(course: Course) {
    this.courseToDelete = course;
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
    if (this.courseToDelete) {
      this.isDeleting = true;
      setTimeout(() => {
        this.courseService.deleteCourse(this.courseToDelete!.id);
        this.isDeleting = false;
        this.isModalVisible = false;
        this.courseToDelete = null;
      }, 500);
    }
  }

  getConfirmMessage(): string {
    if (this.courseToDelete) {
      return `¿Estás seguro de que deseas eliminar el curso ${this.courseToDelete.title}?`;
    }
    return '¿Estás seguro de que deseas eliminar este curso?';
  }

  closeModal() {
    if (!this.isDeleting) {
      this.isModalVisible = false;
      this.courseToDelete = null;
    }
  }
}
