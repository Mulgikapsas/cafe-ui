import { Item } from './model-item';

export class Order {
    items: Item[];
    totalPrice: number;
    status: string;
}
