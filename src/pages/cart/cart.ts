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
    if(this.recipesInCart.length > 0)
    {
      if(this.functions.addOrderToHistory(this.recipesInCart)) //Pushes all recipes ordered to history (regardless of duplicates)
      {
        this.functions.makeToast("Bestilt!");
      }
    }
    else
    {
      this.functions.makeToast("Kan ikke bestille tom handlekurv!");
    }
  }

  pushUser() 
  {
    this.navCtrl.push('UserPage');
  }

  pushPreferences()
  {
    //TODO uncomment
    // this.navCtrl.push("PreferencesPage");
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
          price += (parseInt(this.recipesInCart[i].recipeIngredientsQ[j]) 
            * parseInt(this.recipesInCart[i].recipeIngredients[j].warePrice));
        }
      }
    }
    return price;
  }

  getCurrentPrice()
  {
    this.cartPrice = this.getPrice();
  }

  popRecipe(index: number)
  {
    this.recipesInCart.splice(index, 1);
    this.getCurrentPrice();
  }

  emptyCart()
  {
    var length = this.functions.getRecipesCart().length;
    this.recipesInCart.splice(0, length);
    this.functions.getRecipesCart().slice(0, length);
    this.getCurrentPrice();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CartPage');
  }

  ionViewDidEnter()
  {
    this.getCurrentPrice();
  }
}
