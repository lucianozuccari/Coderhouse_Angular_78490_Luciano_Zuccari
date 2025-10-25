import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Students } from './students';
import { StudentsForm } from './components/students-form/students-form';
import { StudentsList } from './components/students-list/students-list';

const routes: Routes = [
  {
    path: '',
    component: Students,
    children: [
      {
        path: '',
        component: StudentsList,
      },
      {
        path: 'create',
        component: StudentsForm,
      },
      {
        path: 'edit/:id',
        component: StudentsForm,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
