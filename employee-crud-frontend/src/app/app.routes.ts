import { provideRouter, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeList } from './employees/employee-list/employee-list';
import { EmployeeForm } from './employees/employee-form/employee-form';

export const routes: Routes = [
  { path: '', component: EmployeeList },
  { path: 'employees/new', component: EmployeeForm },
  { path: 'employees/edit/:id', component: EmployeeForm },
  { path: '**', redirectTo: '' }
];
