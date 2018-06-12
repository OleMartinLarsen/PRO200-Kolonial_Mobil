import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Recipe } from '../../models/recipe';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  private loading: boolean = true;
  public recipeCollection: AngularFirestoreCollection<Recipe>;
  private allRecipes: Observable<Recipe[]>;
  private favorites: Array<any> = [];
  private myRecipes: Array<any> = [];
  private tabItemList = document.getElementsByClassName('tab-item') as HTMLCollectionOf<HTMLElement>;
  private tabText = document.getElementsByClassName('tab-text') as HTMLCollectionOf<HTMLElement>;

  searchTerm: string = '';
  searchControl: FormControl;
  filterData: Recipe[] = [];
  searching: any = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) {
    this.searchControl = new FormControl();

    this.recipeCollection = af.collection<Recipe>("recipes", ref => {
      //Order by name (alphabetically)
      //Alternativly one could order by time, grade("enkel", "vanskelig" etc.) by using recipeGrade 
      //or price by adding warePrice in array (might be harder that it sounds)
      return ref.orderBy("recipeName", "asc");
    });

    this.allRecipes = this.recipeCollection.snapshotChanges()
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
  }

  pushRecipeDetails(recipe :any)
  {
    this.navCtrl.push("RecipedetailsPage", { recipe });
    // this.functions.addRecipeToHistory(recipe); //Pushes all recipes viewed to history
  }

  pushUser()
  {
    this.navCtrl.push("UserPage");
  }

  ionViewWillEnter() 
  {
    this.favorites = this.functions.getRecipeFavorites();
    this.myRecipes = this.functions.getMyRecipes();
    this.loading = false;
  }

  tabItemStyle(tabIndex)
  {
    let recipeLists = document.getElementsByClassName('recipeList') as HTMLCollectionOf<HTMLElement>;
    for(var i = 0; i<3; i++)
    {
      recipeLists[i].style.display = "none";
      this.tabItemList[i].style.backgroundColor = "#2B242F";
      this.tabItemList[i].style.color = "#FFFFFF";
      this.tabText[i].style.color = "#FFFFFF";
      this.tabText[i].style.fontWeight = "normal";
    }

    recipeLists[tabIndex].style.display = "block";
    this.tabItemList[tabIndex].style.color = "#2B242F";
    this.tabItemList[tabIndex].style.backgroundColor = "#ffa514";
    this.tabText[tabIndex].style.color = "#2B242F";
    this.tabText[tabIndex].style.fontWeight = "bold";
  }

  showAllRecipes()
  {
    this.tabItemStyle(0);
  }

  showMyFavorites()
  {
    this.tabItemStyle(1);
  }

  showOwnRecipes()
  {
    this.tabItemStyle(2);
  }
}