import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CreamsService } from '../services/creams.service';
import { LangService } from '../services/lang.service';

interface GridMap {
  [key: string]: string;
}

interface AboutTexts {
  About_HeroTitle: string;
  About_HeroText: string;
  About_Who: string;
  About_WhoText: string;
  About_Philosophy: string;
  About_PhilosophyText: string;
  About_Mission: string;
  About_MissionText: string;
  About_Trust: string;
  About_ExploreBtn: string;
}

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

  grids: GridMap = {
    grid1: '',
    grid2: '',
    grid3: '',
    grid4: '',
    grid5: '',
    grid6: '',
    grid7: ''
  };

  about: AboutTexts = {
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
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['Creams', Validators.required]
    });
  }

  // ===================== LIFECYCLE =====================
  ngOnInit(): void {
    this.loadCreams();
    this.loadBanner();
    this.loadGrids();
    this.loadTexts();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // ===================== FILE HANDLING =====================
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  // ===================== PRODUCTS =====================
  loadCreams(): void {
    this.sub = this.creamsService.getAll().subscribe(res => {
      this.creams = res || [];
      this.cdr.detectChanges();
    });
  }

  get pagedCreams(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.creams.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.creams.length / this.pageSize);
  }

  submit(): void {
    if (this.cardForm.invalid) return;

    const value = this.cardForm.value;
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('category', value.category);
    formData.append('price', String(value.price));

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    // ===== EDIT =====
    if (this.editingCard) {
      this.creamsService.editCreamForm(this.editingCard.id, formData)
        .subscribe(() => this.afterSave());
      return;
    }

    // ===== ADD =====
    this.creamsService.addCream(formData).subscribe({
      next: () => this.afterSave(),
      error: err => {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Upload Failed!' });
      }
    });
  }

  afterSave(): void {
    Swal.fire({
      icon: 'success',
      title: this.lang.t('adminSaved'),
      timer: 1200,
      showConfirmButton: false
    });
    this.resetForm();
    this.loadCreams();
  }

  editCard(card: any): void {
    this.editingCard = card;
    this.cardForm.patchValue({
      id: card.id,
      name: card.name,
      description: card.description,
      price: card.price,
      category: card.category
    });
    this.selectedFile = null;
  }

  deleteCard(card: any): void {
    Swal.fire({
      title: `${this.lang.t('adminDelete')} "${card.name}"?`,
      icon: 'warning',
      showCancelButton: true
    }).then(result => {
      if (!result.isConfirmed) return;

      this.creamsService.deleteCream(card.id).subscribe(() => {
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

  resetForm(): void {
    this.editingCard = null;
    this.selectedFile = null;
    this.cardForm.reset({
      name: '',
      description: '',
      price: 0,
      category: 'Creams'
    });
  }

  // ===================== ABOUT TEXTS =====================
  async loadTexts(): Promise<void> {
    try {
      const res = await fetch('https://webapplication1-tg9f.onrender.com/api/Api/about-texts');
      const data = await res.json();
      this.about = { ...this.about, ...(data || {}) };
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Failed to load about texts', err);
    }
  }

  async saveTexts(): Promise<void> {
    try {
      await fetch('https://webapplication1-tg9f.onrender.com/api/Api/about-texts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.about)
      });
      Swal.fire({ icon: 'success', title: this.lang.t('adminAboutSaved'), timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Failed to save texts' });
    }
  }

  // ===================== BANNER =====================
  async loadBanner(): Promise<void> {
    try {
      const res = await fetch('https://webapplication1-tg9f.onrender.com/api/Api/banner');
      const data = await res.json();
      this.currentBanner = data.bannerUrl ?? '';
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Failed to load banner', err);
    }
  }

  async uploadBanner(file?: File): Promise<void> {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('https://webapplication1-tg9f.onrender.com/api/Api/upload-banner', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      this.currentBanner = data.bannerUrl ?? '';
      this.cdr.detectChanges();
      Swal.fire({ icon: 'success', title: this.lang.t('adminBannerUpdated'), timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Upload Failed!' });
    }
  }

  // ===================== GRID =====================
  async loadGrids(): Promise<void> {
    try {
      const res = await fetch('https://webapplication1-tg9f.onrender.com/api/Api/grid');
      const data = await res.json();
      this.grids = data || {};
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Failed to load grids', err);
    }
  }

  async uploadGrid(slot: number, file?: File): Promise<void> {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`https://webapplication1-tg9f.onrender.com/api/Api/upload-grid/${slot}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      this.grids[`grid${slot}`] = data.url ?? '';
      this.cdr.detectChanges();
      Swal.fire({ icon: 'success', title: `${this.lang.t('adminGridUpdated')} ${slot}!`, timer: 1000, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Upload Failed!' });
    }
  }

  async deleteGrid(slot: number): Promise<void> {
    try {
      await fetch(`https://webapplication1-tg9f.onrender.com/api/Api/grid/${slot}`, { method: 'DELETE' });
      this.grids[`grid${slot}`] = '';
      this.cdr.detectChanges();
      Swal.fire({ icon: 'success', title: `Grid ${slot} deleted`, timer: 900, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Delete Failed!' });
    }
  }

}
