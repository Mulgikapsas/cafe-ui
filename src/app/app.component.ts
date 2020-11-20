import { Component, OnInit } from '@angular/core';
import { Item } from './model-item';
import { Order } from './model-order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  activeOrder = new Order();
  coffee1Item = new Item();
  coffee2Item = new Item();
  coffee3Item = new Item();
  tea1Item = new Item();
  tea2Item = new Item();
  myOrders: Order[];
  cafeOrdersPending: Order[];
  cafeOrdersInProgress: Order[];
  cafeOrdersDone: Order[];
  customerUIMode = true;
  showOrderDiv = false;

  ngOnInit(): void {
    this.coffee1Item.name = 'black coffee';
    this.coffee1Item.price = 1.5;
    this.coffee2Item.name = 'espresso';
    this.coffee2Item.price = 1.1;
    this.coffee3Item.name = 'mocha';
    this.coffee3Item.price = 2.5;
    this.tea1Item.name = 'green tea';
    this.tea1Item.price = 1;
    this.tea2Item.name = 'peppermint tea';
    this.tea2Item.price = 1.2;
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

  addCoffee1(): void {
    this.activeOrder.items.push(this.coffee1Item);
    this.recalcActiveOrder();
  }

  addCoffee2(): void {
    this.activeOrder.items.push(this.coffee2Item);
    this.recalcActiveOrder();
  }

  addCoffee3(): void {
    this.activeOrder.items.push(this.coffee3Item);
    this.recalcActiveOrder();
  }

  addTea1(): void {
    this.activeOrder.items.push(this.tea1Item);
    this.recalcActiveOrder();
  }

  addTea2(): void {
    this.activeOrder.items.push(this.tea2Item);
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
    this.cafeOrdersPending.splice(index, 1);
    this.cafeOrdersDone.push(item);
    
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

  showOrder(order: Order): void {
    alert('Not implemented yet!');
  }

}
