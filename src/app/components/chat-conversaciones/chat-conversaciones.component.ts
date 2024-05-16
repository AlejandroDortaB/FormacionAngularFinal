import { Component, OnInit, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Conversation } from '../../interfaces/conversation';

@Component({
  selector: 'app-chat-conversaciones',
  standalone: true,
  imports: [],
  templateUrl: './chat-conversaciones.component.html',
  styleUrl: './chat-conversaciones.component.css'
})
export class ChatConversacionesComponent implements OnInit{
  
  private  chatService= inject (ChatService); 
  conversations:Conversation[]=[];

  selectedConversation(coversation:any){  
    this.chatService.setCurrentChat(coversation);
  } 

  ngOnInit(): void {
    this.chatService.getAllconversation().subscribe((conversations:Conversation[])=>{
      console.log("conversations",conversations)
      this.conversations=conversations
    })
  }

  getOtherUserName(conversation :Conversation):string{
    return this.chatService.getOtherUserName(conversation);
  }

  getLastMessageConservation(conversation:Conversation):string{
   let lengthArrayMessage= conversation.menssages.length
   if(lengthArrayMessage>0 ){
    //console.log(conversation.menssages[lengthArrayMessage-1]);
    return conversation.menssages[lengthArrayMessage-1].text
   } 
    return ""
    
  }
}
