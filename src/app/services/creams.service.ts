import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cream {
  id?: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreamsService {

  private base = 'https://webapplication1-tg9f.onrender.com/api/Api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cream[]> {
    return this.http.get<Cream[]>(`${this.base}/get-creams`);
  }

  // ================= ADD =================
  addCream(data: FormData): Observable<any> {
    return this.http.post(`${this.base}/add-product`, data);
  }

  // ================= EDIT =================
  editCream(cream: Cream): Observable<Cream> {
    if (!cream.id) throw new Error('Cream ID is required for editing');

    return this.http.put<Cream>(
      `${this.base}/edit-product/${cream.id}`,
      cream
    );
  }

  // ================= DELETE =================
  deleteCream(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
