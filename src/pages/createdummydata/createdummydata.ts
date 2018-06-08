import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Ware } from '../../models/ware';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-createdummydata',
  templateUrl: 'createdummydata.html',
})
export class CreatedummydataPage 
{
  public wareCollection: AngularFirestoreCollection<Ware>;
  public recipeCollection: AngularFirestoreCollection<Recipe>;
  private recipeIngredients: Array<any> = [];
  private recipeIngredientsQ: Array<number> = [];
  private recipeInstructions: Array<any> = [];
  private addWare: any;
  private step: string;
  public ware =
  {
    name: "",
    price: 0,
    type: "",
    img: ""
  };
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
    this.wareCollection = this.af.collection<Ware>("wares");
    this.recipeCollection = this.af.collection<Recipe>("recipes");
    this.recipeIngredients = this.functions.getRecipeIngredients();
    this.recipeIngredientsQ = this.functions.getRecipeIngredientsQ();
    this.recipeInstructions = this.functions.getRecipeInstructions();
  }

  saveWare()
  {
    if(this.ware.name != "" && this.ware.type != "")
    {
      this.wareCollection.add(
        {
          wareName: this.ware.name.charAt(0).toUpperCase() + this.ware.name.slice(1),
          warePrice: this.ware.price,
          wareType: this.ware.type,
          //wareInt how much of this ware in the recipe
          wareImg: this.ware.img
        } as Ware);

      this.functions.makeToast("Vare lagret!");
      this.ware.name = "";
      this.ware.price = 0;
      this.ware.type = ""; 
      //wareImg serves no function in the prototype, 
      // can be added once wareDetails page is added and wares rehauled
      // this.ware.img = "";
    }
    else
    {
      this.functions.makeToast("Fyll ut alle felt(vare)...")
    }
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
  
  popWare(ingredient)
  {
    var i = 0;
    for(i; i < this.recipeIngredients.length; i++)
    {
      if (ingredient == this.recipeIngredients[i].wareName)
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
      this.recipeCollection.add(
        {
          recipeName: this.recipe.name,
          recipeGrade: this.recipe.grade,
          recipeTimeInMinutes: this.recipe.timeInMins,
          recipePortions: this.recipe.portions,
          recipeIngredients: this.functions.getRecipeIngredients(),
          recipeIngredientsQ: this.recipeIngredientsQ,
          recipeInstructions: this.functions.getRecipeInstructions(),
          recipeImg: this.recipe.img
        } as Recipe);

      this.functions.makeToast("Oppskrift lagret!");
      this.recipe.name = "";
      this.recipe.grade = "";
      this.recipe.img = "";
      this.recipe.timeInMins = 0;
      this.recipe.portions = 0;
      this.functions.clearRecipeIngredients();
      this.functions.clearRecipeIngredientsQ();
      this.functions.clearRecipeInstructions();
    }
    else
    {
      this.functions.makeToast("Fyll ut alle felt(oppskrift)...")
    }
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CreatedummydataPage');
  }
}