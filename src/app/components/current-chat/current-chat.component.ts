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
    ]


    ngOnInit(): void {
      this.chatService.getObservableConversation().subscribe((conversationSelected:any)=>{
          this.currentConversation=conversationSelected;
      })
    }

    closeConversation(){
      this.currentConversation=null;
    }
}
