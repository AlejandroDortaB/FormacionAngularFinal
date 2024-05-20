import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Conversation } from '../../interfaces/conversation';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [MatGridListModule,MatButtonModule,FormsModule,CommonModule],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent implements OnInit{

 
  @Output() closeUserChatEmitter = new EventEmitter<boolean>();
  private chatService= inject(ChatService)
  protected conversations:Conversation[] = []; 
  protected messages:Message[]=[]
  protected text:string="";

  ngOnInit(): void {
    this.chatService.joinRoom("1");
    this.chatService.getAllconversation().subscribe((conversations:Conversation[])=>{
      if(conversations.length > 0){
        this.conversations=conversations;
       // this.chatService.joinRoom(this.conversations[0]!.id!.toString());
        this.messages= this.conversations[0].menssages;
      }
      else{
        this.chatService.createNewConversation().subscribe((conversation:Conversation)=>{
          this.conversations.push(conversation);
        })
      }
    })
    this.chatService.getObservableNewMessage().subscribe((messages:Message)=>{
      this.messages.push(messages);
    })
  }
  
  closeUserChat() {
    this.closeUserChatEmitter.emit();
  }

  sendMessage() {
    if(this.conversations.length > 0){
      //enviar mensaje
      this.chatService.sendMessage(this.conversations[0].id!,this.text);
      this.text="";
    }
  }
  

  userIsSender(senderId:number):boolean{
    return this.chatService.userIsSender(senderId);
  }
}
