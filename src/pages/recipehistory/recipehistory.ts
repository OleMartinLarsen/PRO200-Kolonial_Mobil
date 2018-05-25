import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipehistory',
  templateUrl: 'recipehistory.html',
})
export class RecipehistoryPage 
{
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.navParams.get('recipehistory');
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