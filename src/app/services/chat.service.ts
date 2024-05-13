import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentConversation:any=null;
  behaviorSubjectConversation = new BehaviorSubject<any>(this.currentConversation);
  constructor() {}

  setCurrentChat(seletedConvesation:any){
    this.currentConversation=seletedConvesation;
    this.behaviorSubjectConversation.next(this.currentConversation);
  }

  getObservableConversation():Observable<any> {
    return this.behaviorSubjectConversation.asObservable();
  }
}
