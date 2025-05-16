import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoignComponent } from './loign.component';

describe('LoignComponent', () => {
  let component: LoignComponent;
  let fixture: ComponentFixture<LoignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
