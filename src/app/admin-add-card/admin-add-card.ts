import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreamsService } from '../services/creams.service';
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
    grid1: '',
    grid2: '',
    grid3: '',
    grid4: '',
    grid5: '',
    grid6: '',
    grid7: ''
  };

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

  // FILE HOLDER
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private creamsService: CreamsService,
    private cdr: ChangeDetectorRef,
    public lang: LangService
  ) {
    this.cardForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      image: [''],                   // optional direct URL
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

  // ================= FILE SELECT =================
  onFileSelected(event: any) {
    this.selectedFile = event.target.files?.[0] ?? null;
  }

  // ================= PRODUCTS =================
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
    const value = this.cardForm.value;

    // ================= EDIT MODE (still JSON for now)
    if (this.editingCard) {
      this.creamsService.editCream(value).subscribe(() => this.afterSave());
      return;
    }

    // ================= ADD MODE (FormData)
    const formData = new FormData();

    formData.append('name', value.name ?? '');
    formData.append('description', value.description ?? '');
    formData.append('category', value.category ?? 'Creams');
    formData.append('price', String(value.price ?? 0));

    // optional image URL
    if (value.image) {
      formData.append('image', value.image);
    }

    // uploaded file
    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    this.creamsService.addCream(formData).subscribe({
      next: () => this.afterSave(),
      error: err => {
        console.error('UPLOAD FAILED', err);
        Swal.fire({ icon: 'error', title: 'Upload Failed!' });
      }
    });
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
    this.selectedFile = null;
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
    this.selectedFile = null;
    this.cardForm.reset({ category: 'Creams', price: 0 });
  }

  // ================= ABOUT TEXTS =================
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
      .catch(() =>
        Swal.fire({ icon: 'error', title: 'Failed to save texts' })
      );
  }

  // ================= BANNER =================
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

  // ================= GRID =================
  loadGrids() {
    fetch('https://webapplication1-2jq8.onrender.com/api/Api/grid')
      .then(r => r.json())
      .then(r => {
        this.grids = r || {};
        this.cdr.detectChanges();
      });
  }

  uploadGrid(slot: number, file: File | undefined) {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    fetch(`https://webapplication1-2jq8.onrender.com/api/Api/upload-grid/${slot}`, {
      method: 'POST',
      body: formData
    })
      .then(r => r.json())
      .then(r => {
        this.grids[`grid${slot}`] = r.url;
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

  deleteGrid(slot: number) {
    fetch(`https://webapplication1-2jq8.onrender.com/api/Api/grid/${slot}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.grids[`grid${slot}`] = '';
        this.cdr.detectChanges();

        Swal.fire({
          icon: 'success',
          title: `Grid ${slot} deleted`,
          timer: 900,
          showConfirmButton: false
        });
      })
      .catch(() =>
        Swal.fire({ icon: 'error', title: 'Delete Failed!' })
      );
  }

}
