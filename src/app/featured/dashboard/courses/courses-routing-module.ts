import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './courses';
import { CoursesList } from './components/courses-list/courses-list';
import { CoursesForm } from './components/courses-form/courses-form';

const routes: Routes = [
  {
    path: '',
    component: Courses,
    children: [
      {
        path: '',
        component: CoursesList,
      },
      {
        path: 'create',
        component: CoursesForm,
      },
      {
        path: 'edit/:id',
        component: CoursesForm,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
