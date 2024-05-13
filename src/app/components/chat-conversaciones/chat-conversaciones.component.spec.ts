import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConversacionesComponent } from './chat-conversaciones.component';

describe('ChatConversacionesComponent', () => {
  let component: ChatConversacionesComponent;
  let fixture: ComponentFixture<ChatConversacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatConversacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatConversacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
