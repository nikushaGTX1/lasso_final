import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css']
})
export class Navigation {

  isAdmin = false;
  mobileOpen = false;

  constructor(
    private router: Router,
    public lang: LangService
  ) {
    this.checkAdmin();
  }

  checkAdmin() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    this.isAdmin = !!token && email === 'lasso@admin.com';
  }

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  goLogin() {
    this.router.navigate(['/login']);
    this.mobileOpen = false;
  }

  goAdmin() {
    this.router.navigate(['/admin-cards']);
    this.mobileOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isAdmin = false;

    this.router.navigate(['/']);
    this.mobileOpen = false;
  }
}
