import { Component, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-conversaciones',
  standalone: true,
  imports: [],
  templateUrl: './chat-conversaciones.component.html',
  styleUrl: './chat-conversaciones.component.css'
})
export class ChatConversacionesComponent {
  private  chatService= inject (ChatService); 
  conversaciones:string[]=[
    "conversacion 1","conversacion 2","conversacion 3","conversacion 4",
  "conversacion 1","conversacion 2","conversacion 3","conversacion 4",
  "conversacion 1","conversacion 2","conversacion 3","conversacion 4",
  "conversacion 1","conversacion 2","conversacion 3","conversacion 4",];

  selectedConversation(coversation:any){  
    this.chatService.setCurrentChat(coversation);
  } 
}
