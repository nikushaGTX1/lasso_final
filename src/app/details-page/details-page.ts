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

    console.log("DETAIL PAGE PRODUCT:", this.product);
  }

  goBack() {
    this.location.back();
  }
}
