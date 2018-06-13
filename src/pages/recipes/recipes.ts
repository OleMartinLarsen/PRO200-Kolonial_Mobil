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
export class RecipesPage 
{
  private loading: boolean = true;
  public recipeCollection: AngularFirestoreCollection<Recipe>;
  private favorites: Array<any> = [];
  private myRecipes: Array<any> = [];
  private tabItemList = document.getElementsByClassName('tab-item') as HTMLCollectionOf<HTMLElement>;
  private tabText = document.getElementsByClassName('tab-text') as HTMLCollectionOf<HTMLElement>;

  private searchTerm: string = '';
  private recipes: Observable<Recipe[]>;
  private searchControl: FormControl;
  private filterData: Recipe[] = [];
  private searching: any = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.searchControl = new FormControl();

    this.recipeCollection = af.collection<Recipe>("recipes", ref => 
    {
      //Order by name (alphabetically)
      //Alternativly one could order by time, grade("enkel", "vanskelig" etc.) by using recipeGrade 
      //or price by adding warePrice in array (might be harder that it sounds)
      return ref.orderBy("recipeName", "asc");
    });

    this.getRecipeList();
  }

  pushRecipeDetails(recipe :any)
  {
    this.navCtrl.push("RecipedetailsPage", { recipe });
    // this.functions.addRecipeToHistory(recipe); //Pushes all recipes viewed to history
  }

  pushAddData()
  {
    this.navCtrl.push("CreatedummydataPage");
  }

  pushAddMyRecipe()
  {
    this.navCtrl.push("CreaterecipePage");
  }

  pushSettings()
  {
    this.favorites = this.functions.getRecipeFavorites();
    this.myRecipes = this.functions.getMyRecipes();
    this.showAllRecipes();
    this.loading = false;
    //TODO uncomment
    // this.navCtrl.push("SettingsPage");
  }

  pushUser()
  {
    this.navCtrl.push("UserPage");
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

  // --- Search ---

  /*Henter ut oppskriftene fra firebase og putter de i et Obseravble array*/
  getRecipeList() 
  {
    this.recipes = this.af.collection('recipes')
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data() as Recipe;
          let id = a.payload.doc.id;
          return { id, ...data }
        })
      });
    }

  //Hvis søkeordet ikke er tomt filtrer den ut oppskriftene som passer søkeordet, hvis søkeordet er tomt blir filterData array resetta slik at all bøkene vises igjen
  setFilteredItems() 
  {
    if (this.searchTerm) 
    {
      this.getRecipeList();
      this.filterData = this.filterItems(this.searchTerm);
    }
    else 
    {
      this.getRecipeList();
      this.recipes.subscribe(recipes => { this.filterData = recipes });
    }
  }
  
  //Filtrer filterData array basert på hvilket søkeord
  filterItems(searchTerm) 
  {
    return this.filterData.filter((recipe) => 
    {
      return recipe.recipeName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onSearchInput() 
  {
    this.searching = true;
  }

  ionViewDidLoad()
  {
    this.setFilteredItems();

    //Ser etter verdi endringer i searchbaren
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => 
      {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  ionViewWillEnter() 
  {
    this.favorites = this.functions.getRecipeFavorites();
    this.myRecipes = this.functions.getMyRecipes();
    this.showAllRecipes();
    this.loading = false;
  }
}