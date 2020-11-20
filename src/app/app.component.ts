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




  ngOnInit(): void {
    this.coffeeItem.name = 'coffee';
    this.coffeeItem.price = 1.5;
    this.teaItem.name = 'Tea';
    this.teaItem.price = 1;
    this.activeOrder.items = [];
    this.activeOrder.totalPrice = 0;
    this.myOrders = [];
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
    newOrder.status = 'placed';
    this.myOrders.push(newOrder);
    this.clearActiveOrder();
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
    this.myOrders.splice(index, 1);
  }
}
