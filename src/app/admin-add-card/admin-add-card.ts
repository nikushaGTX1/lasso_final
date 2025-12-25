import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreamsService } from '../services/creams.service';
import { VitaminsService } from '../services/vitamins.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-admin-add-card',
  templateUrl: './admin-add-card.html',
  styleUrls: ['./admin-add-card.css'],
  standalone: false
})
export class AdminAddCard implements OnInit, OnDestroy {

  cardForm: FormGroup;
  creams: any[] = [];
  editingCard: any = null;

  private sub!: Subscription;

  page = 1;
  pageSize = 6;

  currentBanner = '';

  grids: any = {
    1: '',
    2: '',
    3: '',
    4: ''
  };
  
  // ================= ABOUT TEXTS =================
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

  constructor(
    private fb: FormBuilder,
    private creamsService: CreamsService,
    private vitaminsService: VitaminsService,
    private cdr: ChangeDetectorRef,
    public lang: LangService     // ✅ inject Language Service
  ) {
    this.cardForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      image: [''],
      price: [0, Validators.required],
      category: ['Creams', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCreams();
    this.loadBanner();
    this.loadGrids();
    this.loadTexts();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  /* =======================================
        PRODUCTS
  ======================================= */
  loadCreams() {
    this.sub = this.creamsService.getAll().subscribe(res => {
      this.creams = res || [];
      this.cdr.detectChanges();
    });
  }

  get pagedCreams() {
    const start = (this.page - 1) * this.pageSize;
    return this.creams.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.creams.length / this.pageSize);
  }

  submit() {
    const value = this.cardForm.value as any;

    if (value.category === 'main') {
      if (this.editingCard)
        this.vitaminsService.editVitamin(value).subscribe(() => this.afterSave());
      else
        this.vitaminsService.addVitamin(value).subscribe(() => this.afterSave());
      return;
    }

    if (this.editingCard) {
      this.creamsService.editCream(value).subscribe(() => this.afterSave());
      return;
    }

    this.creamsService.addCream(value).subscribe(() => this.afterSave());
  }

  afterSave() {
    Swal.fire({
      icon: 'success',
      title: this.lang.t('adminSaved'),
      timer: 1200,
      showConfirmButton: false
    });

    this.resetForm();
    this.loadCreams();
  }

  editCard(card: any) {
    this.editingCard = card;
    this.cardForm.patchValue(card);
  }

  deleteCard(card: any) {
    Swal.fire({
      title: `${this.lang.t('adminDelete')} "${card.name}"?`,
      icon: 'warning',
      showCancelButton: true
    }).then(result => {
      if (!result.isConfirmed) return;

      this.creamsService.deleteCream(card.id!).subscribe(() => {
        this.creams = this.creams.filter(c => c.id !== card.id);

        Swal.fire({
          icon: 'success',
          title: this.lang.t('adminDeleted'),
          timer: 900,
          showConfirmButton: false
        });
      });
    });
  }

  resetForm() {
    this.editingCard = null;
    this.cardForm.reset({ category: 'Creams', price: 0 });
  }

  /* =======================================
        ABOUT TEXTS
  ======================================= */
  loadTexts() {
    fetch('https://webapplication1-2jq8.onrender.com/api/Api/about-texts')
      .then(r => r.json())
      .then(r => {
        this.about = { ...this.about, ...(r || {}) };
        this.cdr.detectChanges();
      })
      .catch(err => console.error('Failed to load about texts', err));
  }

  saveTexts() {
    fetch('https://webapplication1-2jq8.onrender.com/api/Api/about-texts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.about)
    })
      .then(r => r.json())
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: this.lang.t('adminAboutSaved'),
          timer: 1200,
          showConfirmButton: false
        });
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Failed to save texts' });
      });
  }

  /* =======================================
        BANNER
  ======================================= */
  loadBanner() {
    fetch('https://webapplication1-2jq8.onrender.com/api/Api/banner')
      .then(r => r.json())
      .then(r => {
        this.currentBanner = r.bannerUrl || '';
        this.cdr.detectChanges();
      });
  }

  uploadBanner(file: File | undefined) {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://webapplication1-2jq8.onrender.com/api/Api/upload-banner', {
      method: 'POST',
      body: formData
    })
      .then(r => r.json())
      .then(r => {
        this.currentBanner = r.bannerUrl;
        this.cdr.detectChanges();

        Swal.fire({
          icon: 'success',
          title: this.lang.t('adminBannerUpdated'),
          timer: 1200,
          showConfirmButton: false
        });
      })
      .catch(() => Swal.fire({ icon: 'error', title: 'Upload Failed!' }));
  }

  /* =======================================
        GRID
  ======================================= */
  loadGrids() {
    fetch('https://webapplication1-2jq8.onrender.com/api/Api/grid')
      .then(r => r.json())
      .then(r => {
        this.grids[1] = r.grid1 || '';
        this.grids[2] = r.grid2 || '';
        this.grids[3] = r.grid3 || '';
        this.grids[4] = r.grid4 || '';

        this.cdr.detectChanges();
      });
  }

  uploadGrid(slot: number, file: File) {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    fetch(`https://webapplication1-2jq8.onrender.com/api/Api/upload-grid/${slot}`, {
      method: 'POST',
      body: formData
    })
      .then(r => r.json())
      .then(r => {
        this.grids[slot] = r.url;
        this.cdr.detectChanges();

        Swal.fire({
          icon: 'success',
          title: `${this.lang.t('adminGridUpdated')} ${slot}!`,
          timer: 1000,
          showConfirmButton: false
        });
      })
      .catch(() => Swal.fire({ icon: 'error', title: 'Upload Failed!' }));
  }

}
