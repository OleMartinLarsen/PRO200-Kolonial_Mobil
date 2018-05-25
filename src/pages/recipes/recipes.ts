import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage 
{
  private loading: boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
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
    //     this.allrecipes = response; //May need to adjust the path
    //   })
    //   .catch((error) =>
    //   {
    //     console.log(error);
    //   });
  }

  pushRecipeDetails() //Example
  {
    this.navCtrl.push("RecipedetailsPage");
    this.functions.addRecipeToHistory("Eggerøre");
  }

  // pushDetails(recipe :any) //Actual
  // {
  //   this.navCtrl.push('RecipedetailsPage', 
  //   {
  //     recipe,
  //     recipeCollection: this.collection
  //   });
  //   this.functions.addRecipeToHistory("eksempel");
  // }

  pushUser()
  {
    this.navCtrl.push('UserPage');
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipesPage');
    this.loading = false;
  }
}