import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSwiperComponent } from './grid-swiper.component';

describe('GridSwiperComponent', () => {
  let component: GridSwiperComponent;
  let fixture: ComponentFixture<GridSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridSwiperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
