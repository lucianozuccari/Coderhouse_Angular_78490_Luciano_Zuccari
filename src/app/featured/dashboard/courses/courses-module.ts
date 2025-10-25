import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing-module';
import { Courses } from './courses';
import { CoursesForm } from './components/courses-form/courses-form';
import { CoursesList } from './components/courses-list/courses-list';
import { SharedModule } from '../../../shared/shared-module';
import { DeleteConfirmModalComponent } from '../../../shared/components/modals/delete-confirm-modal/delete-confirm-modal.component';


@NgModule({
  declarations: [
    Courses,
    CoursesForm,
    CoursesList
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    DeleteConfirmModalComponent
  ]
})
export class CoursesModule { }
