import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-recipehistory',
  templateUrl: 'recipehistory.html',
})
export class RecipehistoryPage 
{
  history :Array<any> = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private functions :GlobalFunctionsProvider) 
  {
    this.history = this.functions.getRecipeHistory();
  }

  pushRecipeDetails(recipe: any)
  {
    this.navCtrl.push('RecipedetailsPage', { recipe });
  }

  pushUser()
  {
    this.navCtrl.push('UserPage');
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipehistoryPage');
  }
}