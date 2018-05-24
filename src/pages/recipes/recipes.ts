import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage 
{
  private loading: boolean = true;
  history :Array<String> = [];
  recipes :any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore) 
  {
    this.getData();
  }

  getData()
  {
    //Get data from API
    // this.apiProvider.getData() //Adjust to final methodname
    //   .then((response :any) =>
    //   {
    //     this.loading = false;
    //     this.recipes = response; //May need to adjust the path
    //   })
    //   .catch((error) =>
    //   {
    //     console.log(error);
    //   });
  }

  pushRecipeDetails() //Example
  {
    this.navCtrl.push("RecipedetailsPage");
  }

  // pushDetails(recipe :any) //Actual
  // {
  //   this.navCtrl.push('RecipedetailsPage', 
  //   {
  //     recipe,
  //     recipeCollection: this.collection
  //   });
  // }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipesPage');
    this.loading = false;
  }
}