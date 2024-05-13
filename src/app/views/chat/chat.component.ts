import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ChatConversacionesComponent } from "../../components/chat-conversaciones/chat-conversaciones.component";
import { CurrentChatComponent } from "../../components/current-chat/current-chat.component";
@Component({
    selector: 'app-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
    imports: [NavbarComponent, ChatConversacionesComponent, CurrentChatComponent]
})
export class ChatComponent {

}
