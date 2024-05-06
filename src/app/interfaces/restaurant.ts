import { Menu } from "./menu";
import { Reservation } from "./reservation";

export interface Restaurant {
    id: number;
    name: string;
    capacity: number;
    description: string;
    imgIndex: number;
    menus: Menu[];
    reservations: Reservation[];
  }