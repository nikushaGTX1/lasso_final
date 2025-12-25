import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'https://webapplication1-2jq8.onrender.com/api/Api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, {
      Email: email.trim(),
      Password: password
    })
    .pipe(
      tap(res => {
        console.log("Login Response:", res);

        // SUCCESS CHECK
        if (!res || res.message !== "Login successful") {
          throw new Error("Login failed");
        }

        // Backend has NO TOKEN
        // We will store a fake session value instead
        localStorage.setItem('token', 'SESSION_OK');

        // Save email
        if (res?.user?.email) {
          localStorage.setItem('email', res.user.email);
        } else {
          localStorage.setItem('email', email);
        }

        // Admin check (your rule)
        if (email.toLowerCase() === 'lasso@admin.com') {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.removeItem('isAdmin');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return this.isLoggedIn() && localStorage.getItem('isAdmin') === 'true';
  }

}
