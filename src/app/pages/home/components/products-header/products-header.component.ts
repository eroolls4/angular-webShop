import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html' ,
  styles: [
  ]
})


export class ProductsHeaderComponent implements OnInit {

  sort='desc';
  itemsShowed=12;
  
  @Output() numberOfColumnsInARow=new EventEmitter<number>(); 
  @Output() itemsCountChange=new EventEmitter<number>();
  @Output() sortChange=new EventEmitter<string>();


  constructor() { }


   ngOnInit(): void { }


 onSortUpdated(newSort : string ) : void{
  this.sort=newSort;
  this.sortChange.emit(newSort);
 }


 onItemsUpdated(newCount : number) : void{
  this.itemsShowed=newCount;
  this.itemsCountChange.emit(newCount);
 }


 onColumnsUpdate(newCount : number) : void {
  this.numberOfColumnsInARow.emit(newCount);
 }
}
