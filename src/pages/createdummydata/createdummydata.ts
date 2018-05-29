import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Ware } from '../../models/ware';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Recipe } from '../../models/recipemodel';

@IonicPage()
@Component({
  selector: 'page-createdummydata',
  templateUrl: 'createdummydata.html',
})
export class CreatedummydataPage 
{
  public wareCollection :AngularFirestoreCollection<Ware>;
  public recipeCollection :AngularFirestoreCollection<Recipe>;
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
    ingredients: "",
    instructions: "",
    img: ""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.wareCollection = af.collection<Ware>('wares');
    this.recipeCollection = af.collection<Recipe>('recipes');
  }

  saveWare()
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

  saveRecipe()
  {
    this.recipeCollection.add(
      {
        recipeName: this.recipe.name,
        recipeGrade: this.recipe.grade,
        recipeTimeInMinutes: this.recipe.timeInMins,
        recipePortions: this.recipe.portions,
        recipeIngredients: this.recipe.ingredients,
        recipeInstructions: this.recipe.instructions,
        // recipeImg: this.recipe.img
      } as Recipe);

    this.functions.makeToast("Oppskrift lagret!");
    this.recipe.name = "";
    this.recipe.grade = "";
    this.recipe.timeInMins = 0;
    this.recipe.portions = 0;
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CreatedummydataPage');
  }
}