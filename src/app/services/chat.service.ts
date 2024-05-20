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
  urlSocket= '//localhost:8080/api/v1/chat-socket/test' ;
  currentConversation:Conversation | null = null ;
  behaviorSubjectConversation:BehaviorSubject<Conversation| null>; 
  behaviorSubjectNewMessage:BehaviorSubject<Message| null>; 
  
  constructor(private http: HttpClient) { 
    this.behaviorSubjectConversation = new BehaviorSubject<Conversation | null>(this.currentConversation);
    this.behaviorSubjectNewMessage = new BehaviorSubject<Message | null>(null);
    this. initConnenctionSocket();
  }

  setCurrentChat(seletedConvesation:any){
    this.currentConversation=seletedConvesation;
    this.behaviorSubjectConversation.next(this.currentConversation);
  }

  getObservableConversation():Observable<any> {
    return this.behaviorSubjectConversation.asObservable();
  }

  newMessages(message:Message){
    if(this.currentConversation){
      this.currentConversation!.menssages.push(message);  
    }
    
    this.behaviorSubjectNewMessage.next(message);
  }

  getObservableNewMessage():Observable<any>{
    return this.behaviorSubjectNewMessage.asObservable();
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
    
    //const socket= new SockJS(this.urlSocket);
    this.stompClient = Stomp.over(this.socketFactory())
  }
  //función de fábrica para SockJS
  socketFactory = () => {
    return new SockJS(this.urlSocket);
  };  

  joinRoom(roomId:string){
    this.stompClient.connect({},()=>{
        this.stompClient.subscribe("/topic/"+roomId, (message:any)=>{
        const messageContent= JSON.parse(message.body)
        console.log(messageContent)
        this.newMessages(messageContent);
      })
    })
  }
  
  sendMessageSocket(roomId:string,message:string,user:string){
    this.stompClient.send("/app/chat/"+roomId,{},JSON.stringify({message:message,user:user}))
  }
}
