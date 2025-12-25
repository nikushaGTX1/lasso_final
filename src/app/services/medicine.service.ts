import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private apiUrl = 'https://webapplication1-2jq8.onrender.com/api/Api';

  constructor(private http: HttpClient) {}

  getCreams(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.apiUrl}/get-creams`);
  }
}
