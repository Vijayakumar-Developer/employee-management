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

  form: any; // <-- initialize later
  id?: number;
  loading = false;
  error = '';
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Initialize form here, AFTER fb is available
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [0, [Validators.required, Validators.min(0)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;
    this.isEdit = !!this.id;

    if (this.id) {
      this.load(this.id);
    }
  }

  load(id: number): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (emp: Employee) => {
        this.form.patchValue(emp);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employee';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as Employee;

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


  goBack(): void {
    this.router.navigate(['/']);
  }
}
