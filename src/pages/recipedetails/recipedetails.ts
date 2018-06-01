import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { forEach } from '@firebase/util';

@IonicPage()
@Component({
  selector: 'page-recipedetails',
  templateUrl: 'recipedetails.html',
})
export class RecipedetailsPage 
{
  private isFavorited: boolean = false;
  private isPlanning: boolean = true;
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

    //If recipe is favorited, remove "add-to-favorite" button
    var res = this.functions.getRecipeFavorites().find((found) => { return found == this.recipe; });
    if(res) { this.isFavorited = true; }

    this.isPlanning = navParams.get("isPlanning");
  }

  pushUser()
  {
    this.navCtrl.push("UserPage");
  }

  addToFavorites()
  {
    if(!this.isFavorited)
    {
      //TODO save recipe to local storage
      this.functions.addRecipeFavorites(this.recipe);
      this.functions.makeToast("Oppskrift lagt til i favoritter");
    }
  }

  addRecipeToDay()
  {
    var day = this.navParams.get("day");
    // TODO key/values or array of array to store day/recipe values together
    this.functions.addRecipeToDayPlans(day);
    this.functions.addRecipeToDayPlans(this.recipe);
    this.navCtrl.popTo("HomePage");
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipedetailsPage');
  }
}