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
    instructions: "",
    img: ""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.wareCollection = af.collection<Ware>("wares");
    this.recipeCollection = af.collection<Recipe>("recipes");
    this.recipeIngredients = functions.getRecipeIngredients();
    this.recipeInstructions = functions.getRecipeInstructions();

    this.addWare = navParams.get("addWare");
    if(this.addWare)
    {
      this.functions.addIngredientToRecipeIngredients(this.addWare);
    }
  }

  saveWare()
  {
    if(this.ware.name != "" && this.ware.type != "")
    {
      this.wareCollection.add(
        {
          wareName: this.ware.name,
          warePrice: this.ware.price,
          wareType: this.ware.type,
          // wareImg: this.ware.img
        } as Ware);

      this.functions.makeToast("Vare lagret!");
      this.ware.name = "";
      this.ware.price = 0;
      this.ware.type = "";
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

  saveStep(step: string) 
  {
    this.functions.addInstructionsToRecipeInstructions(step);
    this.step = "";
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
          recipeInstructions: this.functions.getRecipeInstructions(),
          // recipeImg: this.recipe.img
        } as Recipe);

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
      this.functions.makeToast("Fyll ut alle felt(oppskrift)...")
    }
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CreatedummydataPage');
  }
}