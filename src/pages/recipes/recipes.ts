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
  private allrecipes: Observable<Recipe[]>;
  private favorites: Array<any> = [];

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

    this.getRecipesList();

    // this.favorites = this.storage.get("recipeFavlorites..."); //For phones internal storage
    this.favorites = this.functions.getRecipeFavorites();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
    this.loading = false;

    this.setFilteredItems();

    //Ser etter verdi endringer i searchbaren
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  pushRecipeDetails(recipe: any) {
    this.navCtrl.push("RecipedetailsPage", { recipe });
    this.functions.addRecipeToHistory(recipe); //Pushes all recipes viewd to history
  }

  pushUser() {
    this.navCtrl.push("UserPage");
  }

  /*Henter ut bøkene fra firebase og putter de i et Obseravble array, dette ville jeg egentlig ha i booklist provideren men slet
 å få den til å legge inn bøkene i arrayet*/
  getRecipesList() {
    this.allrecipes = this.af.collection('Recipes')
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data() as Recipe;
          let id = a.payload.doc.id;
          return { id, ...data }
        })
      });
  }

  //Filtrer filterData array basert på hvilket søkeord
  filterItems(searchTerm) {
    return this.filterData.filter((recipe) => {
      return recipe.recipeName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  //Hvis søkeordet ikke er tomt filtrer den ut bøkene som passer søkeordet, hvis søkeordet er tomt blir filterData array resetta slik at all bøkene vises igjen
  setFilteredItems() {
    if (this.searchTerm) {
      this.getRecipesList();
      this.filterData = this.filterItems(this.searchTerm);
    }
    else {
      this.getRecipesList();
      this.allrecipes.subscribe(allrecipes => { this.filterData = allrecipes });
    }
  }

  onSearchInput() {
    this.searching = true;
  }
}