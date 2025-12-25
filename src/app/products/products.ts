import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  creams: any[] = [];
  loading = true;

  currentPage = 1;
  pageSize = 8;

  get totalPages() {
    return Math.ceil(this.creams.length / this.pageSize);
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("Resolver data:", this.route.snapshot.data);

    this.creams = this.route.snapshot.data['creams'] || [];
    this.loading = false;
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.creams.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  next() { this.goToPage(this.currentPage + 1); }

  prev() { this.goToPage(this.currentPage - 1); }

}
