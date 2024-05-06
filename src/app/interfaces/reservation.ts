import { Restaurant } from "./restaurant";

export interface Reservation {
    id: number;
    date: string;
    time: string;
    numberPeople: number;
    restaurant: Restaurant;
    userid: number; // Si tienes una interfaz para la entidad User, asegúrate de importarla aquí
  }