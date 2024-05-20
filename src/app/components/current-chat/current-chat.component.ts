import { Component, OnInit, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { ChatService } from '../../services/chat.service';
import { Conversation } from '../../interfaces/conversation';
import { CommonModule } from '@angular/common';
import { Message } from '../../interfaces/message';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-current-chat',
  standalone: true,
  imports: [MatGridListModule,MatButtonModule,CommonModule,FormsModule],
  templateUrl: './current-chat.component.html',
  styleUrl: './current-chat.component.css'
})
export class CurrentChatComponent implements OnInit{
 
  private  chatService= inject (ChatService); 
  protected text:string="";
  currentConversation:Conversation | null = null;

    ngOnInit(): void {
      this.chatService.getObservableConversation().subscribe((conversationSelected:any)=>{
          this.currentConversation=conversationSelected;
          console.log("hola")
          if(this.currentConversation){
          }
          this.chatService.joinRoom("1");
      })
    }

    closeConversation(){
      this.currentConversation=null;
      this.chatService.currentConversation=null;
    }

    getOtherUserName(conversation :Conversation):string{
      return this.chatService.getOtherUserName(conversation);
    }
    userIsSender(senderId:number):boolean{
      return this.chatService.userIsSender(senderId);
    }

    sendMessage() {
      if(this.currentConversation){
        //enviar mensaje
        this.chatService.sendMessage(this.currentConversation.id!,this.text)
        this.text="";
      }
    }
    sendMessageSocket(){
      this.chatService.sendMessageSocket("ABC",'HOLA',"1")
    }
}
