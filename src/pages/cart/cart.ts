import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage 
{
  private recipesInCart: Array<string> = [];
  private waresInCart: Array<string> = [];
  private cartPrice = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private functions: GlobalFunctionsProvider) 
  {
    this.recipesInCart = this.functions.getRecipesCart();
    this.waresInCart = this.functions.getIngredientsCart();
    this.cartPrice = this.functions.getCartPrice();
  }

  pushRecipeDetails(recipe: any)
  {
    this.navCtrl.push('RecipedetailsPage', { recipe });
  }

  goToOrder()
  {
    this.functions.makeToast("Bestilling!");
  }

  pushUser() 
  {
    this.navCtrl.push('UserPage');
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CartPage');
  }
}