import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false
})
export class Login implements OnInit {

  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    public lang: LangService
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {


      if (this.auth.isAdmin()) {
        this.router.navigate(['/admin-cards']);
        return;
      }

      this.router.navigate(['/']);
    }
  }

submit() {
  this.error = '';
  this.loading = true;

  this.auth.login(this.email, this.password)
    .subscribe({
      next: (res) => {
        this.loading = false;
        console.log("LOGIN SUCCESS", res);
        this.router.navigate(['/admin-cards']);
      },
      error: (err) => {
        this.loading = false;

        console.log("LOGIN ERROR", err);

        if (err?.status === 0) {
          this.error = 'Cannot reach server. Backend offline or CORS blocked.';
        } 
        else if (err?.status === 401) {
          this.error = 'Wrong email or password';
        } 
        else {
          this.error = 'Unexpected error — check console';
        }
      }
    });
}



}
