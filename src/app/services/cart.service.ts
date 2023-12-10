import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Cart, CartItem } from '../models/cart.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class CartService {
  cart = new BehaviorSubject<Cart>({ items : []})

  constructor(private _snackBar : MatSnackBar) { }


  addToCart(item : CartItem) : void {
    const items= [...this.cart.value.items];

    const itemInCart=items.find(i => i.id === item.id);


    if(itemInCart){ //exist
       itemInCart.quantity +=1;
    }else{
          items.push(item);
    }

    //emit the value so that every single component that has subscribe to cart can have the values
    this.cart.next( { items });

    this._snackBar.open(' 1 item added to CART', 'OK' , {duration : 3000 });
    console.log(this.cart.value);

  }


  getTotal(items : Array<CartItem>) : number {
    return items.map(( item) => item.price * item.quantity)
    .reduce( ( prev,curr) => prev+curr , 0);
 }

 onClearCart() : void {
  this.cart.next( { items : []});
  this._snackBar.open('cart is erased', 'OK' , {duration : 3000 });
 }


//  removeFromCart(item : CartItem,update=true) : Array<CartItem> {
//      const filteredItems = this.cart.value.items.filter( (i) => {
//        i.id !== item.id
//      })

     
//      if(update){
//       this.cart.next( { items : filteredItems}) ; 
//       this._snackBar.open('1 item removed from CART', 'OK' , {duration : 3000 })
//      }
  
//      return filteredItems;
//  }

 removeFromCart(item: CartItem, update = true): Array<CartItem> {
  const filteredItems = this.cart.value.items.filter(i => i.id !== item.id);

  if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from CART', 'OK', { duration: 3000 });
  }

  return filteredItems;
}




 removeQuantity(item : CartItem) : void{

         let itemForRemoval : CartItem | undefined;

       let filteredItems=  this.cart.value.items.map( (i) => {

          if(i.id === item.id){
            i.quantity -=1;
          }
          if(i.quantity === 0 ){
                  itemForRemoval=i;
          }
          return i;
         })

         if(itemForRemoval){
          filteredItems=this.removeFromCart(itemForRemoval,false)
         }


         this.cart.next( { items : filteredItems})


         this._snackBar.open(' 1 item removed from CART', 'OK' , {duration : 3000 });

    //   let updatedItems = this.cart.value.items.map(i => {
    //     if (i.id === item.id && i.quantity > 0) {
    //         i.quantity -= 1;
    //     }
    //     return i;
    // }).filter(i => i.quantity > 0);

    // this.cart.next({ items: updatedItems });

    // this._snackBar.open('1 item removed from CART', 'OK', { duration: 3000 });
 }


}
