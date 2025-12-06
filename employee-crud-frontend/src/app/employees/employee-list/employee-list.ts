import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss']
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  loading = false;
  error = '';

  constructor(private service: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => { this.employees = data; this.loading = false; },
      error: (err) => { this.error = 'Failed to load employees'; this.loading = false; console.error(err); }
    });
  }

  deleteEmployee(id?: number): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this employee?')) return;
    this.service.delete(id).subscribe({
      next: () => this.fetch(),
      error: (err) => { console.error(err); alert('Delete failed'); }
    });
  }

  editEmployee(id?: number): void {
    if (!id) return;
    this.router.navigate(['/employees/edit', id]);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/new']);
  }
}
