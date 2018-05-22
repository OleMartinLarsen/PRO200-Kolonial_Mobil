import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage 
{
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipesPage');
  }
}