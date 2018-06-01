import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Recipe } from '../../models/recipe';
import { Observable } from 'rxjs/observable';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage 
{
  private loading: boolean = true;
  public recipeCollection: AngularFirestoreCollection<Recipe>;
  private allrecipes: Observable<Recipe[]>;
  private favorites :Array<any> = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.recipeCollection = af.collection<Recipe>("recipes", ref =>
    {
      //Order by name (alphabetically)
      //Alternativly one could order by time, grade("enkel", "vanskelig" etc.) by using recipeGrade 
      //or price by adding warePrice in array (might be harder that it sounds)
      return ref.orderBy("recipeName", "asc");     
    });

    this.allrecipes = this.recipeCollection.snapshotChanges()
      .map(actions =>
      {
        return actions.map(action =>
        {
          let data = action.payload.doc.data() as Recipe;
          let id = action.payload.doc.id;
          
          return {
            id, 
            ...data
          }
        });
      });

      // this.favorites = this.storage.get("recipeFavlorites..."); //For phones internal storage
      this.favorites = this.functions.getRecipeFavorites();
  }

  pushRecipeDetails(recipe :any)
  {
    this.navCtrl.push('RecipedetailsPage', { recipe });
    this.functions.addRecipeToHistory(recipe); //Pushes all recipes viewd to history
  }

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