import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VitaminsService {

  api = 'https://webapplication1-2jq8.onrender.com/api/Api';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.api}/get-vitamins`);
  }

  addVitamin(data: any) {
    return this.http.post<any>(`${this.api}/add-vitamin`, data);
  }

  editVitamin(data: any) {
    return this.http.put<any>(`${this.api}/edit-vitamin`, data);
  }

  deleteVitamin(id: number) {
    return this.http.delete(`${this.api}/delete-vitamin/${id}`);
  }
}
