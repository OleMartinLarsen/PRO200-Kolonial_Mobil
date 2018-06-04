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

  private addDinnerButtonText = "";
  private isFavorited: boolean = false;
  private isPlanning: boolean = false;
  private planningDay =
  {
    date: "",
    recipe: ""
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private functions: GlobalFunctionsProvider) 
  {
    this.recipe = navParams.get("recipe");
    this.ingredients = this.recipe.recipeIngredients;
    this.instructions = this.recipe.recipeInstructions;

    //If recipe is favorited, remove "add-to-favorite" button
    var res = this.functions.getRecipeFavorites().find((found) => { return found == this.recipe; });
    if(res) 
    { 
      this.isFavorited = true; 
    }
    
    this.isPlanning = this.functions.getIsPlanning();
    this.planningDay.date = this.functions.getDayPlanningFor();
    this.planningDay.recipe = this.recipe;
    this.addDinnerButtonText = "Legg til for " + this.planningDay.date;
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
    this.functions.addRecipeToDayPlans(this.planningDay);
    this.functions.setIsPlanning(false);
    // this.functions.addRecipeToHistory(this.planningDay.recipe); //Pushes only recipes added to plans to history
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipedetailsPage');
  }
}