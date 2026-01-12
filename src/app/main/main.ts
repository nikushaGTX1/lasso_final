import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Main implements OnInit {

  // ===== Hero / Grids =====
  bannerUrl = '';
  grid1 = '';
  grid2 = '';
  grid3 = '';
  grid4 = '';
  grid5 = '';
  grid6 = '';
  grid7 = '';

  // ===== Products =====
  products: any[] = [];

  constructor(
    private http: HttpClient,
    public lang: LangService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  // ===============================
  // Load banner, grids, products in parallel
  // ===============================
  private loadAllData(): void {
    forkJoin({
      banner: this.http.get<any>('https://webapplication1-tg9f.onrender.com/api/Api/banner'),
      grid: this.http.get<any>('https://webapplication1-tg9f.onrender.com/api/Api/grid'),
      products: this.http.get<any>('https://webapplication1-tg9f.onrender.com/api/Api/get-vitamins')
    }).subscribe({
      next: ({ banner, grid, products }) => {

        // ===== Banner =====
        this.bannerUrl = banner?.bannerUrl ?? '';
        if (this.bannerUrl) this.preloadImage(this.bannerUrl);

        // ===== Grid Images =====
        this.grid1 = grid?.grid1 ?? ''; if (this.grid1) this.preloadImage(this.grid1);
        this.grid2 = grid?.grid2 ?? ''; if (this.grid2) this.preloadImage(this.grid2);
        this.grid3 = grid?.grid3 ?? ''; if (this.grid3) this.preloadImage(this.grid3);
        this.grid4 = grid?.grid4 ?? ''; if (this.grid4) this.preloadImage(this.grid4);
        this.grid5 = grid?.grid5 ?? ''; if (this.grid5) this.preloadImage(this.grid5);
        this.grid6 = grid?.grid6 ?? ''; if (this.grid6) this.preloadImage(this.grid6);
        this.grid7 = grid?.grid7 ?? ''; if (this.grid7) this.preloadImage(this.grid7);

        // ===== Products =====
        const items: any[] = Array.isArray(products) ? products
          : Array.isArray(products?.data) ? products.data
          : Array.isArray(products?.vitamins) ? products.vitamins
          : [];
        this.products = items;

        // ===== Detect changes once =====
        this.cdr.detectChanges();
      },
      error: err => console.error('❌ Data load failed', err)
    });
  }

  // ===============================
  // Preload images for faster rendering
  // ===============================
  private preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }

}
