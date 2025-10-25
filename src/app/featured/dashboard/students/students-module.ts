import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing-module';
import { Students } from './students';
import { StudentsList } from './components/students-list/students-list';
import { StudentsForm } from './components/students-form/students-form';
import { SharedModule } from '../../../shared/shared-module';
import { DeleteConfirmModalComponent } from '../../../shared/components/modals/delete-confirm-modal/delete-confirm-modal.component';


@NgModule({
  declarations: [
    Students,
    StudentsList,
    StudentsForm
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    DeleteConfirmModalComponent
  ]
})
export class StudentsModule { }
