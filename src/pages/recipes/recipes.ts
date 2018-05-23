import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage 
{
  private resp: string = "You can do it";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiProvider) 
  {
  }

  loadData()
  {
    this.api.getData()
      .then((resp2: any) =>
      {
        console.log("recipes resp: " + resp2);
        this.resp = resp2.detail;
      })
      .catch((error2) =>
      {
        console.log("recipes error: " + error2);
        this.resp = "Try again.";
      });
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RecipesPage');
  }
}