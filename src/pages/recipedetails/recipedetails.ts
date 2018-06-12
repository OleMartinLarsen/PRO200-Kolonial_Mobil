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
  private recipe: any;
  private ingredientsQ: Array<number>;
  private ingredients: Array<any>;
  private instructions: Array<any>;

  private addDinnerButtonText = "";
  private isFavorited: boolean = false;
  private isPlanning: boolean = false;
  private myRecipe: boolean = false;
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
    this.ingredientsQ = this.recipe.recipeIngredientsQ;
    this.ingredients = this.recipe.recipeIngredients;
    this.instructions = this.recipe.recipeInstructions;

    //If recipe is favorited, remove "add-to-favorite" button
    var res = this.functions.getRecipeFavorites().find((e) => { return e === this.recipe; }); 
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
      if(this.functions.addRecipeFavorite(this.recipe))
      {
        this.isFavorited = true;
        this.functions.makeToast("Oppskrift lagt til i favoritter");
      }
    }
  }

  removeFromFavorites()
  {
    if(this.isFavorited)
    {
      if(this.functions.removeRecipeFavorite(this.recipe))
      {
        this.isFavorited = false;
        this.functions.makeToast("Oppskrift fjernet fra favoritter");
      }
    }
  }

  deleteMyRecipe()
  {
    if(this.functions.removeMyRecipe(this.recipe))
    {
      this.functions.makeToast("Oppskrift slettet");
      this.navCtrl.pop();
    }
  }

  addRecipeToDay()
  {
    this.functions.addRecipeToDayPlans(this.planningDay);
    this.functions.setIsPlanning(false);
    //this.functions.addRecipeToHistory(this.planningDay.recipe); //Pushes only recipes added to plans to history
    this.navCtrl.popToRoot();
  }

  removeFromFavorites()
  {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipedetailsPage');
  }
}