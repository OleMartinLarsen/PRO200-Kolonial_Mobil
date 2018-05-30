import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipedetails',
  templateUrl: 'recipedetails.html',
})
export class RecipedetailsPage 
{
  recipe: any;
  ingredients: any;
  instructions: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.recipe = navParams.get('recipe');
    this.ingredients = this.recipe.recipeIngredients;
    this.instructions = this.recipe.recipeInstructions;
  }

  pushUser()
  {
    this.navCtrl.push('UserPage');
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipedetailsPage');
  }
}