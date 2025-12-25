import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class Main implements OnInit {

  main: any;

  bannerUrl: string = '';

  grid1: string = '';
  grid2: string = '';
  grid3: string = '';
  grid4: string = '';
  grid5: string = '';
  grid6: string = '';
  grid7: string = '';

  constructor(
    private http: HttpClient,
    public lang: LangService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    // ======================
    // LOAD BANNER IMAGE
    // ======================
    this.http.get<any>('https://webapplication1-2jq8.onrender.com/api/Api/banner')
      .subscribe({
        next: res => {
          this.bannerUrl = res?.bannerUrl || '';
          console.log("✅ Loaded Banner:", this.bannerUrl);
          this.cdr.detectChanges();
        },
        error: err => console.error("❌ Banner Load Failed:", err)
      });


    // ======================
    // LOAD GRID IMAGES (1–7)
    // ======================
    this.http.get<any>('https://webapplication1-2jq8.onrender.com/api/Api/grid')
      .subscribe({
        next: res => {
          console.log("🧩 GRID DATA:", res);

          this.grid1 = res?.grid1 || '';
          this.grid2 = res?.grid2 || '';
          this.grid3 = res?.grid3 || '';
          this.grid4 = res?.grid4 || '';
          this.grid5 = res?.grid5 || '';
          this.grid6 = res?.grid6 || '';
          this.grid7 = res?.grid7 || '';

          this.cdr.detectChanges();
        },
        error: err => console.error("❌ Grid Load Failed:", err)
      });


    // ======================
    // LOAD MAIN PAGE DATA
    // ======================
    this.http.get(
      'https://webapplication1-2jq8.onrender.com/api/Api/get-vitamins'
    )
      .subscribe({
        next: (res: any) => {

          console.log("🔥 RAW RESPONSE FROM API:", res);

          let items: any[] = [];

          if (Array.isArray(res)) items = res;
          else if (res?.data && Array.isArray(res.data)) items = res.data;
          else if (res?.vitamins && Array.isArray(res.vitamins)) items = res.vitamins;
          else {
            console.error("❌ Unknown response format");
            return;
          }

          this.main = items.find(
            x => (x.category || x.Category) === 'main'
          );

          console.log("✅ MAIN PAGE DATA:", this.main);
        },
        error: err => console.error("❌ API ERROR:", err)
      });

  }

}
