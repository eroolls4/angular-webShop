import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'; // Import your component
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  //defining the routes
  { path: 'header', component: HeaderComponent }, 

  // ... You can add more routes here
  {path : 'cart' , component : CartComponent } ,
  { path : 'home' , component : HomeComponent  },
  { path : '' , redirectTo : 'home' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
