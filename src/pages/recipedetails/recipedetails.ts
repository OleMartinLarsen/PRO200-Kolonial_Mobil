import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-recipedetails',
  templateUrl: 'recipedetails.html',
})
export class RecipedetailsPage 
{
  recipe: any;
  ingredients: any;
  instructions: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private functions: GlobalFunctionsProvider) 
  {
    this.recipe = navParams.get('recipe');
    this.ingredients = this.recipe.recipeIngredients;
    this.instructions = this.recipe.recipeInstructions;
  }

  pushUser()
  {
    this.navCtrl.push('UserPage');
  }

  addToFavorites()
  {
    //TODO save recipe to local storage
    this.functions.addRecipeFavorites(this.recipe);
    this.functions.makeToast("Oppskrift lagt til i favoritter");
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipedetailsPage');
  }
}