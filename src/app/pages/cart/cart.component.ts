import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:  "./cart-component.html" 
})
export class CartComponent implements OnInit {

   cart  : Cart = { items : [ {
      product : 'https://via.placeholder.com/150',
      name : "snickers" , 
      price : 150,
      quantity : 1,
       id : 1
   },
   {
    product : 'https://via.placeholder.com/150',
    name : "snickers" , 
    price : 150,
    quantity : 3,
     id : 1
 }] }  

   dataSource : Array<CartItem> = []

   displayedColumuns : Array<string> = [
     'product' ,
      'name' ,
      'price' ,
      'quantity',
      'total' ,
      'action'
   ]


  constructor(private cartService : CartService) { }

  ngOnInit(): void {
     this.cartService.cart.subscribe( (c : Cart) => {
      this.cart=c;
      this.dataSource=this.cart.items;   
     })
   
  }



  onClearCart()  : void{
    this.cartService.onClearCart();
  }


  getTotal(items : Array<CartItem>) : number{

   return this.cartService.getTotal(items);
  }


  onRemoveFromCart(item : CartItem) : void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item : CartItem) : void {
    this.cartService.addToCart(item);
  }


  onRemoveQuantity(item : CartItem) : void {
      this.cartService.removeQuantity(item);
  }
}
