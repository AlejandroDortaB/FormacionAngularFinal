import { FoodPlates } from "./food-plates";

export interface Menu {
    id?: number;
    name: string;
    foodPlates: FoodPlates[];
}
