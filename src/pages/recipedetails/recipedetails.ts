import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipedetails',
  templateUrl: 'recipedetails.html',
})
export class RecipedetailsPage 
{
  recipe :any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.recipe = navParams.get('recipe');
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