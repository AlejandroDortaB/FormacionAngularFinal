import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversation } from '../interfaces/conversation';
import { AuthService } from './auth.service';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  authService= inject (AuthService);
  private stompClient: any
  currentConversation:Conversation | null = null ;
  behaviorSubjectCurrentConversation:BehaviorSubject<Conversation| null>;
  behaviorSubjectConversations:BehaviorSubject<Conversation[]| null>; 
  behaviorSubjectNewMessage:BehaviorSubject<Message| null>; 
  allUserConversations:Conversation[]=[];
  
  constructor(private http: HttpClient) { 
    this.behaviorSubjectCurrentConversation = new BehaviorSubject<Conversation | null>(this.currentConversation);
    this.behaviorSubjectNewMessage = new BehaviorSubject<Message | null>(null);
    this.behaviorSubjectConversations = new BehaviorSubject<Conversation []| null>(this.allUserConversations);
    this.getAllconversation().subscribe((conversations:Conversation[])=>{
      this.allUserConversations = conversations
      this.behaviorSubjectConversations.next(this.allUserConversations);
    })
    this. initConnenctionSocket();
  }

  setCurrentChat(seletedConvesation:any){
    this.currentConversation=seletedConvesation;
    this.behaviorSubjectCurrentConversation.next(this.currentConversation);
  }

  getObservableConversation():Observable<any> {
    return this.behaviorSubjectCurrentConversation.asObservable();
  }

  newMessages(message:Message,roomId:string){
    if(this.currentConversation?.id?.toString() == roomId){
      this.currentConversation!.menssages.push(message);  
    }
    else{
      this.allUserConversations.forEach((conversation)=>{
        if(conversation.id?.toString()==roomId){
          conversation.menssages.push(message);
        }
      })
    }
    this.behaviorSubjectNewMessage.next(message);
  }

  getObservableNewMessage():Observable<any>{
    return this.behaviorSubjectNewMessage.asObservable();
  }

  getObservableUserConversation(){
    return this.behaviorSubjectConversations.asObservable();
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

  sendMessage(conversationId:number,text:string){
    const userId:number=this.authService.getUserIdFromToken();
    const body={
      text: text,
      view: false,
      emiterId:userId,
      coversationId:conversationId
    }
    this.stompClient.send("/app/chat/"+conversationId,{},JSON.stringify(body))
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
  


  /**---------------------Sockets -----------------------------*/
  initConnenctionSocket() {
    let urlSocket= '//localhost:8080/api/v1/chat-socket/test' ;
    const socket = new SockJS(urlSocket);
    this.stompClient = Stomp.over(socket);
    this.stompClient.reconnectDelay = 5000;
    if (!this.stompClient.active) {
      this.stompClient.activate();
    }
  }
   joinRoom(roomId: string): void {
   console.log("joinRoom");
   this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
      const messageContent = JSON.parse(message.body);

      console.log(roomId);
      console.log(messageContent);
      this.newMessages(messageContent,roomId);
    });
   
  }
  
  sendMessageSocket(roomId:string,message:string,user:string){
    this.stompClient.send("/app/chat/"+roomId,{},JSON.stringify({message:message,user:user}))
  }
}
