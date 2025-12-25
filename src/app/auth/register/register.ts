import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  form!: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'Fill all fields correctly.';
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.error = '';
    this.loading = true;

    console.log('Register data:', this.form.value);

    // later: call API
    // this.auth.register(this.form.value).subscribe(...)
    setTimeout(() => {
      this.success = 'Registered successfully!';
      this.loading = false;
    }, 800);
  }
}
