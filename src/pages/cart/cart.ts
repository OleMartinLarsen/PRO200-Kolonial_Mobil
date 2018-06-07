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
  private recipesInCart: Array<any> = [];
  private cartPrice = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private functions: GlobalFunctionsProvider) 
  {
    this.recipesInCart = this.functions.getRecipesCart();
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

  getPrice()
  {
    var price = 0;
    if(this.recipesInCart.length > 0)
    {
      for(var i = 0; i < this.recipesInCart.length; i++)
      {
        for(var j = 0; j < this.recipesInCart[i].recipeIngredients.length; j++)
        {
          price += parseInt(this.recipesInCart[i].recipeIngredients[j].warePrice);
        }
      }
    }
    return price;
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CartPage');
  }

  ionViewDidEnter()
  {
    this.cartPrice = this.getPrice();
  }
}
