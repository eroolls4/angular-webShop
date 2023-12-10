import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: "./filters.component.html" 
})
export class FiltersComponent implements OnInit ,OnDestroy{


  @Output() showCategory=new EventEmitter<string>()

  categoriesSubscription : Subscription | undefined;

  categories : Array<string> | undefined;


  constructor(private storeServie : StoreService) {

   }


  ngOnInit(): void { 

   this.categoriesSubscription = this.storeServie.getAllCategories()
   .subscribe( (resp) => {
        this.categories=resp;
    });
    
  }


  updateCategory(newCategory : string) : void{
      this.showCategory.emit(newCategory);
  }


  ngOnDestroy(): void {
      if(this.categoriesSubscription){
        this.categoriesSubscription.unsubscribe();
      }
  }



}
