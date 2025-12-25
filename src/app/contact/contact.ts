import { Component } from '@angular/core';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
 constructor(
    public lang: LangService
  ) {
  }
}
