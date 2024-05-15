import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from '../../services/user.service';
import { Conversation } from '../../interfaces/conversation';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [MatGridListModule,MatButtonModule,FormsModule],
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
    this.chatService.getAllconversation().subscribe((conversations:Conversation[])=>{
      if(conversations.length > 0){
        this.conversations=conversations;
        console.log("this.conversations",this.conversations)
        this.messages= this.conversations[0].menssages;
        console.log("this.messages::",this.messages)
      }
    })
  }
  
  closeUserChat() {
    this.closeUserChatEmitter.emit();
  }

  sendMessage() {
    console.log(this.conversations.length)
    if(this.conversations.length > 0){
      //enviar mensaje
      this.chatService.sendMessage(this.conversations[0].id!,this.text).subscribe((message:Message)=>{
        this.text="";
        this.messages.push(message);
      })
    }
    else{
      //Crear la conversacion y luego enviar el mensaje
      this.chatService.createNewConversation().subscribe((conversation:Conversation)=>{
        this.conversations.push(conversation);
        console.log("conversation",conversation);
        this.chatService.sendMessage(this.conversations[0].id!,this.text).subscribe((message:Message)=>{
          this.text="";
          this.messages.push(message);
        })
      })
    }
  }
}
