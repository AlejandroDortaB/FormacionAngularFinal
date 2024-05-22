import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateRestaurantComponent } from './modal-create-restaurant.component';

describe('ModalCreateRestaurantComponent', () => {
  let component: ModalCreateRestaurantComponent;
  let fixture: ComponentFixture<ModalCreateRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreateRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
