import { Component, ViewChild, OnInit } from '@angular/core';
import { Course, courseColumns } from '../../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { selectAllCourses } from '../../../../../core/store/courses/courses.selector';
import * as CoursesActions from '../../../../../core/store/courses/courses.actions';
import { CoursesService } from '../../../../../core/services/courses/courses';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList implements OnInit {
  displayedColumns: string[] = courseColumns;
  dataSource = new MatTableDataSource<Course>([]);

  isModalVisible = false;
  isDeleting = false;
  courseToDelete: Course | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<RootState>, private coursesService: CoursesService) {
    this.store.select(selectAllCourses).subscribe((courses) => {
      console.log('[CoursesList] Courses from store:', courses);
      this.dataSource.data = courses;
    });
  }

  ngOnInit() {
    console.log('[CoursesList] Loading courses directly from service');
    // Como los efectos no están registrados, usamos el servicio directamente
    this.coursesService.fetchCourses().subscribe({
      next: (courses) => {
        console.log('[CoursesList] Courses fetched:', courses);
        // Actualizamos el store manualmente
        this.store.dispatch(CoursesActions.setCourses({ payload: courses }));
      },
      error: (error) => {
        console.error('[CoursesList] Error fetching courses:', error);
      },
    });
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

      // Usar el servicio directamente para eliminar
      this.coursesService.deleteCourse(this.courseToDelete.id).subscribe({
        next: () => {
          console.log('[CoursesList] Course deleted successfully');
          // Actualizar el store removiendo el curso
          const currentCourses = this.dataSource.data;
          const updatedCourses = currentCourses.filter((c) => c.id !== this.courseToDelete!.id);
          this.store.dispatch(CoursesActions.setCourses({ payload: updatedCourses }));

          // Cerrar modal
          this.isDeleting = false;
          this.isModalVisible = false;
          this.courseToDelete = null;
        },
        error: (error) => {
          console.error('[CoursesList] Error deleting course:', error);
          this.isDeleting = false;
        },
      });
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
