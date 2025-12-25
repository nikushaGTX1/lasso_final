import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cream {
  id?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreamsService {

  private apiUrl = 'https://webapplication1-2jq8.onrender.com/api/Api/get-creams';
  private addUrl = 'https://webapplication1-2jq8.onrender.com/api/Api/add-product';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cream[]> {
    return this.http.get<Cream[]>(this.apiUrl);
  }

  addCream(cream: Cream): Observable<Cream> {
    cream.category = 'Creams';
    return this.http.post<Cream>(this.addUrl, cream);
  }

  editCream(cream: Cream): Observable<Cream> {
    if (!cream.id) {
      throw new Error('Cream ID is required for editing');
    }

    return this.http.put<Cream>(
      `https://webapplication1-2jq8.onrender.com/api/Api/edit-product/${cream.id}`,
      cream
    );
  }

  deleteCream(id: string): Observable<any> {
    return this.http.delete(
      `https://webapplication1-2jq8.onrender.com/api/Api/${id}`
    );
  }
}
