import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsResolver implements Resolve<any> {

  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.http
      .get<any[]>('https://webapplication1-tg9f.onrender.com/api/Api/get-creams')
      .pipe(
        map(list => list.find(p => p.id === id) ?? null)
      );
  }
}
