import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  standalone: false,
})
export class Admin implements OnInit {

  products: any[] = [];
  loading = false;

  api = "https://webapplication1-tg9f.onrender.com/api/Api";

  form!: FormGroup;

  page = 1;
  pageSize = 6;

  about: any = {
    About_HeroTitle: '',
    About_HeroText: '',
    About_Who: '',
    About_WhoText: '',
    About_Philosophy: '',
    About_PhilosophyText: '',
    About_Mission: '',
    About_MissionText: '',
    About_Trust: '',
    About_ExploreBtn: ''
  };

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      name: [''],
      price: [''],
      image: [''],
      description: [''],
      category: ['Creams']
    });

    this.loadProducts();
    this.loadTexts();
  }

  // ================= PRODUCTS =================
  loadProducts() {
    this.loading = true;

    this.http.get<any[]>(`${this.api}/get-creams`).subscribe({
      next: res => {
        this.products = res || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert("Failed to load products");
      }
    });
  }

  get pagedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.pageSize);
  }

  setPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
  }

  nextPage() {
    this.setPage(this.page + 1);
  }

  prevPage() {
    this.setPage(this.page - 1);
  }

  addProduct() {
    const product = this.form.value;

    this.http.post(`${this.api}/add-product`, product).subscribe({
      next: () => {
        alert("Product Added!");
        this.form.reset({ category: 'Creams' });
        this.loadProducts();
      },
      error: () => alert("Failed to add product")
    });
  }

  delete(id: string) {
    if (!confirm("Delete product?")) return;

    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => {
        alert("Deleted");
        this.loadProducts();
      },
      error: () => alert("Failed to delete")
    });
  }

  // ================= ABOUT TEXTS =================
  loadTexts() {
    this.http.get<any>(`${this.api}/about-texts`).subscribe({
      next: res => this.about = { ...this.about, ...res },
      error: () => console.log("Failed to load about texts")
    });
  }

  saveTexts() {
    this.http.post(`${this.api}/about-texts`, this.about).subscribe({
      next: () => alert("About texts saved!"),
      error: () => alert("Failed to save about page texts")
    });
  }
}
