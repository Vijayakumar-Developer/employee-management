import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.scss']
})
export class EmployeeForm implements OnInit {

  employeeForm: any; // <-- initialize later
  id?: number;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize form here, AFTER fb is available
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [0, [Validators.required, Validators.min(0)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;

    if (this.id) {
      this.load(this.id);
    }
  }

  load(id: number): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (emp: Employee) => {
        this.employeeForm.patchValue(emp);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employee';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = this.employeeForm.value as Employee;

    if (this.id) {
      this.service.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => alert('Update failed')
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => alert('Create failed')
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
