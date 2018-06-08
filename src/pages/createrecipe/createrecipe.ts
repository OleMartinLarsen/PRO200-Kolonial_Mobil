import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-createrecipe',
  templateUrl: 'createrecipe.html',
})
export class CreaterecipePage 
{
  private recipeIngredients: Array<any> = [];
  private recipeIngredientsQ: Array<number> = [];
  private recipeInstructions: Array<any> = [];
  private addWare: any;
  private step: string;
  public recipe =
  {
    name: "",
    grade: "",
    timeInMins: 0,
    portions: 0,
    img: ""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider)  
  {
    this.recipeIngredients = this.functions.getRecipeIngredients();
    this.recipeIngredientsQ = this.functions.getRecipeIngredientsQ();
    this.recipeInstructions = this.functions.getRecipeInstructions();
  }

  pushWareslist()
  {
    this.navCtrl.push("WareslistPage");
  }

  incrementIngredient(ingredient: any)
  {
    for(var i = 0; i < this.recipeIngredients.length; i++)
    {
      if (ingredient == this.recipeIngredients[i])
      {
        if(this.recipeIngredientsQ[i] > 9)
        {
          return;
        }
        this.recipeIngredientsQ[i]++;
        console.log(this.recipeIngredientsQ[i] + " " + ingredient.wareName);
      }
    }
  }

  decrementIngredient(ingredient: any)
  {
    for(var i = 0; i < this.recipeIngredients.length; i++)
    {
      if (ingredient == this.recipeIngredients[i])
      {
        if(this.recipeIngredientsQ[i] <= 1)
        {
          this.recipeIngredients.splice(i, 1);
          return;
        }
        this.recipeIngredientsQ[i]--;
        console.log(this.recipeIngredientsQ[i] + " " + ingredient.wareName);
      }
    }
  }
  
  popWare(ingredient: any)
  {
    for(var i = 0; i < this.recipeIngredients.length; i++)
    {
      if (ingredient == this.recipeIngredients[i])
      {
        this.recipeIngredients.splice(i, 1);
      }
    }
  }

  saveStep(step: string) 
  {
    if(step != "")
    {
      this.functions.addInstructionsToRecipeInstructions(step);
      this.step = "";
    }
  }

  saveRecipe()
  {
    if(this.recipe.name != "" && this.recipe.grade != "")
    {
      //TODO save locally
      this.functions.addMyRecipes(
        {
          recipeName: this.recipe.name,
          recipeGrade: this.recipe.grade,
          recipeTimeInMinutes: this.recipe.timeInMins,
          recipePortions: this.recipe.portions,
          recipeIngredients: this.functions.getRecipeIngredients(),
          recipeIngredientsQ: this.recipeIngredientsQ,
          recipeInstructions: this.functions.getRecipeInstructions(),
          // recipeImg: this.recipe.img
        });

      this.functions.makeToast("Oppskrift lagret!");
      this.recipe.name = "";
      this.recipe.grade = "";
      this.recipe.timeInMins = 0;
      this.recipe.portions = 0;
      this.functions.clearRecipeIngredients();
      this.functions.clearRecipeIngredientsQ();
      this.functions.clearRecipeInstructions();
    }
    else
    {
      this.functions.makeToast("Fyll ut alle felt...")
    }
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CreaterecipePage');
  }
}