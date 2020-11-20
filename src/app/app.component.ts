import { Component, OnInit } from '@angular/core';
import { Item } from './model-item';
import { Order } from './model-order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'cafeapp';

  activeOrder = new Order();
  coffeeItem = new Item();
  teaItem = new Item();
  myOrders: Order[];
  cafeOrdersPending: Order[];
  cafeOrdersInProgress: Order[];
  cafeOrdersDone: Order[];
  customerUIMode = true;

  ngOnInit(): void {
    this.coffeeItem.name = 'coffee';
    this.coffeeItem.price = 1.5;
    this.teaItem.name = 'Tea';
    this.teaItem.price = 1;
    this.activeOrder.items = [];
    this.activeOrder.totalPrice = 0;
    this.myOrders = [];
    this.cafeOrdersPending = [];
    this.cafeOrdersInProgress = [];
    this.cafeOrdersDone = [];
  }

  switchUIMode(): void {
    this.customerUIMode = !this.customerUIMode;
  }

  addcoffee(): void {
    this.activeOrder.items.push(this.coffeeItem);
    this.recalcActiveOrder();
  }

  addTea(): void {
    this.activeOrder.items.push(this.teaItem);
    this.recalcActiveOrder();
  }

  recalcActiveOrder(): void {
    this.activeOrder.totalPrice = 0;
    for (let i = 0; i < this.activeOrder.items.length; i++) {
      this.activeOrder.totalPrice += this.activeOrder.items[i].price;
    }
  }



  placeOrder(): void {
    const newOrder = new Order();
    newOrder.totalPrice = this.activeOrder.totalPrice;
    newOrder.status = 'Placed';
    this.myOrders.push(newOrder);
    this.clearActiveOrder();
    this.cafeOrdersPending.push(newOrder);
  }

  clearActiveOrder(): void {
    this.activeOrder.items = [];
    this.activeOrder.totalPrice = 0;
  }

  deleteItem(index: number, item: Item): void {
    this.activeOrder.items.splice(index, 1);
    this.recalcActiveOrder();
  }

  cancelOrder(index: number, item: Order): void {
    item.status = 'Cancelled';
    // this.myOrders.splice(index, 1);
    this.cafeOrdersDone.push(item);
    this.cafeOrdersPending.splice(index, 1);
  }

  moveOrderToInProgress(index: number, item: Order): void {
    item.status = 'In-progress';
    this.cafeOrdersPending.splice(index, 1);
    this.cafeOrdersInProgress.push(item);
  }

  moveOrderToDone(index: number, item: Order): void {
    item.status = 'Completed';
    this.cafeOrdersInProgress.splice(index, 1);
    this.cafeOrdersDone.push(item);
  }
}
