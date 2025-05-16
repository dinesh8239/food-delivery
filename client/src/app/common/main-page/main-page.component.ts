import { AfterViewInit, Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
// import { SwiperSectionComponent } from '../swiper-section/swiper-section.component';
// import { GridSwiperComponent } from '../grid-swiper/grid-swiper.component';
// import { SwiperComponent } from '../swiper/swiper.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AddComponent } from '../add/add.component';
// import { WatchesComponent } from '../watches/watches.component';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { SwiperComponent } from '../swiper/swiper.component';

 


// Import Bootstrap JS (make sure bootstrap is installed via npm)


@Component({
  selector: 'app-main-page',
  imports: [NavBarComponent,RouterLink,CardComponent,NavBarComponent,AddComponent,CommonModule, SwiperComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]

})
export class MainPageComponent{
 isOpen:boolean=false
 openSidebar(){
  this.isOpen=true
  console.log(this.isOpen)
 }
 closeSidebar(){
  this.isOpen=false
  console.log(this.isOpen)
}
}