import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversation } from '../interfaces/conversation';
import { AuthService } from './auth.service';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  authService= inject (AuthService);

  currentConversation:Conversation | null = null ;
  behaviorSubjectConversation:BehaviorSubject<Conversation| null>; 
  
  constructor(private http: HttpClient) { 
    this.behaviorSubjectConversation = new BehaviorSubject<Conversation | null>(this.currentConversation);
  }


  setCurrentChat(seletedConvesation:any){
    this.currentConversation=seletedConvesation;
    this.behaviorSubjectConversation.next(this.currentConversation);
  }

  getObservableConversation():Observable<any> {
    return this.behaviorSubjectConversation.asObservable();
  }

  getAllconversation():Observable<Conversation[]>{
    const id:number=this.authService.getUserIdFromToken();
    return  this.http.get<Conversation[]>('http://localhost:8080/api/v1/user/'+ id +'/conversations')
  }

  createNewConversation(): Observable<Conversation>{
    const userId:number=this.authService.getUserIdFromToken();
    const body={
      usersId:[userId,2]
    }
    return  this.http.post<Conversation>('http://localhost:8080/api/v1/conversation',body)
  }

  sendMessage(conversationId:number,text:string):Observable<Message>{
    const userId:number=this.authService.getUserIdFromToken();
    const body={
      text: text,
      view: false,
      emiterId:userId,
      coversationId:conversationId
    }
    return  this.http.post<Message>('http://localhost:8080/api/v1/message',body)
  }

  userIsSender(senderId:number):boolean {
    const userId:number=this.authService.getUserIdFromToken();
    if(senderId== userId){
      return true
    }
    return false
  }

  getOtherUserName(conversation:Conversation):string{
    const userId:number=this.authService.getUserIdFromToken();
    if(conversation){
      for(let i:number=0;i < conversation.users.length;i++){
        if(conversation.users[0].id != userId){
          return conversation.users[0].username;
        }
      } 
    }
    return ""
  }
}
