import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<any> {

  constructor(private http: HttpClient) {}

  resolve(): Observable<any> {
    return this.http.get('https://webapplication1-2jq8.onrender.com/api/Api/get-creams');
  }
}
