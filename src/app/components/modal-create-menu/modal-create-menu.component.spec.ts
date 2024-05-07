import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateMenuComponent } from './modal-create-menu.component';

describe('ModalCreateMenuComponent', () => {
  let component: ModalCreateMenuComponent;
  let fixture: ComponentFixture<ModalCreateMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
