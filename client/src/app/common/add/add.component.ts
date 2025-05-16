import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']  // fixed: should be `styleUrls` (plural)
})
export class AddComponent {
  constructor(private router: Router) {}

  goToKoreanFest(): void {
    this.router.navigate(['/food', 'Korean Spicy Fest']);
  }
}
