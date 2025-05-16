import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare var Swiper: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'Burger King';
  ngAfterViewInit(): void {
    new Swiper('.mySwiper', {
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      }
    });
  }

}
