import { Component, OnInit, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-current-chat',
  standalone: true,
  imports: [MatGridListModule,MatButtonModule],
  templateUrl: './current-chat.component.html',
  styleUrl: './current-chat.component.css'
})
export class CurrentChatComponent implements OnInit{
 
  private  chatService= inject (ChatService); 
  currentConversation:any=null;
  protected messages:string[]=
  [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "MENSAJE2",
    "MENSAJE3",
    "MENSAJE4",
    "MENSAJE2",
    "MENSAJE3",
    "MENSAJE4",
    "MENSAJE5"]


    ngOnInit(): void {
      this.chatService.getObservableConversation().subscribe((conversationSelected:any)=>{
          this.currentConversation=conversationSelected;
      })
    }

    closeConversation(){
      this.currentConversation=null;
    }
}
