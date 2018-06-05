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
    this.recipeIngredients = functions.getRecipeIngredients();
    this.recipeInstructions = functions.getRecipeInstructions();
  }

  pushWareslist()
  {
    this.navCtrl.push("WareslistPage");
  }
  
  popWare(ingredient)
  {
    var i = 0;
    for(i; i < this.recipeIngredients.length; i++)
    {
      if (ingredient == this.recipeIngredients[i].wareName)
      {
        this.recipeIngredients.splice(i, 1);
        //this.navCtrl.push("createdummydataPage")
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
          recipeInstructions: this.functions.getRecipeInstructions(),
          // recipeImg: this.recipe.img
        });

      this.functions.makeToast("Oppskrift lagret!");
      this.recipe.name = "";
      this.recipe.grade = "";
      this.recipe.timeInMins = 0;
      this.recipe.portions = 0;
      this.functions.clearRecipeIngredients();
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