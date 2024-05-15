import { Message } from "./message";
import { User } from "./user";

export interface Conversation {
    id?:number,
    users:User[],
    menssages:Message[],
}
