import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-page',
  standalone: false,
  templateUrl: './details-page.html',
  styleUrl: './details-page.css',
})
export class DetailsPage implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];

    if (this.product?.description) {
      this.product.description = this.cleanDescription(
        this.product.description
      );
    }

    console.log("DETAIL PAGE PRODUCT:", this.product);
  }

cleanDescription(desc: string): string {
  return desc
    .replace(/&nbsp;/g, ' ')          // remove HTML non-breaking spaces
    .replace(/\s{2,}/g, ' ')          // collapse multiple spaces
    .replace(/\n\s*\n+/g, '\n')       // collapse empty lines
    .replace(/\s+([,.!?;:])/g, '$1')  // remove space before punctuation
    .trim()
    .split('\n')
    .map(p => `<p>${p.trim()}</p>`)
    .join('');
}


  goBack() {
    this.location.back();
  }
}
