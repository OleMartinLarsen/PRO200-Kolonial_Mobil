import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipesPage } from '../recipes/recipes';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { RecipehistoryPage } from '../recipehistory/recipehistory';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage 
{
  homePage: any;
  recipesPage: any;
  recipehistoryPage: any;
  cartPage: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) 
    {
    this.homePage = HomePage;
    this.recipesPage = RecipesPage;
    this.recipehistoryPage = RecipehistoryPage;
    this.cartPage = CartPage;
  }
}