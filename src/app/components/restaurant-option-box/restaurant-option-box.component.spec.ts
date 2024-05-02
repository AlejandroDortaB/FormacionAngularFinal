import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOptionBoxComponent } from './restaurant-option-box.component';

describe('RestaurantOptionBoxComponent', () => {
  let component: RestaurantOptionBoxComponent;
  let fixture: ComponentFixture<RestaurantOptionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantOptionBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantOptionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
