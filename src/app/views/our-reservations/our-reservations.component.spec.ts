import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurReservationsComponent } from './our-reservations.component';

describe('OurReservationsComponent', () => {
  let component: OurReservationsComponent;
  let fixture: ComponentFixture<OurReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
